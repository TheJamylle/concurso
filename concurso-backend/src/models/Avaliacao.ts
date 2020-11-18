import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Avaliador from './Avaliador';
import Projeto from './Projeto';

@Entity()
class Avaliacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_avaliacao!: number;

  @Column()
  parecer!: string;

  @Column()
  nota!: number;

  @Column()
  data_avaliacao!: Date;

  @ManyToOne(() => Avaliador, avaliador => avaliador.id_avaliador)
  @JoinColumn({ name: 'id_avaliador_fk' })
  avaliador!: Avaliador;

  @ManyToOne(() => Projeto, projeto => projeto.id_projeto)
  @JoinColumn({ name: 'id_projeto_fk' })
  projeto!: Projeto;
}

export default Avaliacao;