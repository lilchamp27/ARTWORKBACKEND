const express = require("express");
const router = express.Router();
const {addItemToCart, getUserCart, removeItemFromCart, clearCart} = require("../controllers/cartController");
const { isAuth } = require("../middlewares/authMiddleware");

router.post("/addtocart", isAuth, addItemToCart);
router.get("/getcart", isAuth, getUserCart);
router.delete("/removeitem", isAuth, removeItemFromCart);
router.delete("/clearcart", isAuth, clearCart);

module.exports = router;