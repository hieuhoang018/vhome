import { Router } from "express"
import { protect } from "../controllers/authController"
import {
  createOrderCheckout,
  getCheckoutSession,
} from "../controllers/orderController"

const router = Router()

router.get("/checkout", protect, getCheckoutSession)
router.get("/checkout/success", protect, createOrderCheckout)

export default router
