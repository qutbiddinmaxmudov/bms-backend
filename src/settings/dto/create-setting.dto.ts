import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  accessLevel: 'admin' | 'owner' | 'employer';
}
