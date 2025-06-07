import { Router } from "express"
import {
  getAllProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController"
import {
  protect
} from "../controllers/authController"

const router = Router()

router.route("/product-stats").get(getProductStats)
router.route("/").get(protect, getAllProducts).post(createProduct)
router
  .route("/:id")
  .get(getProductsById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router
