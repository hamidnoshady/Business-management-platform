
// ================================================================
// file: services/auth-service/src/auth/dto/register-user.dto.ts
// ================================================================
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' })
  password: string;

  @ApiProperty({ example: 'My Awesome Company' })
  @IsString()
  @IsNotEmpty()
  tenantName: string;

  @ApiProperty({ example: 'my-company' })
  @IsString()
  @IsNotEmpty()
  tenantSubdomain: string;
}

