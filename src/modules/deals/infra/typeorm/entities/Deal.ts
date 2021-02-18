import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('deals')
class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  deal_id: string;

  @Column()
  ownnerId: string;

  @Column()
  agendorOrganizationId: string;

  @Column()
  a_email: string;

  @Column()
  operationType: string;

  @Column()
  bank: string;

  @Column()
  currency: string;

  @Column()
  direction: string;

  @Column()
  flow: string;

  @Column()
  value: number;

  @Column()
  assFee: number;

  @Column()
  r4Fee: number;

  @Column()
  contract: number;

  @Column()
  cet: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Deal;
