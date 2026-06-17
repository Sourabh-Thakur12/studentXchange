const authService = require("./auth.service");
const ApiResponse = require("../shared/utils/apiResponse");

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);

        return res
            .status(201)
            .json(ApiResponse.success(result, "Registration successful. Please verify your email."));
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        return res
            .status(200)
            .json(ApiResponse.success(result, "Login successful."));
    } catch (error) {
        return next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const result = await authService.verifyEmail(req.query);

        return res
            .status(200)
            .json(ApiResponse.success(result, "Email verified successfully."));
    } catch (error) {
        return next(error);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const result = await authService.getCurrentUser(req.user.userId);

        return res
            .status(200)
            .json(ApiResponse.success(result, "User fetched successfully."));
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    register,
    login,
    verifyEmail,
    getCurrentUser,
};
