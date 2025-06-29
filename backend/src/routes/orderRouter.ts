import { Router } from "express"
import { protect } from "../controllers/authController"
import { createOrderCheckout, getCheckoutSession } from "../controllers/orderController"

const router = Router()

router.get('/checkout', protect, getCheckoutSession, createOrderCheckout)


export default router
