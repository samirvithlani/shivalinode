const router = require('express').Router();
const userController = require('../controllers/UserController');
const userSchemaValidation = require('../utils/SchemaValidation/UserSchemaValidation');
const zodMiddleWare = require('../middlewares/ZodMiddleWare');

router.post("/user",zodMiddleWare.validateSchema(userSchemaValidation),userController.createUser);
router.get("/user", userController.getUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.softDeleteUser);
router.put("/user/:userId/removepermission", userController.removePermissionFromUser);
router.post("/user/login", userController.loginUser);

module.exports = router;