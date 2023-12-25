const router = require('express').Router();
const userController = require('../controllers/UserController');
const userSchemaValidation = require('../utils/SchemaValidation/UserSchemaValidation');
const zodMiddleWare = require('../middlewares/ZodMiddleWare');
const auth = require('../middlewares/AuthMiddleware');

router.post("/user",zodMiddleWare.validateSchema(userSchemaValidation),userController.createUser);
router.get("/user", auth,userController.getUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.softDeleteUser);
router.put("/user/:userId/removepermission", userController.removePermissionFromUser);
router.post("/user/login", userController.loginUser);
router.get("/getUserFromToken", userController.getUserFromToken);

module.exports = router;