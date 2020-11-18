import { getConnection } from 'typeorm';
import Area from '../models/Area';

interface UpdateArea {
    id_area: string;

    descricao: string;
}

class AreaService {
    public async create(descricao: string): Promise<Area> {
        const area = new Area();
        area.descricao = descricao;
        await area.save();

        return area;
    }

    public async update({ id_area, descricao }: UpdateArea): Promise<Area> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        area.descricao = descricao;
        await area.save();

        return area;
    }

    public async getByID(id_area: string): Promise<Area> {
        const area = await Area.findOne({ where: { id_area } });

        if(!area) {
            throw new Error("ID de area informado não existe");
        }

        return area;
    }

    public async list(): Promise<Array<Area>> {
        const areas = await Area.find();

        return areas;
    }

    public async delete(id_area: string): Promise<void> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Area)
            .where('id_area = :id', { id: area.id_area })
            .execute();
    }
}

export default AreaService;