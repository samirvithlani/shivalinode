const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post("/user", userController.createUser);
module.exports = router;