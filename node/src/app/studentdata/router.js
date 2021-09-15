require("./modal");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/registration", controller.register);
router.get("/getStudent", controller.getUser);
router.put("/editUser/:id", controller.editUser);
router.put("/deleteuser/:id", controller.deleteUser);

module.exports = router;
