import { Router } from "express"
import { completeRecommendedRoom } from "../controllers/aiController"

const router = Router()

router.get("/complete-room", completeRecommendedRoom)

export default router
