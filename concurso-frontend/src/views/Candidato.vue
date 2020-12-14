<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-success">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container shape-container d-flex">
            <div class="col px-0">
                <div class="row">
                    <div class="col-lg-6">
                        <h1 class="display-3  text-white">Candidatos
                            <span>que estão participando de projetos</span>
                        </h1>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="container py-0">
            <div class="row row-grid align-items-center" >
                <table class="table mt-5" style="background: white; border-radius: 7px; opacity: 0.95">
                <thead>
                    <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Projeto</th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cand in candidatos" :key="cand.numero_inscricao">
                    <th scope="row">{{ cand.numero_inscricao }}</th>
                    <td>{{ cand.nome }}</td>
                    <td>{{ cand.titulo }}</td>
                    <td>
                        <base-button type="info" title="Visualizar Dados do Candidato" @click="infoCandidato(cand.numero_inscricao)">
                            <i class="ni ni-circle-08"></i>
                        </base-button>
                        
                        <base-button @click="delCandidato(cand.numero_inscricao)" title="Excluir candidato" type="danger" >
                            <i class="ni ni-fat-remove"></i>
                        </base-button>

                        <modal :show.sync="modals.modal"
                            gradient="secondary"
                            modal-classes="modal-secondary modal-dialog-centered">
                            <h5 slot="header" style="color: #0EBAB1" class="modal-title" id="modal-title-notification">Informações do Candidato</h5>

                            <template>
                                    <form role="form" >
                                        <h6 style="color: #0EBAB1"> <b>Nome</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="candidatoEscolhido.nome"
                                            >
                                        </base-input>
                                        <h6 style="color: #0EBAB1"> <b>CPF</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="candidatoEscolhido.cpf"
                                            >
                                        </base-input>
                                        <h6 style="color: #0EBAB1"> <b>Data de Nascimento</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="candidatoEscolhido.data_nascimento"
                                            >
                                        </base-input>
                                        <!-- <h6 style="color: #0EBAB1"> <b>Telefone</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="candidatoEscolhido.telefone.ddd"
                                            style="width: 20%; float: left">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="candidatoEscolhido.telefone.numero"
                                            style="width: 70%; float: right">
                                        </base-input> -->
                                    </form>
                                </template>

                            <template slot="footer">
                                <base-button type="white" class="ml-auto"
                                            @click="modals.modal = false">OK</base-button>
                            </template>
                        </modal>
                        
                        
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <modal-candidato></modal-candidato>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import Modal from "@/components/Modal.vue";
import ModalCandidato from './components/ModalCandidato.vue';

export default {
  components: { ModalCandidato, Modal },
  name: "candidato",

  data () {
    return {
       submitted: false,
       candidatos: [],
       modals: {
        modal: false,
       },
       candidatoEscolhido: {

       }
    }
  },

  mounted () {
    this.getAllCandidatos();
  },

  methods: {
    getAllCandidatos() {
      axios.get(`http://localhost:7777/pessoa/candidatos`)
        .then(response => {
          this.candidatos = response.data
        });
    },

    async infoCandidato(insc) {
      for(let i = 0; i < this.candidatos.length; i++) {
        if(this.candidatos[i].numero_inscricao == insc) {
          this.candidatoEscolhido = this.candidatos[i];
          break;
        }
      }
      this.candidatoEscolhido.data_nascimento = this.estilizaData(this.candidatoEscolhido.data_nascimento);
      this.modals.modal = true;
    },

    estilizaData (data) {
      const dataRenderizada = 
            (
             (new Date(data).getDate()+1) > 9 ? (new Date(data).getDate()+1) : ("0"+(new Date(data).getDate()+1))
            )+"/"+
            (
             (new Date(data).getMonth()+1) > 9 ? (new Date(data).getMonth()+1) : ("0"+(new Date(data).getMonth()+1))
            )+"/"+new Date(data).getFullYear();

      return dataRenderizada;
    },

    async delCandidato(id) {
      await axios.delete(`http://localhost:7777/pessoa/candidatos/${id}`).then();
      this.getAllCandidatos();
    }
  }
};
</script>
<style>
</style>
