import { Router } from "express"
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController"
import { signUp, logIn } from "../controllers/authController"

const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router
