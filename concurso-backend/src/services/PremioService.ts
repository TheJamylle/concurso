import Area from '../models/Area';
import Premio from '../models/Premio';

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
        const premio = await Premio.findOne({ where: { id_premio } });

        if(!premio) {
            throw new Error("ID do prêmio não existe");
        }

        return premio;
    }

    public async list(): Promise<Array<Premio>> {
        const premios = await Premio.find();

        return premios;
    }

    public async delete(id_premio: string): Promise<void> {
        const premio = await Premio.findOneOrFail({ where: { id_premio } });

        premio.remove();
    }

    public async listByArea(id_area: string): Promise<Array<Premio>> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const premios = await Premio.find({ where: { area } });

        return premios;
    }
}

export default PremioService;