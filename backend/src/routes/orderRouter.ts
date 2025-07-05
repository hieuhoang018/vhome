import { Router } from "express"
import { protect, restrictTo } from "../controllers/authController"
import {
  createCheckoutSession,
  createOrder,
  createOrderCheckout,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController"

const router = Router()

router.use(protect)

// router.get("/checkout", getCheckoutSession)
router.post("/checkout-session", createCheckoutSession)
router.get("/checkout/success", createOrderCheckout)

router.use(restrictTo("admin"))

router.route("/").get(getAllOrders).post(createOrder)
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder)

export default router
