export interface Cart {
  _id: string
  user: {
    id: string
    firstName: string
    lastName: string
  }
  items: CartItemType[]
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface CartItemType {
  name: string
  productId: string
  quantity: number
  chosenColor: string
  price: number
}

export interface CartResponse {
  status: string
  data: {
    cart: Cart
  }
}

export interface CartsResponse {
  status: string
  results: number
  data: {
    docs: Cart[]
  }
}
