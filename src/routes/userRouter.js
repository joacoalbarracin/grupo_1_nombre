const express = require('express'); // Requerimos el módulo express
const router = express.Router(); // Ejecutamos el módulo Router
const userController = require('../controllers/userController'); // Requerimos el controlador
const path = require('path'); // Requerimos el módulo path
const multer = require('multer'); // Requerimos el módulo multer

const storage = multer.diskStorage({ // Configuramos multer
    destination: (req, file, cb) => { // Definimos el destino de la imagen
        cb(null, path.resolve(__dirname, '../../public/img/users')) // Definimos la ruta
    },
    filename: (req, file, cb) => { // Definimos el nombre de la imagen
        let imageName = Date.now() + path.extname(file.originalname); // Definimos el nombre de la imagen
        cb(null, imageName); // Retornamos el nombre de la imagen
    }
})
const fileUpload = multer({storage: storage}); // Ejecutamos multer

const logMiddleware = require('../middlewares/logMiddleware') // Traemos el middleware de logueo
const registerValidation = require('../middlewares/registerValidation')
const quiereRegistrarse = require('../middlewares/quiereRegistrarse')
const estaLogueado = require('../middlewares/estaLogueado') //Vemos si un usuario ya logueado quiere registrarse
const permisosAdmin = require('../middlewares/permisosAdmin')

router.get('/users/login', estaLogueado, userController.showLoginUserForm); // Ruta para mostrar la vista login.ejs
router.post('/users/login', quiereRegistrarse, userController.processLoginUserForm); // Procesa el formulario de login
router.get("/users/logout",userController.logout)

router.get("/users/profile", logMiddleware, userController.showProfile); // Ruta para mostrar la vista perfil.ejs")

//CRUD de usuario: Create user
router.get('/users/create', estaLogueado, userController.showCreateUserForm); // Ruta para mostrar la vista register.ejs
router.post('/users/create', fileUpload.single("image"), registerValidation, userController.processCreateUserForm); // Procesa el formulario de registro

//CRUD de usuario: Edit user
router.get('/users/edit', permisosAdmin, userController.showEditUserForm); // Ruta para mostrar la vista editUser.ejs
router.put('/users/edit', fileUpload.single('image'), userController.processEditUser); // Procesa el formulario de edición de usuario HACER!!!!

//CRUD de usuario: Delete user
router.delete('/users/delete/:id', userController.deleteUser); // Ruta para eliminar el producto

router.post('/users/logout', userController.logout)




module.exports = router; // Exporta el módulo router



  