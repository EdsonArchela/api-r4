import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('kycs')
export default class Kyc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contactName: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @Column()
  q1: string; //ramo de atividade

  @Column()
  q2: string; //Empresa já realizou operações de câmbio

  @Column()
  q3: string; //Volume financeiro operado nos últimos 12 meses

  @Column()
  q4: string; //volume financeiro esperado para os próximos 12 meses

  @Column()
  q5: string; //qual o tipo de operação (exportação, importação, ACC, ACE FINIMP)

  @Column()
  q6: string; //Quantidade de colaboradores

  @Column()
  q7: string; //frequência esperada de operações

  @Column()
  q8: string; //diária; semanal; quinzenal; mensal; exporádica

  @Column()
  q9: string; //qual % de câmbio representam do faturamento total da empresa

  @Column()
  q10: string; //banks

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
