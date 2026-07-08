const express = require("express");

const adminController = require("./admin.controller");
const authenticate = require("../shared/middlewares/authenticate");
const validate = require("../shared/middlewares/validate");

const router = express.Router();

router.delete("/resetTable", adminController.resetTable);
router.delete("/deleteUser", adminController.deleteUser);
router.get("/listUsers", adminController.listUsers);


module.exports = router;