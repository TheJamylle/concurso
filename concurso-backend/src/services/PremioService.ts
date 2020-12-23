import { getConnection } from 'typeorm';
import Area from '../models/Area';
import Cronograma from '../models/Cronograma';
import Premio from '../models/Premio';
import CronogramaService from './CronogramaService';

interface BasePremio {
    nome: string;

    descricao: string;

    ano: string;

    id_area: string;
}

class PremioService {
    public async create({ nome, descricao, ano, id_area }: BasePremio): Promise<Premio> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const premio = new Premio();
        premio.nome = nome;
        premio.descricao = descricao;
        premio.ano = parseInt(ano);
        premio.area = area;
        await premio.save();

        return premio;
    }

    public async update({ nome, descricao, ano, id_area }: BasePremio, id_premio: string): Promise<Premio> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const premio = await Premio.findOneOrFail({ where: { id_premio } });
        premio.area = area;
        premio.nome = nome;
        premio.descricao = descricao;
        premio.ano = parseInt(ano);
        await premio.save();

        return premio;
    }

    public async getByID(id_premio: string): Promise<Premio> {
        const premio = await getConnection()
                        .createQueryBuilder()
                        .select('premio.*, area.descricao as area')
                        .from(Premio, '')
                        .addFrom(Area, '')
                        .where('id_premio = :id', { id: id_premio })
                        .andWhere('id_area_fk = id_area')
                        .getRawOne();

        if(!premio) {
            throw new Error("ID do prêmio não existe");
        }

        premio.cronograma = await new CronogramaService().listByPremio(premio.id_premio);

        return premio;
    }

    public async list(): Promise<Array<Premio>> {
        const premios = await getConnection()
                            .createQueryBuilder()
                            .select('premio.*, area.descricao as area')
                            .from(Premio, '')
                            .addFrom(Area, '')
                            .andWhere('id_area_fk = id_area')
                            .getRawMany();

        for(let i = 0; i < premios.length; i+=1) {
          premios[i].cronograma = await new CronogramaService().listByPremio(premios[i].id_premio);
        }

        return premios;
    }

    public async delete(id_premio: string): Promise<void> {
        const premio = await Premio.findOneOrFail({ where: { id_premio } });

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Cronograma, '')
            .where('id_premio_fk = :id', { id: id_premio })
            .execute();

        await premio.remove();
    }

    public async listByArea(id_area: string): Promise<Array<Premio>> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const premios = await Premio.find({ where: { area } });

        return premios;
    }
}

export default PremioService;