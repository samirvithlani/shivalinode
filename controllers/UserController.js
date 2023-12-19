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

const getUser = async (req, res) => {
  try {
    const users = await userModel.find({ status: true }).populate("role");
    if (users && users.length > 0) {
      res.json(
        responseUtil.succeessResponse(
          "GET",
          users,
          "Users fetched successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No users found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (id == null || id == undefined) {
    res.json(
      responseUtil.errorResponse(errorTypes.BAD_REQUEST, "Id is required")
    );
  }
  try {
    const deltedUser = await userModel.findByIdAndDelete(id);
    if (deleteUser) {
      res.json(
        responseUtil.succeessResponse(
          "DELETE",
          deltedUser,
          "User deleted successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No user found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};

const softDeleteUser = async (req, res) => {
  const id = req.params.id;
  if (id == null || id == undefined) {
    res.json(
      responseUtil.errorResponse(errorTypes.BAD_REQUEST, "Id is required")
    );
  }
  try {
    const deltedUser = await userModel.findByIdAndUpdate(id, { status: false });
    if (deleteUser) {
      res.json(
        responseUtil.succeessResponse(
          "DELETE",
          deltedUser,
          "User deleted successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No user found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};

const removePermissionFromUser = async (req, res) => {
  const userId = req.params.userId;
  const permissionId = req.body.permissionId;

  if (userId == null || userId == undefined) {
    res.json(
      responseUtil.errorResponse(errorTypes.BAD_REQUEST, "userId is required")
    );
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      $pull: { permissions: permissionId },
    });
    if (updatedUser) {
      res.json(
        responseUtil.succeessResponse(
          "PUT",
          updatedUser,
          "Permission removed successfully"
        )
      );
    } else {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No user found")
      );
    }
  } catch (err) {
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  softDeleteUser,
  removePermissionFromUser,
};
