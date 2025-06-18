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

router
  .route("/")
  .get(getAllCarts)
  .post(protect, restrictTo("admin"), createCart)

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getCartById)
  .patch(protect, restrictTo("admin"), updateCart)
  .delete(protect, restrictTo("admin"), deleteCart)

export default router