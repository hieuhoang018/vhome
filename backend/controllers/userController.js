const fs = require('fs');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  })
}

exports.getUsersById = (req, res) => {
  console.log(req.params)
}

exports.createUser = (req, res) => {
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

exports.updateUser = (req, res) => {
  console.log("patched")
}

exports.deleteUser = (req, res) => {
  console.log("deleted")
}