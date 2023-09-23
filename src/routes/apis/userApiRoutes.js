const express = require('express'); 
const router = express.Router();
const userApiController = require('../../controllers/apis/userApiController');

router.get('/list', userApiController.list);
router.get('/detail/:id', userApiController.detail);

module.exports = router;

