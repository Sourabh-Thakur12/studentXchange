const express = require("express");

const authRoutes = require("./auth/auth.routes");
const listingRoutes = require("./listings/listing.routes");
const adminRoutes = require("./admin/admin.routes");
const errorHandler = require("./shared/middlewares/errorHandler");
const ApiResponse = require("./shared/utils/apiResponse");
const config = require('./shared/config/env');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,x-appwrite-session");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    return res.status(200).json(ApiResponse.success({ status: "ok" }, "Server is healthy."));
});

app.use("/auth", authRoutes);
app.use("/listings", listingRoutes);

if (config.ENVIRONMENT !== "production") {
    app.use("/admin", adminRoutes); //remember to remove in production
}

app.use((req, res) => {
    return res.status(404).json(ApiResponse.error("Route not found."));
});

app.use(errorHandler);

const PORT = config.EXPRESS_PORT | 5000

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
