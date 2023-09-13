const express = require('express'); // Requerimos el módulo express
const router = express.Router();
const userApiController = require('../../controllers/apis/userApiController');

router.get('/list', userApiController.list);
router.get('/detail', userApiController.detail);


module.exports = router;

