import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import People from '../../../../people/infra/typeorm/entities/People';
import Organization from '../../../../organizations/infra/typeorm/entities/Organization';

@Entity('banks')
export default class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agendorId: string;

  @Column()
  name: 'Travelex' | 'Ourinvest' | 'Frente';

  @Column()
  bankNumber: string;

  @Column()
  agency: string;

  @Column()
  account: string;

  @Column()
  iban: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
