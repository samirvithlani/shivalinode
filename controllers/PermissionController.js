const permissionSchema = require("../models/PermissionModel");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");

const createPermission = async (req, res) => {
  try {
    const createdPermission = await permissionSchema.create(req.body);
    if (createdPermission) {
      res.json(
        responseUtil.succeessResponse(
          "POST",
          createdPermission,
          "Permission created successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No permission found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};
module.exports = {
    createPermission,
}
