import { NextFunction, Request, Response, Router } from "express"
import {
  getAllUsers,
  createUser,
  getUsersById,
  updateUser,
  deleteUser,
  checkID,
} from "./../controllers/userController"

const router = Router()

router.param("id", checkID)

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUsersById).patch(updateUser).delete(deleteUser)

export default router
