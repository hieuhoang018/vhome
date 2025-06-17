import { Model, Document, PopulateOptions } from "mongoose"
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { APIFeatures } from "../utils/apiFeatures"

export const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response) => {
    let filter = {}
    if (req.params.productId) filter = { product: req.params.productId }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort("name")
      .limitFields()
      .paginate()
    const docs = await features.query

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { docs },
    })
  })

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError("No document found with that ID", 404))
    }

    res.status(204).json({
      status: "success",
      data: null,
    })
  })

export const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError("No document found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    })
  })

export const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response) => {
    const newDoc = await Model.create(req.body)

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    })
  })

// TODO: Implement this function again
export const getOneById = <T extends Document>(
  Model: Model<T>,
  populateOptions?: PopulateOptions | PopulateOptions[]
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id)

    if (populateOptions) {
      query = query.populate(populateOptions)
    }

    const doc = await query

    if (!doc) {
      return next(new AppError("No document found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    })
  })
