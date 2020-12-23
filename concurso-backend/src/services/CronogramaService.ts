import { getConnection } from 'typeorm';
import Cronograma from '../models/Cronograma';
import Premio from '../models/Premio';

interface BaseCronograma {
    data_inicio: Date;

    data_fim: Date;

    item: string;

    id_premio: string;
}

class CronogramaService {
    public async create({ data_inicio, data_fim, item, id_premio }: BaseCronograma): Promise<Cronograma> {
        const premio = await Premio.findOneOrFail({ where: { id_premio } });

        const cronograma = new Cronograma();
        cronograma.item = item;
        cronograma.data_fim = data_fim;
        cronograma.data_inicio = data_inicio;
        cronograma.premio = premio;
        await cronograma.save();

        return cronograma;
    }

    public async update(
        { data_inicio, data_fim, item, id_premio }: BaseCronograma, 
        id_cronograma: string): Promise<Cronograma> {
        const premio = await Premio.findOneOrFail({ where: { id_premio } });

        const cronograma = await Cronograma.findOneOrFail({ where: { id_cronograma } });

        cronograma.data_inicio = data_inicio;
        cronograma.data_fim = data_fim;
        cronograma.item = item;
        cronograma.premio = premio;
        await cronograma.save();

        return cronograma;
    }

    public async delete(id_cronograma: string): Promise<void> {
        const cronograma = await Cronograma.findOneOrFail({ where: { id_cronograma } });

        await cronograma.remove();
    }

    public async getByID(id_cronograma: string): Promise<Cronograma> {
        const cronograma = await getConnection()
                            .createQueryBuilder()
                            .select('*')
                            .from(Cronograma, '')
                            .where('id_cronograma = :id', { id: id_cronograma })
                            .getRawOne();

        if(!cronograma) {
            throw new Error("Cronograma não encontrado");
        }

        return cronograma;
    }

    public async list(): Promise<Array<Cronograma>> {
        const cronogramas = await Cronograma.find();

        return cronogramas;
    }

    public async listByPremio(id_premio: number): Promise<Array<Cronograma>> {
        const premio = await Premio.findOneOrFail({ where: { id_premio } });

        const cronogramas = await Cronograma.find({ where: { premio } });

        return cronogramas;
    }
}

export default CronogramaService;