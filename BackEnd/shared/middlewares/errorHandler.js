const AppError = require("../utils/AppError");
const ApiResponse = require("../utils/apiResponse");

const appwriteErrorMap = {
    400: "Invalid request.",
    401: "Invalid credentials.",
    403: "You are not allowed to perform this action.",
    404: "Requested resource was not found.",
    409: "Email already exists.",
};

const normalizeError = (error) => {
    if (error instanceof AppError) {
        return error;
    }

    if (error.code && error.type) {
        const message = appwriteErrorMap[error.code] || error.message || "Appwrite request failed.";
        return new AppError(message, error.code >= 400 && error.code < 600 ? error.code : 502, "APPWRITE_ERROR");
    }

    return new AppError("Internal server error.", 500, "INTERNAL_ERROR");
};

const errorHandler = (error, req, res, next) => {
    const normalizedError = normalizeError(error);
    const payload = process.env.NODE_ENV === "production"
        ? null
        : normalizedError.details;

    return res
        .status(normalizedError.statusCode)
        .json(ApiResponse.error(normalizedError.message, payload));
};

module.exports = errorHandler;
