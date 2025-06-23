export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  cart: string
  active: boolean
  phone: string
}

export interface UsersResponse {
  status: string
  results: number
  data: {
    docs: User[]
  }
}

export interface UserResponse {
  status: string
  data: {
    user: User
  }
}

export interface MeResponse {
  data: {
    user: User
  }
}

export interface LoginRoleResponse {
  status: string
  data: User
}
