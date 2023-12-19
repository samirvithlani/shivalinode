const router = require('express').Router();
const permissionController = require('../controllers/PermissionController');
router.post("/permission", permissionController.createPermission);
module.exports = router;