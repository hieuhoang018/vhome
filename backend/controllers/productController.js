const fs = require("fs")

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products-data.json`, "utf-8")
)

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  })
}

exports.getProductsById = (req, res) => {
  console.log(req.params)
}

exports.createProduct = (req, res) => {
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

exports.updateProduct = (req, res) => {
  console.log("patched")
}

exports.deleteProduct = (req, res) => {
  console.log("deleted")
}