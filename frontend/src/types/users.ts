export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  cart: string
}

export interface MeResponse {
  data: {
    user: User
  }
}
