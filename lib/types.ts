export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  category: string
  features: string[]
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface OrderDetails {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

