const express = require('express'); // Requerimos el módulo express
const router = express.Router(); // Ejecutamos el módulo Router
const mainController = require('../controllers/mainController'); // Requerimos el controlador
const path = require('path') // Requerimos el módulo path
const multer = require('multer') // Requerimos el módulo multer

const storage = multer.diskStorage({ // Configuramos multer  
    destination: (req, file, cb) => { // Definimos el destino de la imagen
        cb(null, path.resolve(__dirname, '../../public/img')) // Definimos la ruta
    },
    filename: (req, file, cb) => { // Definimos el nombre de la imagen
        let imageName = Date.now() + path.extname(file.originalname); // Definimos el nombre de la imagen
        cb(null, imageName); // Retornamos el nombre de la imagen
    }
})
const fileUpload = multer({storage: storage}) // Ejecutamos multer

const createProdValidation = require('../middlewares/createProdValidation')

const editProdValidation = require('../middlewares/editProdValidation')

const permisosAdmin = require('../middlewares/permisosAdmin')

// Vistas en relación a los productos
router.get('/products/cart', mainController.showProductCart); // Ruta para mostrar la vista productCart.ejs
router.get('/products/list', mainController.showProductList); // Ruta para mostrar la  vista productList.ejs
router.get('/', mainController.showHome); // Ruta para mostrar la vista home.ejs
router.get('/products/description/:id', mainController.showDescription); // Ruta para mostrar la vista description.ejs

//CRUD de procuto: Create product
router.get('/products/create', permisosAdmin, mainController.showCreateProductForm); // Ruta para mostrar la vista createProduct.ejs
router.post('/products/create', fileUpload.single("image"), createProdValidation, mainController.processCreateProductForm); //

//CRUD de procuto: Edit product
router.get('/products/edit/:id', mainController.showEditProductForm); // Ruta para mostrar la vista editProduct.ejs
router.put('/products/edit/:id', fileUpload.single('image'), editProdValidation, mainController.processEditProductForm); // Ruta para editar el producto

//CRUD de procuto: Delete product
router.delete('/products/delete/:id', mainController.deleteProduct); // Ruta para eliminar el producto

module.exports = router; // Exporta el módulo router