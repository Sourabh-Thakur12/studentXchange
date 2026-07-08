const authService = require("./admin.service")
const ApiResponse = require("../shared/utils/apiResponse")
const resetTable = async (req, res) => {
    try {
        await authService.resetTable();
        res.json(ApiResponse.success(null, "Table reset successfully"));
    } catch (error) {
        res.status(500).json(ApiResponse.error(error.message));
    }
};

const deleteUser = async (req, res) => {
    
};

const listUsers = async (req, res) => {
    try {
        const users = await authService.listUsers();
        res.json(ApiResponse.success(users, "Users listed successfully"));
    } catch (error) {
        res.status(500).json(ApiResponse.error(error.message));
    }
};

module.exports = {
    resetTable,
    deleteUser,
    listUsers,
};
