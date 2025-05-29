import * as fs from "fs"
import { NextFunction, Request, Response } from "express"

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/users-data.json`, "utf-8")
)

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  })
}

export const getUsersById = (req: Request, res: Response) => {
  console.log(req.params)
}

export const createUser = (req: Request, res: Response) => {
  const newId = users[users.length - 1].id + 1
  const newUser = Object.assign(
    {
      id: newId,
    },
    req.body
  )

  users.push(newUser)

  fs.writeFile(
    `${__dirname}/../data/users-data.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      })
    }
  )
}

export const updateUser = (req: Request, res: Response) => {
  console.log("patched")
}

export const deleteUser = (req: Request, res: Response) => {
  console.log("deleted")
}
