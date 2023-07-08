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
//router.post('/login', userController.processLogin);

router.get('/register', userController.register);

//router.post('/register', fileUpload.single('image'), userController.processRegister);


router.get('/profile', userController.profile);
app.post('/login', function(req, res){
    userController.processLogin
  });

  
app.post('/register', fileUpload.single('image'), function(req, res){
    userController.processRegister
  });

module.exports = router;



  