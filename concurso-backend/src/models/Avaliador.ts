import { 
  Entity, 
  BaseEntity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToOne, 
  OneToMany,
  JoinColumn
} from 'typeorm';
import Avaliacao from './Avaliacao';
import Pessoa from './Pessoa';

@Entity()
class Avaliador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_avaliador!: number;

  @Column()
  registro!: string;

  @OneToOne(() => Pessoa, pessoa => pessoa.avaliador)
  @JoinColumn({ name: 'id_pessoa_fk' })
  pessoa!: Pessoa;

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.avaliador)
  avaliacoes?: Array<Avaliacao>;
}

export default Avaliador;