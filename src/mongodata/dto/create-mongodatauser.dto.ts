import { Address } from "./userApi.dto"

export class CreateMongodataNameDto {
    user_name : string
    user_last_name : string
    address : Partial<Address>
    nickname : string
    email : string
    password : any
    createdAt : Date
    rol : string
    level : number
}