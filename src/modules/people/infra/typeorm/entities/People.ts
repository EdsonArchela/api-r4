import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Partner from '@modules/users/infra/typeorm/entities/Partners';
import Deal from '@modules/deals/infra/typeorm/entities/Deal';
import Bank from '../../../../banks/infra/typeorm/entities/Bank';

@Entity('peoples')
export default class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (ownerUser: User) => ownerUser.peoples, {
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  public ownerUser: User;

  @OneToOne(() => Partner)
  @JoinColumn()
  partner?: Partner;

  @Column()
  agendor_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  organization?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  _webUrl?: string;

  @Column({ nullable: true })
  link?: string;

  @ManyToOne(() => Deal, {
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
    eager: true,
  })
  @JoinTable()
  deals: Deal[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
