import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    required: true,
  })
  username: string;
  @ApiProperty({
    required: true,
  })
  password: string;
}
