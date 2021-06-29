import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Enterprise from './Enterprise';

@Entity('socios')
export default class Socio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  cnhFront: string;

  @Column({ nullable: true })
  cnhBack: string;

  @Column({ nullable: true })
  rgFront: string;

  @Column({ nullable: true })
  rgBack: string;

  @Column({ nullable: true })
  cpfFront: string;

  @Column({ nullable: true })
  cpfBack: string;

  @ManyToOne(() => Enterprise, enterprise => enterprise.socios, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  enterprise: Enterprise;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
