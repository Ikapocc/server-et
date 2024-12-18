import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({collection : "admin_sells"})
export class AdminSell{
    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "products", required :true})
    productId : Types.ObjectId

    @Prop({required :true})
    product_name : string

    @Prop({required :true})
    quantity : number

    @Prop({required :true})
    total : number

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "users" ,required :true})
    createdBy : Types.ObjectId
}

export const adminSell = SchemaFactory.createForClass(AdminSell)