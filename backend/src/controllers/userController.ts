import { Request, Response } from "express"
import User from "../models/userModel"
import { APIFeatures } from "../utils/apiFeatures"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort("firstName")
      .limitFields()
      .paginate()
    const users = await features.query

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: "fail",
      message: "Something went wrong.",
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Can't find user",
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body)

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant create",
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant find user",
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant find user",
    })
  }
}
