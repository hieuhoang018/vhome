import { Router } from "express"
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} from "../controllers/userController"
import {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout,
} from "../controllers/authController"
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartController"
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController"

const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout", logout)

router.post("/forgot-password", forgotPassword)
router.patch("/reset-password/:token", resetPassword)

// Protect all route after this middleware
router.use(protect)

router.get("/me", getMe, getUserById)
router
  .route("/me/cart")
  .get(getMyCart)
  .post(addToCart)
  .patch(updateCartItemQuantity)
router.delete("/me/cart/:id", removeFromCart)
router.patch("/update-password", updatePassword)
router.patch("/update-information", uploadUserPhoto, resizeUserPhoto, updateMe)
router.delete("/delete-account", deleteMe)
router
  .route("/me/wishlist")
  .get(getMyWishlist)
  .post(addToWishlist)
  .delete(removeFromWishlist)

// Routes available only for admins
router.use(restrictTo("admin"))

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router
