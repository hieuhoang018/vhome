import { Router } from "express"
import {
  getAllUsers,
  createUser,
  getUsersById,
  updateUser,
  deleteUser,
} from "./../controllers/userController"

const router = Router()

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUsersById).patch(updateUser).delete(deleteUser)

export default router
