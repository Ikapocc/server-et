import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAdminDto } from './create-product-admin.dto';

/* export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
 */

export type UpdateAdminDto = Partial<CreateProductAdminDto>