import { Router } from "express"
import {
  getAllProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
} from "./../controllers/productController"

const router = Router()

router.route("/").get(getAllProducts).post(createProduct)
router
  .route("/:id")
  .get(getProductsById)
  .patch(updateProduct)
  .delete(deleteProduct)

export default router
