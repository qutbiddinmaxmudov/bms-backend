export class CreateSettingDto {
  name: string;
  value: string;
  accessLevel: 'admin' | 'owner' | 'employer';
}
