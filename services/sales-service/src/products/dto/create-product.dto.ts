import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'لپتاپ مدل X' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'یک لپتاپ قدرتمند برای کارهای حرفه‌ای', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2500.50 })
  @IsNumber()
  @IsPositive()
  price: number;
}
