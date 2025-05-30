import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/productModel";

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

const importData = async () => {
  try {
    await Product.create(products)
    console.log("imported")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async () => {
  try {
    await Product.deleteMany()
    console.log("deleted")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === "--import") {
  importData()
} else if (process.argv[2] === "--delete") {
  deleteData()
}
