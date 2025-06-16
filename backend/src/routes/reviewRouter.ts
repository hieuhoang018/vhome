import { Router } from "express"
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/reviewController"
import { protect, restrictTo } from "../controllers/authController"

const router = Router({ mergeParams: true })

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), createReview)
router.route("/:id").get(getReviewById).patch(updateReview).delete(deleteReview)

export default router
