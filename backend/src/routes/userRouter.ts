import { Router } from "express"
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} from "../controllers/userController"
import {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} from "../controllers/authController"

const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)

router.post("/forgot-password", forgotPassword)
router.patch("/reset-password/:token", resetPassword)

router.patch("/update-password", protect, updatePassword)
router.patch("/update-information", protect, updateMe)
router.delete("/delete-account", protect, deleteMe)

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router
