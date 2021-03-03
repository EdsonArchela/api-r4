import { Exclude } from 'class-transformer';
import { Entity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import Organization from '@modules/organizations/infra/typeorm/entities/Organization';
import People from '@modules/people/infra/typeorm/entities/People';
import { AbstractUser } from './AbstractUser';
import Partner from './Partners';
import Roles from './Roles';
import Bank from '../../../../banks/infra/typeorm/entities/Bank';

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

  @OneToMany(() => People, (peoples: People) => peoples.ownerUser, {
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  public peoples: People[];

  @OneToMany(() => Bank, (banks: Bank) => banks.ownerUser, {
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  public banks: Bank[];

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
