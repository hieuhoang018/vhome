import express, { Request, Response, NextFunction } from "express"
import productRoutes from "./routes/productRouter"
import userRoutes from "./routes/userRouter"
import reviewRoutes from "./routes/reviewRouter"
import cartRoutes from "./routes/cartRouter"
import orderRoutes from "./routes/orderRouter"
import adminEmbeddingRouter from "./routes/adminEmbeddingRouter"
import recommendRouter from "./routes/recommendRouter"
import cors from "cors"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import hpp from "hpp"
import { errorHandler } from "./middlewares/errorHandler"
import { AppError } from "./utils/appError"
import cookieParser from "cookie-parser"

const app = express()

app.use(helmet())
app.use(morgan("dev"))

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later",
})

app.use("/api", limiter)

app.use(
  cors({
    origin: ["http://localhost:3000", "https://vhome-sage.vercel.app"],
    credentials: true,
  })
)

app.use(express.json())
app.use(
  hpp({
    whitelist: ["category", "price"],
  })
)

app.use(cookieParser())

app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/carts", cartRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/admin", adminEmbeddingRouter)
app.use("/api/v1/recommend", recommendRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

export default app
