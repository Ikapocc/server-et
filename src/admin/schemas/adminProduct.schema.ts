import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({collection : "products"})
export class AdminProducts {
    @Prop({required : true})
    product_name : string

    @Prop({required : true})
    category : string 

    @Prop({required : true})
    price : number

    @Prop()
    image_url : string[]

    @Prop({required : true})
    stock : number

    @Prop({required : true})
    sku : string

    @Prop()
    thumbnail : string

    @Prop()
    description : string

    @Prop()
    createBy : number

    @Prop()
    createdAt : Date
}

export const adminProduct = SchemaFactory.createForClass(AdminProducts)