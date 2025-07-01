import mongoose, { model, Model } from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/productModel";
import User from "../models/userModel";
import Cart from "../models/cartModel";
import Order from "../models/orderModel";
import Review from "../models/reviewModel";
import Wishlist from "../models/wishlistModel";

dotenv.config({ path: path.join(__dirname, "../../.env") })

const db = process.env.DATABASE
if (!db) {
  console.error("Missing DATABASE in .env")
  process.exit(1)
}

mongoose.connect(db).then(() => {
  console.log("db connected")
})

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products-data.json"), "utf-8")
)

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users-data.json"), "utf-8")
)

const importData = async <T>(Model: Model<T>, data: JSON)  => {
  try {
    await Model.create(data)
    console.log("imported")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async <T>(Model: Model<T>) => {
  try {
    await Model.deleteMany()
    console.log("deleted")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === "--import-product") {
  importData(Product, products)
} else if (process.argv[2] === "--import-user") {
  importData(User, users)
} else if (process.argv[2] === "--delete-product") {
  deleteData(Product)
} else if (process.argv[2] === "--delete-user") {
  deleteData(User)
} else if (process.argv[2] === "--delete-cart") {
  deleteData(Cart)
} else if (process.argv[2] === "--delete-order") {
  deleteData(Order)
} else if (process.argv[2] === "--delete-review") {
  deleteData(Review)
} else if (process.argv[2] === "--delete-wishlist") {
  deleteData(Wishlist)
}
  