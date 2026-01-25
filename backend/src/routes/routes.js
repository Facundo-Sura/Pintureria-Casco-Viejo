const productsRouter = require('./products.js');
const categoriesRouter = require('./categories.js');
const Router = require('express');

const router = Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;