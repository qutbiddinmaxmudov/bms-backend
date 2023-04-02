import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  @Column()
  accessLevel: 'admin' | 'owner' | 'employer';
}
