const express = require('express');

const router = express.Router();

const controller = require('../controllers/mainController');

const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/img'))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})
const fileUpload = multer({storage: storage})

router.get('/', controller.home);
router.get('/login', controller.login);
router.get('/productCart', controller.productCart);
router.get('/productDetail', controller.productDetail);
router.get('/register', controller.register);
router.get('/productList', controller.productList);

//FORM EDIT
router.get('/editProduct/:id', controller.editProduct)
router.put('/editProduct/:id', fileUpload.single('image'), controller.processEdit);

//DELETE
router.delete('/delete/:id', controller.deleteProduct)

//FORM CREATE
router.get('/products/create', controller.createProduct);
//router.post('/products', fileUpload.single("image"),controller.processCreate);


module.exports = router;