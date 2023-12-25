const userModel = require("../models/UserModel");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");
const encryptionUtil = require("../utils/EncryptionUtil");
const tokenUtil = require("../utils/TokenUtil");

const createUser = async (req, res) => {
  const hasehdPassword = await encryptionUtil.encryptPassword(
    req.body.password
  );
  try {
    // const user = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hasehdPassword,
    //   role: req.body.role,
    //   permissions: req.body.permissions,
    // };
    // console.log(user);
    //with Object.assign

    const user = Object.assign({}, req.body);
    user.password = await encryptionUtil.encryptPassword(req.body.password);
    console.log(user);

    const savedUser = await userModel.create(user);
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

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || email == undefined) {
    res.json(
      responseUtil.errorResponse(errorTypes.BAD_REQUEST, "Email is required")
    );
  }

  try {
    const fetcheduserFromEmail = await userModel.findOne({ email: email });
    //console.log(fetcheduserFromEmail);
    if (fetcheduserFromEmail == undefined || fetcheduserFromEmail == null) {
      res.json(
        responseUtil.errorResponse(errorTypes.NOT_FOUND, "No user found")
      );
    } else {
      const isMatch = await encryptionUtil.comparePassword(
        password,
        fetcheduserFromEmail.password
      );
      console.log(isMatch);
      
      

      if (isMatch) {
        //generate token

        const token = tokenUtil.generateToken(fetcheduserFromEmail.toObject())
        res.json(
          responseUtil.succeessResponse(
            "POST",
            token,
            "User logged in successfully"
          )
        );
      } else {
        res.json(
          responseUtil.errorResponse(
            errorTypes.BAD_REQUEST,
            "Password is incorrect"
          )
        );
      }
    }
  } catch (err) {
    console.log("here....",err);
    res.json(responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err));
  }
};

const getUserFromToken = async (req, res) => {

  const token = req.headers.authorization
  if(token==undefined || token==null){

      res.json(responseUtil.errorResponse(errorTypes.NOT_AUTHORIZED,"Token not found"))

  }
  else{
    try{
      
      const user = tokenUtil.verifyToken(token)
      if(user){
        res.json(responseUtil.succeessResponse("GET",user,"User fetched successfully"))
      }
      else{
        res.json(responseUtil.errorResponse(errorTypes.NOT_AUTHORIZED,"Token is Not valid.."))
      }

    }
    catch(err){
      res.json(responseUtil.errorResponse(errorTypes.NOT_AUTHORIZED,err))
    }
  }


}
module.exports = {
  createUser,
  getUser,
  deleteUser,
  softDeleteUser,
  removePermissionFromUser,
  loginUser,
  getUserFromToken
};
