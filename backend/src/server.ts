import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

import app from "./app"

const PORT = process.env.PORT || 8080
const DB = process.env.DATABASE

if (!DB) {
  console.error("❌ DATABASE environment variable is missing")
  process.exit(1)
}

let server: import("http").Server

mongoose
  .connect(DB)
  .then(() => {
    console.log("✅ MongoDB connected")

    server = app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      )
    })
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.name, err.message)
    console.log("Shutting down...")

    if (server) {
      server.close(() => {
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })

process.on("unhandledRejection", (reason: any) => {
  console.error("❌ Unhandled Rejection:", reason)
  server.close(() => {
    process.exit(1)
  })
})
