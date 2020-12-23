import { getConnection } from 'typeorm';
import Area from '../models/Area';
import Avaliacao from '../models/Avaliacao';
import Projeto from '../models/Projeto';
import AvaliacaoService from './AvaliacaoService';
import PessoaService from './PessoaService';

interface BaseProjeto {
    titulo: string;

    resumo: string;

    data_envio: Date;

    id_area: string;
}

class ProjetoService {
    public async create({ titulo, resumo, data_envio, id_area }: BaseProjeto): Promise<Projeto> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const projeto = new Projeto();
        projeto.titulo = titulo;
        projeto.resumo = resumo;
        projeto.data_envio = data_envio;
        projeto.area = area;
        await projeto.save();

        return projeto;
    }

    public async update(
        { titulo, resumo, data_envio, id_area }: BaseProjeto, 
        id_projeto: string): Promise<Projeto> {
        const area = await Area.findOneOrFail({ where: { id_area } });

        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        projeto.titulo = titulo;
        projeto.resumo = resumo;
        projeto.data_envio = data_envio;
        projeto.area = area;
        await projeto.save();

        return projeto;
    }

    public async getByID(id_projeto: string): Promise<Projeto> {
        const projeto = await getConnection()
            .createQueryBuilder()
            .select('*')
            .from(Projeto, '')
            .where('id_projeto = :id', { id: id_projeto })
            .getRawOne();

        if(!projeto) {
            throw new Error("ID do projeto não existe");
        }

        return projeto;
    }

    public async list(): Promise<Array<Projeto>> {
        const projetos = await getConnection().createQueryBuilder().select('*').from(Projeto, '').getRawMany();

        for(let i = 0; i < projetos.length; i++) {
            projetos[i].autores = await new PessoaService()
            .listCandidatosByProjeto(projetos[i].id_projeto);
        }

        return projetos;
    }

    public async listNaoAvaliados(): Promise<Array<Projeto>> {
        const subQuery = Projeto.createQueryBuilder('projeto');

        const projetosNaoAvaliados = await subQuery
        .where(
            'id_projeto NOT IN'+ subQuery
               .subQuery().select('id_projeto_fk')
               .from(Avaliacao, '')
               .getQuery()
        )
        .getRawMany();

        for(let i = 0; i < projetosNaoAvaliados.length; i++) {
            projetosNaoAvaliados[i].autores = 
            await new PessoaService().listCandidatosByProjeto(projetosNaoAvaliados[i].projeto_id_projeto);
        }

        return projetosNaoAvaliados;
    }

    public async listAvaliados(): Promise<Array<Projeto>> {
        const subQuery = Projeto.createQueryBuilder('projeto');

        const projetosAvaliados = await subQuery
        .where(
            'id_projeto IN'+ subQuery
               .subQuery().select('id_projeto_fk')
               .from(Avaliacao, '')
               .getQuery()
        )
        .getRawMany();

        for(let i = 0; i < projetosAvaliados.length; i++) {
            projetosAvaliados[i].autores = 
            await new PessoaService().listCandidatosByProjeto(projetosAvaliados[i].projeto_id_projeto);
            
            projetosAvaliados[i].avaliacoes = 
            await new AvaliacaoService().listAvaliacoesByProjeto(projetosAvaliados[i].projeto_id_projeto);
        }

        return projetosAvaliados;
    }

    public async listVencedores(): Promise<Array<Projeto>> {
        const projetos = await getConnection()
        .createQueryBuilder()
        .select(`projeto.*`)
        .addSelect(
            subQuery => {
                return subQuery
                    .select('(SUM(nota)/COUNT(nota))')
                    .from(Avaliacao, '')
                    .where('id_projeto = id_projeto_fk')
            }, 'nota_media'
        )
        .from(Projeto, '')
        .where('id_premio_fk IS NOT NULL')
        .orderBy('nota_media', 'DESC')
        .getRawMany();
        
        return projetos;
    }

    public async delete(id_projeto: string): Promise<void> {
        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        await projeto.remove();
    }
}

export default ProjetoService;