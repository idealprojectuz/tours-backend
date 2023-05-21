const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const DOMAIN_NAME = process.env.DOMAIN_NAME || "localhost:8080";
const CONNECTION_TYPE = process.env.CONNECTION_TYPE || "http";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "uploads", "images"));
  },
  filename: async (req, files, cb) => {
    const newfilename = uuidv4() + "." + files.mimetype.split("/")[1];
    cb(null, newfilename);
    // req.images.push(newfilename);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

module.exports = { upload };
