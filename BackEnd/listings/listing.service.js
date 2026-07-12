const { ID, TablesDB, adminClient, appwriteConfig } = require("../shared/config/appwrite");
const AppError = require("../shared/utils/AppError");

const tablesDB = new TablesDB(adminClient);

const createListing = async (sellerId, input) => {
    const now = new Date().toISOString();
    const data = {
        sellerId,
        title: input.title,
        description: input.description,
        category: input.category,
        condition: input.condition,
        createdAt: now,
        updatedAt: now,
        forSale: input.forSale,
        sellStatus: input.forSale ? "available" : undefined,
        forRent: input.forRent,
        rentStatus: input.forRent ? "available" : undefined,
    };

    if (input.forSale) data.sellPrice = input.sellPrice;
    if (input.forRent) {
        data.rentPrice = input.rentPrice;
        data.rentPeriod = input.rentPeriod;
        if (input.rentAvailableAfter) data.rentAvailableAfter = input.rentAvailableAfter;
    }

    try {
        return await tablesDB.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.listingsTableId,
            rowId: ID.unique(),
            data,
        });
    } catch (error) {
        throw new AppError("Could not create listing.", 502, "LISTING_CREATE_FAILED", error.message);
    }
};

module.exports = { createListing };
