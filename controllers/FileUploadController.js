const multer = require("multer");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");
const googleController = require("./GoogleController");

const storage = multer.diskStorage({
  // destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        responseUtil.errorResponse(
          errorTypes.BAD_REQUEST,
          "Only .png, .jpg and .jpeg format allowed!"
        )
      );
    }
  },
}).single("file");

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.json(
        responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err)
      );
    } else {
      const id = await googleController.uploadFile(req.file.path);
      const data = {
        id: id,
        name: req.file.originalname,

      }

      res.json(
        responseUtil.succeessResponse(
          "POST",
          data,
          "File uploaded successfully"
        )
      );
    }
  });
};
module.exports = {
  uploadFile,
};
