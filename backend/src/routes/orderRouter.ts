import { Router } from "express"
import { protect, restrictTo } from "../controllers/authController"
import {
  createOrder,
  createOrderCheckout,
  deleteOrder,
  getAllOrders,
  getCheckoutSession,
  getOrderById,
  updateOrder,
} from "../controllers/orderController"

const router = Router()

router.use(protect)

router.get("/checkout", getCheckoutSession)
router.get("/checkout/success", createOrderCheckout)

router.use(restrictTo("admin"))

router.route("/").get(getAllOrders).post(createOrder)
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder)

export default router
