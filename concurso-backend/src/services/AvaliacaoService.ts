import { getConnection } from 'typeorm';
import Avaliacao from '../models/Avaliacao';
import Avaliador from '../models/Avaliador';
import Pessoa from '../models/Pessoa';
import Projeto from '../models/Projeto';

interface BaseAvaliacao {
    parecer: string;

    nota: number;

    data_avaliacao: Date;

    id_avaliador: string;

    id_projeto: string;
}

class AvaliacaoService {
    public async create(
        { parecer, nota, data_avaliacao, id_avaliador, id_projeto }: BaseAvaliacao
    ): Promise<Avaliacao> {
        const avaliador = await Avaliador.findOneOrFail({ where: { id_avaliador } });

        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        const avaliacao = new Avaliacao();
        avaliacao.parecer = parecer;
        avaliacao.nota = nota;
        avaliacao.data_avaliacao = data_avaliacao;
        avaliacao.projeto = projeto;
        avaliacao.avaliador = avaliador;
        await avaliacao.save();

        return avaliacao;
    }

    public async update(
        { parecer, nota, data_avaliacao, id_avaliador, id_projeto }: BaseAvaliacao,
        id_avaliacao: string
    ): Promise<Avaliacao> {
        const avaliador = await Avaliador.findOneOrFail({ where: { id_avaliador } });

        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        const avaliacao = await Avaliacao.findOneOrFail({ where: { id_avaliacao } });

        avaliacao.parecer = parecer;
        avaliacao.nota = nota;
        avaliacao.data_avaliacao = data_avaliacao;
        avaliacao.projeto = projeto;
        avaliacao.avaliador = avaliador;
        await avaliacao.save();

        return avaliacao;
    }

    public async delete(id_avaliacao: string): Promise<void> {
        const avaliacao = await Avaliacao.findOneOrFail({ where: { id_avaliacao } });

        await avaliacao.remove();
    }

    public async getByID(id_avaliacao: string): Promise<Avaliacao> {
        const avaliacao = await getConnection()
                        .createQueryBuilder()
                        .select('avaliacao.*, titulo, avaliador.registro, pessoa.nome')
                        .from(Avaliacao, '')
                        .addFrom(Projeto, '')
                        .addFrom(Avaliador, '')
                        .addFrom(Pessoa, '')
                        .where('id_avaliacao = :id', { id: id_avaliacao })
                        .andWhere('id_avaliador_fk = id_avaliador')
                        .andWhere('id_projeto_fk = id_projeto')
                        .andWhere('id_pessoa_fk = id_pessoa')
                        .getRawOne();

        if(!avaliacao) {
            throw new Error("Avaliação não encontrada");
        }

        return avaliacao;
    }

    public async list(): Promise<Array<Avaliacao>> {
        const avaliacoes = await getConnection()
            .createQueryBuilder()
            .select('avaliacao.*, titulo, avaliador.registro, pessoa.nome')
            .from(Avaliacao, '')
            .addFrom(Projeto, '')
            .addFrom(Avaliador, '')
            .addFrom(Pessoa, '')
            .where('id_avaliador_fk = id_avaliador')
            .andWhere('id_projeto_fk = id_projeto')
            .andWhere('id_pessoa_fk = id_pessoa')
            .getRawMany();

        return avaliacoes;
    }

    public async listAvaliacoesByProjeto(id_projeto: number): Promise<Array<Avaliacao>> {
        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        const avaliacoes = await getConnection()
                        .createQueryBuilder()
                        .select('avaliacao.*, titulo, avaliador.registro, pessoa.nome')
                        .from(Avaliacao, '')
                        .addFrom(Projeto, '')
                        .addFrom(Avaliador, '')
                        .addFrom(Pessoa, '')
                        .where('id_avaliador_fk = id_avaliador')
                        .andWhere('id_projeto = :id', { id: projeto.id_projeto })
                        .andWhere('id_projeto_fk = id_projeto')
                        .andWhere('id_pessoa_fk = id_pessoa')
                        .getRawMany();

        return avaliacoes;
    }
}

export default AvaliacaoService;