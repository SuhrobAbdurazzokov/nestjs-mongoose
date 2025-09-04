import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: 'N23',
    description: 'group name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '68aeb3acf887c7c15d1ddd84',
    description: 'University id',
  })
  @IsMongoId()
  @IsNotEmpty()
  universityId: string;
}
