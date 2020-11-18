import { 
  Entity, 
  BaseEntity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn } 
from 'typeorm';
import Pessoa from './Pessoa';

@Entity()
class Telefone extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_telefone!: number;

  @Column()
  ddd!: number;

  @Column()
  numero!: number;

  @Column()
  tipo!: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.id_pessoa)
  @JoinColumn({ name: 'id_pessoa_fk' })
  pessoa?: Pessoa;
}

export default Telefone;