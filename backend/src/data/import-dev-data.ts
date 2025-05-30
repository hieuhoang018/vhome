import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/productModel";
import User from "../models/userModel";

dotenv.config({ path: path.join(__dirname, "../../.env") })

const db = process.env.DATABASE
if (!db) {
  console.error("Missing DATABASE in .env")
  process.exit(1)
}

mongoose.connect(db).then(() => {
  console.log("db connected")
})

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users-data.json"), "utf-8")
)

const importData = async () => {
  try {
    await User.create(users)
    console.log("imported")
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
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
