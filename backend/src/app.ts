import express, { Request, Response, NextFunction } from "express"
import productRoutes from "./routes/productRouter"
import userRoutes from "./routes/userRouter"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middlewares/errorHandler"
import { AppError } from "./utils/appError"

const app = express()

app.use(morgan("dev"))

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: false,
  })
)

app.use(express.json())
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

export default app
