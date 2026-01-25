const Product = require("../models/Products");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    const productsArchivosCorregidos = products.map((product) => {
      const productData = product.toJSON();

      if (!productData.images || !Array.isArray(productData.images)) {
        productData.images = productData.image ? [productData.image] : [];
      }
      return productData;
    });

    res.status(200).json(productsArchivosCorregidos);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getProductByPk = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const productData = product.toJSON();

    if (!productData.images || !Array.isArray(productData.images)) {
      productData.images = productData.image ? [productData.image] : [];
    }

    res.status(200).json(productData);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "no products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    const fileUrls = [];
    const filePublicIds = [];
    const fileTypes = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const isVideo = file.mimetype.startsWith("video/");
        const folder = "products";

        const uploadOptions = {
          folder: isVideo ? `${folder}/videos` : `${folder}/images`,
          resource_type: isVideo ? "video" : "image",
        };

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
          stream.end(file.buffer);
        });

        fileUrls.push(result.secure_url);
        filePublicIds.push(result.public_id);
        fileTypes.push(isVideo ? "video" : "image");
      }

      productData.image = fileUrls[0];
      productData.public_image_id = filePublicIds[0];
      productData.images = fileUrls;
      productData.public_images_ids = filePublicIds;
      productData.file_types = fileTypes;
    }
    // convertir campos numéricos
    if (req.body.price) productData.price = parseFloat(req.body.price);
    if (req.body.stock) productData.stock = parseInt(req.body.stock);
    if (req.body.categoryId) productData.CategoryId = req.body.categoryId;

    const newProduct = await Product.create(productData);
    res.status(201).json({
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error", error);
    //limpiar archivos subidos en caso de error
    if (Array.isArray(req.files) && req.files.length > 0) {
      try {
        for (let i = 0; i < filePublicIds.length; i++) {
          const publicId = filePublicIds[i];
          const resourceType = fileTypes[i] === "video" ? "video" : "image";
          await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
          });
        }
      } catch (deleteError) {
        console.error("Error eliminando archivo de Cloudinary:", deleteError);
      }
    }
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updateData = { ...req.body };

    const existingFiles = product.images || [];
    const existingPublicIds = product.public_images_ids || [];
    const existingTypes = product.file_types || [];

    if (req.files && req.files.length > 0) {
      const newFilesUrls = [...existingFiles];
      const newPublicIds = [...existingPublicIds];
      const newTypes = [...existingTypes];

      for (const file of req.files) {
        const isVideo = file.mimetype.startsWith("video/");
        const folder = "products";

        const uploadOptions = {
          folder: isVideo ? `${folder}/videos` : `${folder}/images`,
          resource_type: isVideo ? "video" : "image",
        };

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
          stream.end(file.buffer);
        });

        newFilesUrls.push(result.secure_url);
        newPublicIds.push(result.public_id);
        newTypes.push(isVideo ? "video" : "image");
      }

      updateData.images = newFilesUrls;
      updateData.public_images_ids = newPublicIds;
      updateData.file_types = newTypes;

      if (newFilesUrls.length > 0) {
        updateData.image = newFilesUrls[0];
        updateData.public_image_id = newPublicIds[0];
      }
    }
    //convertir campos numéricos
    if (req.body.price) updateData.price = parseFloat(req.body.price);
    if (req.body.stock) updateData.stock = parseInt(req.body.stock);

    const [updated] = await Product.update(updateData, {
      where: { id },
      returning: true,
    });

    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });

    const productUpdated = await Product.findByPk(id);

    res.status(200).json({
      message: "Producto actualizado exitosamente",
      product: productUpdated,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      error: "Error al actualizar el producto",
      detalles: error.errors,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar archivos de cloudinary
    if (product.public_images_ids && Array.isArray(product.public_images_ids)) {
      for (let i = 0; i < product.public_images_ids.length; i++) {
        const publicId = product.public_images_ids[i];
        const resourceType =
          product.file_types[i] === "video" ? "video" : "image";
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType,
        });
      }
    }

    await product.destroy({
      where: { id },
    });

    res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  getAllProducts,
  getProductByPk,
  searchProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
