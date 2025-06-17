import { Router } from "express"
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  setProductUserIds,
  updateReview,
} from "../controllers/reviewController"
import { protect, restrictTo } from "../controllers/authController"

const router = Router({ mergeParams: true })

router.use(protect)

router
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setProductUserIds, createReview)
router.route("/:id").get(getReviewById).patch(updateReview).delete(deleteReview)

export default router
