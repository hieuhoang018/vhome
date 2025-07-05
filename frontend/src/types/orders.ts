import { User } from "./users"

export interface OrdersResponse {
  status: string
  results: number
  data: {
    docs: Order[]
  }
}
export interface OrderResponse {
  status: string
  data: {
    order: Order
  }
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  chosenColor: string
}

export interface Order {
  _id: string
  items: OrderItem[]
  user: User
  totalPrice: number
  paid: boolean
  paymentIntentId: string
  createdAt: Date
  address: {
    streetAddress: string
    city: string
    zip: number
  }
  phone: string
  deliveryNotes: string
}
