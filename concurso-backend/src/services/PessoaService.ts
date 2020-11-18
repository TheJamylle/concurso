import Pessoa from '../models/Pessoa';
import Candidato from '../models/Candidato';
import Avaliador from '../models/Avaliador';
import Projeto from '../models/Projeto';
import { getConnection } from 'typeorm';

interface General {
    nome: string;
    
    cpf: string;
    
    data_nascimento: Date;
    
    endereco: { 
        logradouro: string; 
        numero: string; 
        quadra: string; 
        bairro: string; 
        cidade: string; 
        uf: string; 
   };

   telefone?: {
        ddd: number;

        numero: number;

        tipo: string;
   }
}

interface BaseCandidato {
    numero_inscricao: string;

    id_projeto: string;
}

class PessoaService {
    public async createCandidato(
        { nome, cpf, data_nascimento, endereco, telefone }: General, 
        { numero_inscricao, id_projeto }: BaseCandidato
        ): Promise<Candidato> {
        const verificaPessoa = await Pessoa.findOne({ where: { cpf } });

        if(verificaPessoa) {
            throw new Error("CPF já cadastrado no sistema");
        }

        const pessoa = new Pessoa();
        pessoa.nome = nome;
        pessoa.cpf = cpf;
        pessoa.data_nascimento = data_nascimento;
        pessoa.endereco = endereco;
        await pessoa.save();

        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        const candidato = new Candidato();
        candidato.numero_inscricao = parseInt(numero_inscricao);
        candidato.pessoa = pessoa;
        candidato.projeto = projeto;
        await candidato.save();

        pessoa.candidato = candidato;
        await pessoa.save();

        return candidato;
    }

    public async updateCandidato(
        { nome, cpf, data_nascimento, endereco }: General, 
        { numero_inscricao, id_projeto }: BaseCandidato
    ): Promise<Candidato> {
        const candidato = await Candidato.findOneOrFail({ where: { numero_inscricao } });

        const pessoa = await Pessoa.findOneOrFail({ where: { cpf } });

        pessoa.nome = nome;
        pessoa.data_nascimento = data_nascimento;
        pessoa.endereco = endereco;
        await pessoa.save();

        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        candidato.pessoa = pessoa;
        candidato.projeto = projeto;
        await candidato.save();

        return candidato;
    }

    public async deleteCandidato(numero_inscricao: string): Promise<void> {
        const candidato = await getConnection()
        .createQueryBuilder()
        .select('*')
        .from(Candidato, '')
        .where('numero_inscricao = :id', { id: numero_inscricao })
        .getRawOne();

        const pessoa = await Pessoa.findOneOrFail({ where: { id_pessoa: candidato.id_pessoa_fk } });

        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Candidato)
        .where('id_candidato = :i', { i: candidato.id_candidato })
        .execute();

        await pessoa.remove();
    }

    public async getByIDCandidato(id_candidato: string): Promise<Candidato> {
        const candidato = await Candidato.findOne({ where: { id_candidato } });

        if(!candidato) {
            throw new Error("ID do candidato não existe");
        }

        return candidato;
    }

    public async listCandidatos(): Promise<Array<Candidato>> {
        const candidatos = await Candidato.find();

        return candidatos;
    }

    public async listCandidatosByProjeto(id_projeto: number): Promise<Array<Candidato>> {
        const projeto = await Projeto.findOneOrFail({ where: { id_projeto } });

        const candidatos = await Candidato.find({ where: { projeto } });

        return candidatos;
    }

    public async createAvaliador(
        { nome, cpf, data_nascimento, endereco }: General,
        registro: string): Promise<Avaliador> {
        const verificaPessoa = await Pessoa.findOne({ where: { cpf } });

        if(verificaPessoa) {
            throw new Error("CPF já cadastrado no sistema");
        }
        const pessoa = new Pessoa();
        pessoa.nome = nome;
        pessoa.cpf = cpf;
        pessoa.data_nascimento = data_nascimento;
        pessoa.endereco = endereco;
        await pessoa.save();

        const avaliador = new Avaliador();
        avaliador.pessoa = pessoa;
        avaliador.registro = registro;
        await avaliador.save();

        pessoa.avaliador = avaliador;
        await pessoa.save();

        return avaliador;
    }

    public async updateAvaliador(
        { nome, cpf, data_nascimento, endereco }: General,
        registro: string): Promise<Avaliador> {
        const avaliador = await Avaliador.findOneOrFail({ where: { registro } });

        const pessoa = await Pessoa.findOneOrFail({ where: { cpf } });

        pessoa.nome = nome;
        pessoa.data_nascimento = data_nascimento;
        pessoa.endereco = endereco;
        await pessoa.save();

        avaliador.pessoa = pessoa;
        await avaliador.save();

        return avaliador;
    }

    public async deleteAvaliador(registro: string): Promise<void> {
        const avaliador = await getConnection()
        .createQueryBuilder()
        .select('*')
        .from(Avaliador, '')
        .where('registro = :id', { id: registro })
        .getRawOne();

        const pessoa = await Pessoa.findOneOrFail({ where: { id_pessoa: avaliador.id_pessoa_fk } });

        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Avaliador)
        .where('id_avaliador = :i', { i: avaliador.id_avaliador })
        .execute();

        await pessoa.remove();
    }

    public async getByIDAvaliador(id_avaliador: string): Promise<Avaliador> {
        const avaliador = await Avaliador.findOne({ where: { id_avaliador } });

        if(!avaliador) {
            throw new Error("ID do avaliador não existe");
        }

        return avaliador;
    }

    public async listAvaliadores(): Promise<Array<Avaliador>> {
        const avaliadores = await Avaliador.find();

        return avaliadores;
    }
}

export default PessoaService;