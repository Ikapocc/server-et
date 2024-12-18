import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({collection : "products"})
export class ProductSchema extends Document {

    @Prop({required : true})
    product_name : string

    @Prop({required : true})
    category : string 

    @Prop({required : true})
    price : number

    @Prop()
    image_url : string[]

    @Prop({required : true})
    sku : string

    @Prop()
    thumbnail : string

    @Prop()
    description : string

    @Prop()
    createBy : string

    @Prop()
    createdAt : Date
}

export const productSchema = SchemaFactory.createForClass(ProductSchema)