const router = require('express').Router();
const roleController = require('../controllers/RoleController');
router.post("/role", roleController.createRole);
module.exports = router;