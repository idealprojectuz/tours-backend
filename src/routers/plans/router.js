const express = require("express");
const plans = require("./index");
const router = express.Router();
const checkidMiddleware = require("../../middleware/checkid.middleware");
const isLogin = require("../../middleware/isLogin.middleware");
router.get("/get/all", plans.Get);
router.get("/:id", checkidMiddleware, plans.GetById);
router.post("/add", isLogin, plans.Add);
router.put("/:id", isLogin, checkidMiddleware, plans.Edit);
router.delete("/:id", isLogin, checkidMiddleware, plans.Delete);

module.exports = router;
