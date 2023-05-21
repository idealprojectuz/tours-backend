const express = require("express");
const router = express.Router();
const getAlltour = require("../controllers/alltour.controllers");
const getSingletour = require("../controllers/getSingletour.controllers");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const editController = require("../controllers/edittours.controller");
const { upload } = require("../middleware/upload.middleware");
const createController = require("../controllers/create.controller");
const deleteController = require("../controllers/delete.controller");
const loginController = require("../controllers/login.controller");
const isLogin = require("../middleware/isLogin.middleware");

router.get("/tours", getAlltour);
router.get("/tours/:id", getSingletour);
router.put("/tours/:id", isLogin, upload.array("images", 10), editController);
router.post("/create", isLogin, upload.array("images", 10), createController);
router.delete("/tours/:id", isLogin, deleteController);
router.post("/login", loginController);

module.exports = {
  router,
};
