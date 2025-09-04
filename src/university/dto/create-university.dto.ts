import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUniversityDto {
  @ApiProperty({
    example: 'Oxford',
    description: "university's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'oxford@gmail.com',
    description: "university's email",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Uzbekistan, Tashkent',
    description: "university's address",
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
