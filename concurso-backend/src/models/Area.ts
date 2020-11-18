import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import Premio from './Premio';
import Projeto from './Projeto';

@Entity({ name: 'area' })
class Area extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_area!: number;

  @Column()
  descricao!: string;

  @OneToMany(() => Premio, premio => premio.area)
  premios?: Array<Premio>;

  @OneToMany(() => Projeto, projeto => projeto.area)
  projetos?: Array<Projeto>;
}

export default Area;