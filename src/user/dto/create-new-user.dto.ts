import { Address } from "src/mongodata/dto/userApi.dto"

export class CreateNewUserDto {
    id? : string
    user_name : string
    user_last_name : string
    address : Address
    nickname : string
    email : string
    password : string
    createdAt : Date
    rol? : string
}