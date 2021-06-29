import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseClient } from './BaseClient';
import Socio from './Socio';
import Kyc from './Kyc';

@Entity('enterprise')
export default class Enterprise extends BaseClient {
  @Column({ nullable: true })
  patrimonialBalance: string;

  @Column({ nullable: true })
  revenues: string;

  @Column({ nullable: true })
  dre: string;

  @Column({ nullable: true })
  socialContract: string;

  @Column({ nullable: true })
  addressDocumment: string;

  @OneToOne(() => Kyc, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  kyc: Kyc;

  @OneToMany(() => Socio, socio => socio.enterprise, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  socios: Socio[];
}
