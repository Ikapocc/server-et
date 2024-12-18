import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class Orders {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  createBy: Types.ObjectId;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  sku: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  quantity: number;
}

export const ordersSchema = SchemaFactory.createForClass(Orders);
