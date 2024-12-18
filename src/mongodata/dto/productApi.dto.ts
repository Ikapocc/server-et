export class ProductsProps {
  products: Product[];
  total:    number;
  skip:     number;
  limit:    number;
}

export class Product {
  id:                   number;
  title:                string;
  description:          string;
  category:             Category;
  price:                number;
  discountPercentage:   number;
  rating:               number;
  stock:                number;
  tags:                 string[];
  brand:                string;
  sku:                  string;
  weight:               number;
  dimensions:           Dimensions;
  warrantyInformation:  string;
  shippingInformation:  string;
  availabilityStatus:   AvailabilityStatus;
  reviews:              Review[];
  returnPolicy:         string;
  minimumOrderQuantity: number;
  meta:                 Meta;
  images:               string[];
  thumbnail:            string;
  createdBy? :          number
}

export enum AvailabilityStatus {
  InStock = "In Stock",
  OutOfStock = "Out of Stock",
}

export enum Category {
  Smartphones = "smartphones",
}

export class Dimensions {
  width:  number;
  height: number;
  depth:  number;
}

export class Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode:   string;
  qrCode:    string;
}

export class Review {
  rating:        number;
  comment:       string;
  date:          Date;
  reviewerName:  string;
  reviewerEmail: string;
}