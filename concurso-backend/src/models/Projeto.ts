import { 
  Entity, 
  BaseEntity, 
  OneToMany, 
  ManyToOne, 
  JoinColumn, 
  PrimaryGeneratedColumn,
  Column } 
from 'typeorm';
import Area from './Area';
import Avaliacao from './Avaliacao';
import Candidato from './Candidato';
import Premio from './Premio';

@Entity()
class Projeto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_projeto!: number;

  @Column()
  titulo!: string;

  @Column()
  resumo!: string;

  @Column()
  data_envio!: Date;

  @ManyToOne(() => Area, area => area.id_area)
  @JoinColumn({ name: 'id_area_fk' })
  area!: Area;

  @ManyToOne(() => Premio, premio => premio.id_premio)
  @JoinColumn({ name: 'id_premio_fk' })
  premio?: Premio;

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.projeto)
  avaliacoes?: Array<Avaliacao>;

  @OneToMany(() => Candidato, candidato => candidato.projeto)
  autores?: Array<Candidato>;
}

export default Projeto;