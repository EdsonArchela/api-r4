import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Permission from './Permissions';

@Entity('roles')
class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Permission, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL',
  })
  @JoinTable()
  permissions: Permission[];
}
export default Roles;
