const express = require('express');
const { AddProduct, ListProduct, RemoveProduct, SingleProductInfo } = require('../controllers/productController');
const upload = require('../middleware/multer');

const productRouter = express.Router();

productRouter.route('/addproduct').post(upload.array('image', 10), AddProduct);
productRouter.route('/listproduct').get(ListProduct);
productRouter.route('/removeproduct').post(RemoveProduct);
productRouter.route('/singleproductinfo').get(SingleProductInfo);

module.exports = productRouter;