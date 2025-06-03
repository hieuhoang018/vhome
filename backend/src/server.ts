import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

import app from "./app"

const PORT = process.env.PORT || 8080
const DB = process.env.DATABASE

if (!DB) {
  console.error("❌ DATABASE environment variable is missing")
  process.exit(1)
}

mongoose
  .connect(DB)
  .then(() => {
    console.log("✅ MongoDB connected")

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
    })
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err)
    process.exit(1)
  })
