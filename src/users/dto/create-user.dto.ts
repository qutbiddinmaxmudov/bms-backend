import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsLowercase, Length, Matches, Validate } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional()
  firstName?: string;
  @ApiPropertyOptional()
  lastName?: string;

  @IsLowercase({
    always: true,
    message: 'username must contain only lowercase letters.',
  })
  @Length(4, 32, {
    message: 'username must contain from 4 to 32 symbols.',
  })
  @Matches(/^(?!_)\w+(?<!_)$/, {
    message:
      'username may contain only underscore, but not as last or first symbol.',
  })
  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 32,
  })
  username: string;

  @Length(8, 32, {
    message: 'password must contain from 8 to 32 symbols.',
  })
  @ApiProperty({
    minLength: 8,
    maxLength: 32,
  })
  password: string;

  @ApiPropertyOptional()
  contact?: string;

  @Matches(/^(admin|owner|employer)$/, {
    message: 'Incorrect user role!',
  })
  @ApiProperty({
    examples: ['admin', 'owner', 'employer'],
    default: 'admin',
  })
  role?: 'admin' | 'owner' | 'employer';
}
