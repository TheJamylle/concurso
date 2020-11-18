import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany } from 'typeorm';
import Avaliador from './Avaliador';
import Candidato from './Candidato';
import Telefone from './Telefone';

@Entity()
class Pessoa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_pessoa!: number;
  
  @Column()
  nome!: string;

  @Column()
  cpf!: string;

  @Column()
  data_nascimento!: Date;

  @Column({ type: 'json' })
  endereco!: { 
    logradouro: string; 
    numero: string; 
    quadra: string; 
    bairro: string; 
    cidade: string; 
    uf: string; 
  };

  @OneToOne(() => Avaliador, avaliador => avaliador.pessoa)
  avaliador?: Avaliador;

  @OneToOne(() => Candidato, candidato => candidato.pessoa)
  candidato?: Candidato;

  @OneToMany(() => Telefone, telefone => telefone.pessoa)
  telefones?: Array<Telefone>;
}

export default Pessoa;