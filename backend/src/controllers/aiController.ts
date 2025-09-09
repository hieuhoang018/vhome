import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import mongoose from "mongoose"
import Product from "../models/productModel"
import { embedProduct } from "../utils/ai"

export const completeRecommendedRoom = catchAsync(
  async (req: Request, res: Response) => {
    const productId = String(req.query.productId)
    if (!productId || !mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ error: "invalid_productId" })
    }

    const anchor = await Product.findById(productId).lean()
    if (
      !anchor ||
      !Array.isArray(anchor.embedding) ||
      anchor.embedding.length === 0
    ) {
      return res.json({ results: [] })
    }

    const results = await Product.aggregate([
      {
        $search: {
          index: "vector_index",
          knnBeta: { vector: anchor.embedding, path: "embedding", k: 60 },
        },
      },
      {
        $match: {
          _id: { $ne: anchor._id },
          stock: { $gt: 0 },
          category: { $ne: anchor.category }, // complement, not substitute
        },
      },
      { $limit: 24 },
      {
        $addFields: {
          priceDiff: { $abs: { $subtract: ["$price", anchor.price] } },
        },
      },
      { $sort: { priceDiff: 1 } },
      { $limit: 8 },
      {
        $project: {
          name: 1,
          price: 1,
          category: 1,
          imageCoverUrl: 1,
          stock: 1,
        },
      },
    ])

    res.json({ results })
  }
)

export const embed = catchAsync(async (req: Request, res: Response) => {
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
})

export const reindexEmbedding = catchAsync(
  async (req: Request, res: Response) => {
    const cursor = Product.find({
      $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }],
    }).cursor()

    let updated = 0
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
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
  }
)
