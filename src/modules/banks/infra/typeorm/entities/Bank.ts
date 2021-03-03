import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('banks')
export default class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (ownerUser: User) => ownerUser.banks, {
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  public ownerUser: User;

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
