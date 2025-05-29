import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

import app from "./app"

mongoose.connect(process.env.DATABASE!).then(() => {
  console.log("db connected")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
