const router = require('express').Router();
const fileUploadController = require('../controllers/FileUploadController');
router.post('/upload', fileUploadController.uploadFile);
module.exports = router;