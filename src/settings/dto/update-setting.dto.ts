import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: any;
  @ApiProperty()
  accessLevel: 'admin' | 'owner' | 'employer';
}
