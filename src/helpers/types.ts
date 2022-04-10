export type User = {
  id?: number
  username: string
  first_name: string
  last_name: string
  email: string
  user_password?: string
}

export type Order = {
  id?: number
  user_id: number
  order_status: string
}

export type Product = {
  id?: number
  product_name: string
  price: number
}

export type OrderProduct = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}
