import { Router } from "express"
import Product from "../models/productModel"
import { embedProduct } from "../utils/ai"
import { protect, restrictTo } from "../controllers/authController"

const router = Router()

router.use(protect, restrictTo("admin"))

router.post("/reindex-embeddings", async (req, res) => {
  try {
    const cursor = Product.find({
      $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }],
    }).cursor()

    let updated = 0
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const vec = await embedProduct({
        name: doc.name,
        description: doc.description,
        category: doc.category,
        colors: doc.colors,
      })
      doc.embedding = vec
      await doc.save()
      updated++
    }
    res.json({ ok: true, updated })
  } catch (e) {
    console.error(e)
    res.status(500).json({ ok: false, error: "embedding_reindex_failed" })
  }
})

router.post("/embed/:id", async (req, res) => {
  try {
    const doc = await Product.findById(req.params.id)
    if (!doc) return res.status(404).json({ ok: false, error: "not_found" })

    const vec = await embedProduct({
      name: doc.name,
      description: doc.description,
      category: doc.category,
      colors: doc.colors,
    })
    doc.embedding = vec
    await doc.save()
    res.json({ ok: true, updated: 1 })
  } catch (e) {
    console.error(e)
    res.status(500).json({ ok: false, error: "single_embed_failed" })
  }
})

export default router
