const { DataTypes } = require("sequelize");
const database = require("../db.js");

const Product = database.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue("images");
        try {
          if (!rawValue || rawValue === "null" || rawValue === '""') {
            return [];
          }
          return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
        } catch (error) {
          console.error("Error parsing imagenes: ", error);
          return [];
        }
      },
      set(value) {
        const arrayValue = Array.isArray(value) ? value : [];
        this.setDataValue("images", JSON.stringify(arrayValue));
      },
    },
    pucblic_image_id: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "ID publico de la imagen principal en Cloudinary",
    },
    pulic_images_ids: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue("ids_imagenes_publicas");
        try {
          if (!rawValue || rawValue === "null" || rawValue === '""') {
            return [];
          }
          return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
        } catch (error) {
          console.error("Error parsing ids_imagenes_publicas: ", error);
          return [];
        }
      },
      set(value) {
        const arrayValue = Array.isArray(value) ? value : [];
        this.setDataValue("ids_imagenes_publicas", JSON.stringify(arrayValue));
      },
    },
    file_types: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue("file_types");
        try {
          if (!rawValue || rawValue === "null" || rawValue === '""') {
            return [];
          }
          return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
        } catch (error) {
          console.error("Error parsing file_types: ", error);
          return [];
        }
      },
      set(value) {
        const arrayValue = Array.isArray(value) ? value : [];
        this.setDataValue("file_types", JSON.stringify(arrayValue));
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
