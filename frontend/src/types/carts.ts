export interface Cart {
  _id: string
  user: string
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
    cart: Cart
  }
}
