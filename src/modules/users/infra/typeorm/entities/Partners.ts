import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { AbstractUser } from './AbstractUser';
import Roles from './Roles';

@Entity('partners')
export default class Partner extends AbstractUser {
  @Column('float8')
  operationFee: number;

  @Column('float8')
  indicationFee: number;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Roles, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  @JoinTable()
  roles: Roles[] | undefined;

  @ManyToOne(() => User, (user: User) => user.partners)
  user: User;
}
