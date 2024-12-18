export class CreateProductAdminDto {
    id? : number
    product_name : string
    category : string 
    price : number
    image_url? : string[]
    stock : number
    sku : string
    thumbnail? : string
    description : string
    createBy : number
    createdAt : Date
}
