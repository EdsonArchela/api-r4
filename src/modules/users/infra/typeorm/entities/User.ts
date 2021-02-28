import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Organization from '../../../../organizations/infra/typeorm/entities/Organization';
import partnersRouter from '../../http/routes/partners.routes';
import { AbstractUser } from './AbstractUser';
import Partner from './Partners';
import Roles from './Roles';

@Entity('users')
class User extends AbstractUser {
  @Column('float8', { nullable: true })
  comission?: number;

  @OneToMany(
    () => Organization,
    (organizations: Organization) => organizations.ownerUser,
    { onDelete: 'CASCADE', onUpdate: 'SET NULL' },
  )
  public organizations: Organization[];

  @ManyToMany(() => Roles, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  @JoinTable()
  roles?: Roles[];

  @OneToMany(() => Partner, (partner: Partner) => partner.user, { eager: true })
  partners: Partner[];
}

export default User;
