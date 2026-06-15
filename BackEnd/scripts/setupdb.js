//db schema setup

require("dotenv").config();

const sdk = require("node-appwrite");

const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new sdk.TablesDB(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;



//table exist check
async function tableExists(tableId) {
    try {
        await tablesDB.getTable({
            databaseId: DATABASE_ID,
            tableId
        });

        return true;

    } catch (error) {

        if (error.code === 404) {
            return false;
        }

        throw error;
    }
}

async function createTables() {

    for (const table of TABLES) {

        const exists = await tableExists(table.tableId);

        if (exists) {

            console.log(`✓ ${table.tableId} already exists`);

            continue;
        }

        // create table
        console.log(`Checking ${table.tableId}...`);
    }
}

const TABLES = [
    {
        tableId: "users",
        name: "Users",
        columns: [
            {key: "userId",
            type: "varchar",
            size: 50,
            required: true
        },

        {
            key: "name",
            type: "varchar",
            size: 100,
            required: true
        },

        {
            key: "email",
            type: "varchar",
            size: 255,
            required: true
        },

        {
            key: "avatarUrl",
            type: "varchar",
            size: 500,
            required: false
        },

        {
            key: "createdAt",
            type: "datetime",
            required: true
        },

        {
            key: "verified",
            type: "boolean",
            required: true
        }
    ],
        indexes: [
        {
            key: "idx_userId",
            type: "unique",
            attributes: ["userId"]
        },

        {
            key: "idx_email",
            type: "unique",
            attributes: ["email"]
        }
    ],

        tableId: "listings",
        name: "Listings",
        columns: [
            { key: "sellerId", type: "varchar", size: 50, required: true },

            { key: "title", type: "varchar", size: 255, required: true },

            { key: "description", type: "text", required: true },

            { key: "category", type: "varchar", size: 100, required: true },

            { key: "condition", type: "varchar", size: 20, required: true },

            { key: "createdAt", type: "datetime", required: true },

            { key: "updatedAt", type: "datetime", required: true },

            { key: "forSale", type: "boolean", required: true },

            { key: "sellPrice", type: "integer", required: false },

            { key: "sellStatus", type: "varchar", size: 20, required: false },

            { key: "forRent", type: "boolean", required: true },

            { key: "rentPrice", type: "integer", required: false },

            { key: "rentPeriod", type: "varchar", size: 20, required: false },

            { key: "rentStatus", type: "varchar", size: 20, required: false },

            { key: "rentAvailableAfter", type: "datetime", required: false }
        ],

        indexes: [
            {
                key: "idx_seller",
                type: "key",
                attributes: ["sellerId"]
            },

            {
                key: "idx_category",
                type: "key",
                attributes: ["category"]
            }
        ]
    },

    {
        tableId: "rentals",

        name: "Rentals",

        columns: [
            { key: "listingId", type: "varchar", size: 50, required: true },

            { key: "renterId", type: "varchar", size: 50, required: true },

            { key: "ownerId", type: "varchar", size: 50, required: true },

            { key: "startDate", type: "datetime", required: true },

            { key: "endDate", type: "datetime", required: true },

            { key: "actualReturnDate", type: "datetime", required: false },

            { key: "status", type: "varchar", size: 20, required: true },

            { key: "createdAt", type: "datetime", required: true }
        ]
    },

    {
        tableId: "transactions",

        name: "Transactions",

        columns: [
            { key: "listingId", type: "varchar", size: 50, required: true },

            { key: "sellerId", type: "varchar", size: 50, required: true },

            { key: "buyerOrRenterId", type: "varchar", size: 50, required: true },

            { key: "type", type: "varchar", size: 20, required: true },

            { key: "rentalId", type: "varchar", size: 50, required: false },

            { key: "status", type: "varchar", size: 20, required: true },

            { key: "confirmedBySeller", type: "boolean", required: true },

            { key: "confirmedByBuyer", type: "boolean", required: true },

            { key: "completedAt", type: "datetime", required: false },

            { key: "createdAt", type: "datetime", required: true }
        ]
    },

    {
        tableId: "ratings",

        name: "Ratings",

        columns: [
            { key: "transactionId", type: "varchar", size: 50, required: true },

            { key: "fromUserId", type: "varchar", size: 50, required: true },

            { key: "toUserId", type: "varchar", size: 50, required: true },

            { key: "score", type: "integer", required: true },

            { key: "comment", type: "text", required: false },

            { key: "type", type: "varchar", size: 20, required: true },

            { key: "createdAt", type: "datetime", required: true }
        ]
    },

    {
        tableId: "message",

        name: "Messages",

        columns: [
            { key: "conversationId", type: "varchar", size: 50, required: true },

            { key: "senderId", type: "varchar", size: 50, required: true },

            { key: "receiverId", type: "varchar", size: 50, required: true },

            { key: "listingId", type: "varchar", size: 50, required: true },

            { key: "content", type: "text", required: true },

            { key: "readAt", type: "datetime", required: false },

            { key: "createdAt", type: "datetime", required: true }
        ],

        indexes: [
            {
                key: "idx_conversation",
                type: "key",
                attributes: ["conversationId"]
            }
        ]
    }
];

createTables()

