const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurant");
const {isLoggedIn, isAuthor, validateRestaurant} = require("../middleware");
const restaurants = require("../controllers/restaurants");
const {storage} = require("../cloudinary")
const multer  = require('multer');
const upload = multer({ storage });


router.route("/")
    .get(catchAsync(restaurants.index))
    .post(isLoggedIn, upload.array("image"), validateRestaurant, catchAsync(restaurants.createRestaurant))
    

router.get("/new", isLoggedIn, restaurants.renderNewForm);

router.route("/:id")
    .get(catchAsync(restaurants.showRestaurant))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateRestaurant, catchAsync(restaurants.updateRestaurant))
    .delete(isAuthor, isLoggedIn, catchAsync(restaurants.deleteRestaurant))



router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(restaurants.renderEditForm));


module.exports = router;
 