import { User } from "./users"

export interface Review {
  _id: string
  review: string
  rating: number
  product: string
  user: User
  createdAt: Date
}
