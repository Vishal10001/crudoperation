require("./modal");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/login", controller.login);
router.get("/getalluser", controller.getAllUser);
router.post("/createuser", controller.setUser);

module.exports = router;
