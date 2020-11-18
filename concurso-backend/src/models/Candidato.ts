import { 
  Entity, 
  BaseEntity, 
  OneToOne, 
  JoinColumn, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne}
from 'typeorm';
import Pessoa from './Pessoa';
import Projeto from './Projeto';

@Entity()
class Candidato extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_candidato!: number;

  @Column()
  numero_inscricao!: number;

  @OneToOne(() => Pessoa, pessoa => pessoa.candidato)
  @JoinColumn({ name: 'id_pessoa_fk' })
  pessoa!: Pessoa;

  @ManyToOne(() => Projeto, projeto => projeto.id_projeto)
  @JoinColumn({ name: 'id_projeto_fk' })
  projeto!: Projeto;
}

export default Candidato;

