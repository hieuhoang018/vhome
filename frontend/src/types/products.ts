export interface ProductsResponse {
  status: string
  results: number
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

export interface Product {
  _id: string
  name: string
  category: string
  price: number
  description: string
  stock: number
  imagesUrl: string[]
  imageCoverUrl: string
  colors: string[]
  createdAt: Date
}
