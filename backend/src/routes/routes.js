const productsRouter = require('./products.js');
const Router = require('express');

const router = Router();

router.use('/products', productsRouter);

module.exports = router;