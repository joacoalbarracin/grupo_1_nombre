const express = require('express'); // Requerimos el módulo express
const router = express.Router();
const productApiController = require('../../controllers/apis/productApiController');

router.get('/list', productApiController.list);
//router.get('/detail', userApiController.detail);


module.exports = router;

