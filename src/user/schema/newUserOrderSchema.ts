import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Orders, ordersSchema } from "./orderSchema";

@Schema({collection : "user_orders"})
export class UserOrder extends Document { 
    @Prop({type : mongoose.Schema.Types.ObjectId, ref : "NewUser", required : true})
    user_id : Types.ObjectId

    @Prop({type:[ordersSchema], required : true})
    orders : Orders[]

    @Prop()
    createdAt : Date

    @Prop()
    total : number
}

export const newOrderSchema = SchemaFactory.createForClass(UserOrder)