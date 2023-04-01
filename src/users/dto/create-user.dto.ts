import { IsLowercase, Length, Matches, Validate } from 'class-validator';

export class CreateUserDto {
  firstName?: string;

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
  username: string;

  @Length(8, 32, {
    message: 'password must contain from 8 to 32 symbols.',
  })
  password: string;

  contact?: string;

  @Matches(/^(admin|owner|employer)$/, {
    message: 'Incorrect user role!',
  })
  role?: 'admin' | 'owner' | 'employer';
}
