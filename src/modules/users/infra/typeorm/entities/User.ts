import { Exclude } from 'class-transformer';
import { Entity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import Organization from '../../../../organizations/infra/typeorm/entities/Organization';
import { AbstractUser } from './AbstractUser';
import Partner from './Partners';
import Roles from './Roles';

@Entity('users')
class User extends AbstractUser {
  @Column('float8', { nullable: true })
  @Exclude()
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
