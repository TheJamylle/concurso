import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany, 
  JoinColumn, 
  BaseEntity, 
  ManyToOne} 
from 'typeorm';
import Area from './Area';
import Cronograma from './Cronograma';
import Projeto from './Projeto';

@Entity()
class Premio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_premio!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column()
  ano!: number;

  @ManyToOne(() => Area, area => area.id_area)
  @JoinColumn({ name: 'id_area_fk' })
  area!: Area;

  @OneToMany(() => Cronograma, cronograma => cronograma.premio)
  cronograma?: Array<Cronograma>;

  @OneToMany(() => Projeto, projeto => projeto.premio)
  projetos?: Array<Projeto>;
}

export default Premio;