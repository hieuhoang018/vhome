import { Router } from "express"

import { protect, restrictTo } from "../controllers/authController"
import { embed, reindexEmbedding } from "../controllers/aiController"

const router = Router()

router.use(protect, restrictTo("admin"))

router.post("/reindex-embeddings", reindexEmbedding)
router.post("/embed/:id", embed)

export default router
