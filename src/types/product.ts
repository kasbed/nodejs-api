import { Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  active: boolean
  picture: string
}