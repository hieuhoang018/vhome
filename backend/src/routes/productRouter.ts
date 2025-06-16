import { Router } from "express"
import {
  getAllProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController"
import { protect, restrictTo } from "../controllers/authController"
import reviewRouter from "../routes/reviewRouter"

const router = Router()

router.use("/:productId/reviews", reviewRouter)

router.route("/product-stats").get(getProductStats)
router.route("/").get(getAllProducts).post(createProduct)
router
  .route("/:id")
  .get(getProductsById)
  .patch(updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct)

export default router
