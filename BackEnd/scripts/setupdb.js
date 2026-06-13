const TABLES = [
    {
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
        tableId: "messages",

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

