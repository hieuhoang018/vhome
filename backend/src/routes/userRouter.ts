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
} from "../controllers/userController"
import {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} from "../controllers/authController"
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartController"

const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)

router.post("/forgot-password", forgotPassword)
router.patch("/reset-password/:token", resetPassword)

// Protect all route after this middleware
router.use(protect)

router.get("/me", getMe, getUserById)
router
  .route("/me/cart")
  .get(protect, getMyCart)
  .post(protect, addToCart)
  .patch(protect, updateCartItemQuantity)
  .delete(protect, removeFromCart)
router.patch("/update-password", updatePassword)
router.patch("/update-information", updateMe)
router.delete("/delete-account", deleteMe)

// Routes available only for admins
router.use(restrictTo("admin"))

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router
