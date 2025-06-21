import { Router } from "express"

import { protect, restrictTo } from "../controllers/authController"
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
} from "../controllers/cartController"

const router = Router({ mergeParams: true })

router.use(protect, restrictTo("admin"))

router.route("/").get(getAllCarts).post(createCart)

router.route("/:id").get(getCartById).patch(updateCart).delete(deleteCart)

export default router
