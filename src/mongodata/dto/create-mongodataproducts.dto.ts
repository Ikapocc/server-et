export class CreateMongodataProductDto {
    product_name : string
    category : string | string[]
    price : number
    image_url : string[]
    thumbnail : string
    sku : string
    stock : number
    description : string
    createBy : number
    createdAt : Date
}