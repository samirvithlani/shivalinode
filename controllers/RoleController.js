const roleModel = require("../models/RoleModel");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");

const createRole = async (req, res) => {
  try {
    const savedRole = await roleModel.create(req.body);
    if (savedRole) {
      res.json(
        responseUtil.succeessResponse(
          "POST",
          savedRole,
          "Role created successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No role found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};


module.exports = {
    createRole,
}