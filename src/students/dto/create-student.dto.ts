import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    example: 'Pedri Gonzalez',
    description: 'student full name',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: "student'n email address",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '68aeb3acf887c7c15d1ddd84',
    description: 'groupid for student',
  })
  @IsMongoId()
  @IsNotEmpty()
  groupId: string;
}
