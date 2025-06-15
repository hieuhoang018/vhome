import { Query } from "mongoose"

interface QueryParams {
  [key: string]: any
}

export class APIFeatures {
  query: Query<any, any>
  queryString: QueryParams

  constructor(query: Query<any, any>, queryString: QueryParams) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObj = { ...this.queryString }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach((field) => delete queryObj[field])

    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === "") {
        delete queryObj[key]
      }
    })
    // Advanced filtering
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    )

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort(sortValue: string) {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort(sortValue)
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ")
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select("-__v")
    }
    return this
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1
    const limit = parseInt(this.queryString.limit) || 100
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}
