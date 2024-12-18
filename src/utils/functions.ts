import { firstValueFrom } from "rxjs"
import { HttpService } from '@nestjs/axios';
import { ProductsProps } from "src/mongodata/dto/productApi.dto";
import { UsersProps } from "src/mongodata/dto/userApi.dto";
import { CreateMongodataProductDto } from "src/mongodata/dto/create-mongodataproducts.dto";
import { CreateMongodataNameDto } from "src/mongodata/dto/create-mongodatauser.dto";
import * as bcrypt from 'bcrypt';


export async function PopulateDataBase(typeOfData : "user" | "product", service : HttpService) {
    const url = typeOfData === "product" ? "https://dummyjson.com/products/category" : 'https://dummyjson.com/users'

    if (typeOfData === "product") return PopulateProducts(service, url)
    if (typeOfData === "user") return PopulateUsers(service, url)
}

async function PopulateUsers(service : HttpService, url : string) : Promise<CreateMongodataNameDto[]>{
  try {
    const {data : { users }} = await firstValueFrom(
      service.get<UsersProps>(`${url}`)
    )

    const saltOrRounds = 10;
    const password = "ika123"
    const newPassword = await bcrypt.hash(password, saltOrRounds)
  
    return users.map(items => {
      return {
        user_name : items.firstName,
        user_last_name : items.lastName,
        address : {
          address: items.address.address,
          city: items.address.city,
          state: items.address.state,
          postalCode: items.address.postalCode,
          country: items.address.country
        },
        password : newPassword,
        nickname : items.username,
        email : items.email,
        rol : items.role,
        createdAt : new Date,
        level : items.role === "admin" ? Math.ceil(Math.random() * 3) : items.role === "moderator" ? 1 : 0
      }
    })
  } catch (error) {
    throw new error
  }

}

async function PopulateProducts(service : HttpService, url : string) : Promise<CreateMongodataProductDto[][]> {
  const categories = ["smartphones", "beauty", "furniture", "groceries", "home-decoration", "laptops", "vehicle", "womens-jewellery", "skin-care"]
      
  try {
    const newProductData = await Promise.all(
      categories.map(async items => {
        const {data : { products }} = await firstValueFrom(
          service.get<ProductsProps>(`${url}/${items}`)
        )
  
        return products.map(items => {
          return {
            product_name : items.title,
            category : items.category,
            price : items.price,
            image_url : items.images,
            stock : items.stock,
            description : items.description,
            sku : items.sku,
            thumbnail : items.thumbnail,
            createBy : Math.ceil(Math.random() * 4),
            createdAt : new Date()
          }
        })
      })
    )
    
    return newProductData
  } catch (error) {
    throw new error
  }

}