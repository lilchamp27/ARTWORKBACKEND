// create a review route 
const express = require("express");
const router = express.Router();
const { createReview,  } = require("../controllers/reviewController");
//middleware
const { isAuth } = require("../middlewares/authMiddleware");

// create a review route
router.post("/artwork/:id/review", isAuth, createReview);


module.exports = router;