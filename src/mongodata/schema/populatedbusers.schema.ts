import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Address } from "../dto/userApi.dto";

@Schema({collection : "users"})
export class PopulateUsers extends Document{

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

    @Prop({ required : true })
    password : string

    @Prop()
    createdAt : Date

    @Prop({required : true})
    rol : string

    @Prop()
    level : number
}

export const PopulateSchema =  SchemaFactory.createForClass(PopulateUsers)