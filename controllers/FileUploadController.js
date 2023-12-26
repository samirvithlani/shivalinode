const multer = require("multer");
const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");

const storage = multer.diskStorage({
  destination: "./uploads",
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

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json(
        responseUtil.errorResponse(errorTypes.INTERNAL_SERVER_ERROR, err)
      );
    } else {
      res.json(
        responseUtil.succeessResponse(
          "POST",
          req.file,
          "File uploaded successfully"
        )
      );
    }
  });
};
module.exports = {
  uploadFile,
};
