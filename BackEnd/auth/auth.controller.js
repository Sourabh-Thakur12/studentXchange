const authService = require("./auth.service")
const ApiResponse = require("../shared/utils/apiResponse")

//register a new user

async function register(req, res, next) {
    try {
        const {name, email, password} = req.body

        const result = await authService.register({
            name,
            email,
            password,
        })

        return res.status(201).json(
            ApiResponse.success(
                result,
                "Registration successful. Please verify your email."
            )
        );
    }
    catch(error){
        next(error)
    }
}

// login exisiting user 

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const result = await authService.login({
            email,
            password,
        });

        return res.status(200).json(
            ApiResponse.success(
                result,
                "Login successful."
            )
        );

    } catch (error) {
        next(error);
    }
}

//verify user email

async function verifyEmail(req, res, next) {
    try {
        const { userId, secret } = req.query;

        const result = await authService.verifyEmail({
            userId,
            secret,
        });

        return res.status(200).json(
            ApiResponse.success(
                result,
                "Email verified successfully."
            )
        );

    } catch (error) {
        next(error);
    }
}


async function getCurrentUser(req, res, next) {
    try {
        const userId = req.user.userId;

        const user = await authService.getCurrentUser(
            userId
        );

        return res.status(200).json(
            ApiResponse.success(
                user,
                "User fetched successfully."
            )
        );

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    verifyEmail,
    getCurrentUser,
};

