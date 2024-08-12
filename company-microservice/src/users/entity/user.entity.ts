import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({})
  role: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: true })
  resetToken: string;
  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date;
}
