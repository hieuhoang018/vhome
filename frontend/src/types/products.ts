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
  _id: number
  name: string
  category: string
  price: number
  description: string
  stock: number
  imageUrl: string
  colors: string[]
  createdAt: Date
}

export interface mockData {
  name: string
  category: string
  price: number
  description: string
  stock: number
  imageUrl: string
  colors: string[]
}
