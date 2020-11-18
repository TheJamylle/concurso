import { getConnection } from 'typeorm';
import Pessoa from '../models/Pessoa';
import Telefone from '../models/Telefone';

interface BaseTelefone {
    ddd: number;

    numero: number;

    tipo: string;

    id_pessoa: string;
}

class TelefoneService {
    public async create({ ddd, numero, tipo, id_pessoa }: BaseTelefone): Promise<Telefone> {
        const pessoa = await Pessoa.findOneOrFail({ where: { id_pessoa } });

        const telefone = new Telefone();
        telefone.ddd = ddd;
        telefone.numero = numero;
        telefone.tipo = tipo;
        telefone.pessoa = pessoa;
        await telefone.save();

        return telefone;
    }

    public async update(
        { ddd, numero, tipo, id_pessoa }: BaseTelefone, 
        id_telefone: string): Promise<Telefone> {
        const telefone = await Telefone.findOneOrFail({ where: { id_telefone } });

        const pessoa = await Pessoa.findOneOrFail({ where: { id_pessoa } });
        telefone.ddd = ddd;
        telefone.numero = numero;
        telefone.tipo = tipo;
        telefone.pessoa = pessoa;
        await telefone.save();

        return telefone;
    }

    public async delete(id_telefone: string): Promise<void> {
        const telefone = await Telefone.findOneOrFail({ where: { id_telefone } });

        await telefone.remove();
    }

    public async getByID(id_telefone: string): Promise<Telefone> {
        const telefone = await Telefone.findOne({ where: { id_telefone } });

        if(!telefone) {
            throw new Error("ID de telefone inexistente");
        }

        return telefone;
    }

    public async list(): Promise<Array<Telefone>> {
        const telefones = await Telefone.find();

        return telefones;
    }

    public async listByPessoa(id_pessoa: string): Promise<Array<Telefone>> {
        const pessoa = await Pessoa.findOneOrFail({ where: { id_pessoa } });

        const telefones = await getConnection()
        .createQueryBuilder()
        .select('*')
        .from(Telefone, '')
        .where('id_pessoa_fk = :id', { id: pessoa.id_pessoa })
        .getRawMany();

        return telefones;
    }
}

export default TelefoneService;