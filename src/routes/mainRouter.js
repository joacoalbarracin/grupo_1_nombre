const express = require('express');

const router = express.Router();

const controller = require('../controllers/mainController');

router.get('/', controller.home);
router.get('/login', controller.login);
router.get('/productCart', controller.productCart);
router.get('/productDetail', controller.productDetail);
router.get('/register', controller.register);
router.get('/productList', controller.productList);

//FORM EDIT
router.get('/editProduct/:id', controller.editProduct)
router.put('/editProduct/:id', controller.processEdit);

//DELETE
router.delete('/delete/:id', controller.deleteProduct)

//FORM CREATE
router.get('/products/create', controller.createProduct);
//router.post('/products', fileUpload.single("image"),controller.processCreate);


module.exports = router;