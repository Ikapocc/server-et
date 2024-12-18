import { Orders } from "./orders.dto"

export class CreateNewOrder {
    user_id : string
    orders : Orders[]
    createdAt? : Date
    total? : number
}