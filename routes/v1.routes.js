const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const roleRoutes = require('./RoleRoutes');
const permissionRoutes = require('./PermissionRoutes');
router.use('/user',userRoutes);
router.use('/role',roleRoutes);
router.use('/permission',permissionRoutes);
module.exports =  router;