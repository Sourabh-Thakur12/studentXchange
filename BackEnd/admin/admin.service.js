const {
    Account,
    ID,
    Query,
    TablesDB,
    Users,
    adminClient,
    appwriteConfig,
    createBaseClient,
    createSessionClient,
    TableApi,
} = require("../shared/config/appwrite");
const AppError = require("../shared/utils/AppError");
const config = require("../shared/config/env");

const resetTable = async () => {
  try {
    if (config.ENVIRONMENT === "production") { 
      throw new AppError("Table reset is disabled in production", 500);
    }
      const result = await TableApi.listRows(
        appwriteConfig.databaseId,
        appwriteConfig.usersTableId
      );

      if (result.rows.length === 0) {
          return { message: "Table is already empty" };
      }

      const deletedRows = await TableApi.deleteRows(
          appwriteConfig.databaseId,
          appwriteConfig.usersTableId,
      );

      console.log(deletedRows);

      return { message: `Table reset successfully. ${deletedRows.rows.length} rows deleted.` };
      
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};

const deleteUser = async () => {
    
};

const listUsers = async () => {
    try {
        const result = await TableApi.listRows(
            appwriteConfig.databaseId,
            appwriteConfig.usersTableId,
        );
        return result.rows;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};

module.exports = {
    resetTable,
    deleteUser,
    listUsers,
};
