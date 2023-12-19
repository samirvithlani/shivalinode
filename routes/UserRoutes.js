const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post("/user", userController.createUser);
router.get("/user", userController.getUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.softDeleteUser);
router.put("/user/:userId/removepermission", userController.removePermissionFromUser);

module.exports = router;