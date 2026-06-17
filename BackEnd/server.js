const express = require("express");

const authRoutes = require("./auth/auth.routes");
const errorHandler = require("./shared/middlewares/errorHandler");
const ApiResponse = require("./shared/utils/apiResponse");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    return res.status(200).json(ApiResponse.success({ status: "ok" }, "Server is healthy."));
});

app.use("/auth", authRoutes);

app.use((req, res) => {
    return res.status(404).json(ApiResponse.error("Route not found."));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
