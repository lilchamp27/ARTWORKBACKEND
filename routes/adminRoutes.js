// connect your admin route to your admin controller
const express = require("express")
const router = express.Router();
const { adminDeleteArtwork, adminDeleteReview, adminDeleteUser, adminGetAllUsers } = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/adminMiddleware");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/all",isAuth, adminAuth, adminGetAllUsers);
router.delete("/delete/artwork/:id", isAuth, adminAuth, adminDeleteArtwork);
router.delete("/delete/review/:id", isAuth, adminAuth, adminDeleteReview);
router.delete("/delete/user/:id", isAuth, adminAuth, adminDeleteUser);

module.exports = router;

