import { Router } from "express"
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "./../controllers/userController"

const router = Router()

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

export default router
