export interface Cart {
  _id: string
  user: {
    _id: string
    firstName: string
    lastName: string
  }
  items: CartItemType[]
  totalPrice: number
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
    doc: Cart
  }
}

export interface CartsResponse {
  status: string
  results: number
  data: {
    docs: Cart[]
  }
}
