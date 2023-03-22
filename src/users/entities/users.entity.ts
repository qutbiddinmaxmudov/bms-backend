import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  contact: string;

  @CreateDateColumn({ type: 'date' })
  startDate: Date;

  @CreateDateColumn({ type: 'date', nullable: true, default: null })
  finishDate: Date;

  @Column({ default: 'owner' })
  role: 'owner' | 'employer';

  @Column({ default: true })
  isActive: boolean;
}
