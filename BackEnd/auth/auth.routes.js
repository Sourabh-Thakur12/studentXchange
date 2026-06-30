const express = require("express");

const authController = require("./auth.controller");
const authenticate = require("../shared/middlewares/authenticate");
const validate = require("../shared/middlewares/validate");
const {
    loginSchema,
    registerSchema,
    verifyEmailSchema,
} = require("./auth.validation");

const router = express.Router();

router.post("/register", validate({ body: registerSchema }), authController.register);
router.post("/login", validate({ body: loginSchema }), authController.login);
router.get("/me", authenticate, authController.getCurrentUser);
router.get("/verify-email", validate({ query: verifyEmailSchema }), authController.verifyEmail);

module.exports = router;
