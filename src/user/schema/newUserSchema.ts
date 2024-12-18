import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Address } from "src/mongodata/dto/userApi.dto"

@Schema({collection : "users"})
export class NewUser extends Document {

    @Prop({required : true})
    user_name : string

    @Prop({required : true})
    user_last_name : string

    @Prop({required : true, type : Address})
    address : Address
    
    @Prop({required : true})
    nickname : string

    @Prop({required : true})
    email : string

    @Prop({required : true})
    password : string

    @Prop()
    createdAt : Date

    @Prop({required : true})
    rol : string

    @Prop()
    level : number
}

export const newUser = SchemaFactory.createForClass(NewUser)