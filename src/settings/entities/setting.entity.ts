import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  @Column()
  accessLevel: 'admin' | 'owner' | 'employer';
}
