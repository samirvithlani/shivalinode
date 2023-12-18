const userModel = require("../models/UserModel");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");

const createUser = async (req, res) => {
  try {
    const savedUser = await userModel.create(req.body);
    if (savedUser) {
      res.json(
        responseUtil.succeessResponse(
          "POST",
          savedUser,
          "User created successfully"
        )
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};
module.exports = {
  createUser,
};
