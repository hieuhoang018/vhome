import { Review } from "./reviews"

export interface ProductsResponse {
  status: string
  results: number
  total: number
  data: {
    docs: Product[]
  }
}
export interface ProductResponse {
  status: string
  data: {
    product: Product
  }
}

export interface UpdatedProductResponse {
  status: string
  data: {
    data: Product
  }
}

export interface Product {
  _id: string
  name: string
  category: string
  price: number
  description: string
  stock: number
  rating: number
  ratingQuantity: number
  reviews: Review[]
  imagesUrl: string[]
  imageCoverUrl: string
  colors: string[]
  createdAt: Date
}
