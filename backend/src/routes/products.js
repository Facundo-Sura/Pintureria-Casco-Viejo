const { getAllProducts, getProductByPk, searchProducts, createNewProduct, updateProduct, deleteProduct } = require('../controllers/products.js');
const Router = require('express');
const multer = require('multer');

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllProducts);
router.get('/:id', getProductByPk);
router.get('/search', searchProducts);
router.post('/', upload.array('archivos'), createNewProduct);
router.put('/:id', upload.array('archivos'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
