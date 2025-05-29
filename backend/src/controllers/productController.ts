import * as fs from "fs"
import { Request, Response } from "express"

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products-data.json`, "utf-8")
)

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  })
}

export const getProductsById = (req: Request, res: Response) => {
  console.log(req.params)
}

export const createProduct = (req: Request, res: Response) => {
  const newId = products[products.length - 1].id + 1
  const newProduct = Object.assign(
    {
      id: newId,
    },
    req.body
  )

  products.push(newProduct)

  fs.writeFile(
    `${__dirname}/data/products-data.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          product: newProduct,
        },
      })
    }
  )
}

export const updateProduct = (req: Request, res: Response) => {
  console.log("patched")
}

export const deleteProduct = (req: Request, res: Response) => {
  console.log("deleted")
}
