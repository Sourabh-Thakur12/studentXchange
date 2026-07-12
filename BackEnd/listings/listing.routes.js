const express = require("express");
const listingController = require("./listing.controller");
const authenticate = require("../shared/middlewares/authenticate");
const validate = require("../shared/middlewares/validate");
const { createListingSchema } = require("./listing.validation");

const router = express.Router();

router.post("/", authenticate, validate({ body: createListingSchema }), listingController.createListing);

module.exports = router;
