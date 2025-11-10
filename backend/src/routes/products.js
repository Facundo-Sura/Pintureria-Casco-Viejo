const { getAllProducts, getProductByPk, searchProducts, createNewProduct, updateProduct, deleteProduct } = require('../controllers/products.js');
const Router = require('express');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductByPk);
router.get('/search', searchProducts);
router.post('/', createNewProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;