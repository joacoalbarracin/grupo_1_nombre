const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/img/users')) //agregamos /users para que se guarde en la carpeta users
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})
const fileUpload = multer({storage: storage})

router.get('/login', userController.login);
//router.post('/login', userController.processLogin); aun no creado

router.get('/register', userController.register);

router.post('/register', fileUpload.single("image"), userController.processRegister);


//router.get('/profile', userController.profile);  aun no creado
module.exports = router;



  