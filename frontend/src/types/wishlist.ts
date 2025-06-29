export interface Wishlist {
  _id: string
  user: {
    _id: string
    firstName: string
    lastName: string
  }
  items: WishlistItemType[]
}

export interface WishlistItemType {
  name: string
  productId: string
  price: number
}

export interface WishlistResponse {
  status: string
  data: {
    doc: Wishlist
  }
}

export interface WishlistsResponse {
  status: string
  results: number
  data: {
    docs: Wishlist[]
  }
}
