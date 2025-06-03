import { Router } from "express"
import {
  getAllProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController"

const router = Router()

router.route("/product-stats").get(getProductStats)
router.route("/").get(getAllProducts).post(createProduct)
router
  .route("/:id")
  .get(getProductsById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router
