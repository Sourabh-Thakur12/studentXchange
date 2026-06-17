const AppError = require("../utils/AppError");

const validate = (schemas = {}) => (req, res, next) => {
    try {
        if (schemas.body) {
            req.body = schemas.body.parse(req.body);
        }

        if (schemas.query) {
            req.query = schemas.query.parse(req.query);
        }

        if (schemas.params) {
            req.params = schemas.params.parse(req.params);
        }

        return next();
    } catch (error) {
        const issues = error.issues?.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        return next(new AppError("Validation failed.", 400, "VALIDATION_ERROR", issues));
    }
};

module.exports = validate;
