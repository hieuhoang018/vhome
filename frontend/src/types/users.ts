export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  cart: string
  active: boolean
  phone: string
  createdAt: Date
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

export interface UpdatedUserResponse {
  status: string
  data: {
    data: User
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
