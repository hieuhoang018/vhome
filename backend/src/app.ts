import express from "express"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: false, // only needed if you're sending cookies
  })
)

app.use(express.json())
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)
export default app
