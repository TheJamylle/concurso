import { 
  Entity, 
  PrimaryGeneratedColumn, 
  BaseEntity, 
  Column, 
  ManyToOne, 
  JoinColumn } 
from 'typeorm';
import Premio from './Premio';

@Entity()
class Cronograma extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_cronograma!: number;

  @Column()
  data_inicio!: Date;

  @Column()
  data_fim!: Date;

  @Column()
  item!: string;

  @ManyToOne(() => Premio, premio => premio.id_premio)
  @JoinColumn({ name: 'id_premio_fk' })
  premio!: Premio;
}

export default Cronograma;