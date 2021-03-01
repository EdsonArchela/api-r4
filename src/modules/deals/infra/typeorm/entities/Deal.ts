import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Partner from '../../../../users/infra/typeorm/entities/Partners';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('deals')
class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User || Partner)
  @JoinTable()
  user: User | Partner;

  @Column()
  agendorOrganizationId: string;

  @Column()
  advisorId: string;

  @Column({ nullable: true })
  partnerId?: string;

  @Column()
  bank: string;

  @Column()
  currency: string;

  @Column()
  direction: boolean;

  @Column()
  operationType: string;

  @Column()
  flow: string;

  @Column('float8')
  value: number;

  @Column('float8')
  contract: number;

  @Column('float8', { default: 0 })
  spread: number;

  @Column('float8')
  iof: number;

  @Column('float8')
  ptax2: number;

  @Column('float8')
  ptax1: number;

  @Column('float8')
  ir: number;

  @Column('float8')
  contractDiscount: number;

  @Column('float8')
  assFee: number;

  @Column('float8')
  r4Fee: number;

  @Column('float8')
  cet: number;

  @Column('float8', { nullable: true })
  darf?: number;

  @Column('float8', { nullable: true })
  broker?: number;

  @Column('float8', { nullable: true })
  partner?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Deal;
