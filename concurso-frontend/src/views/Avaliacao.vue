<template>
    <div>
        <div class="position-relative">
            <section class="section section-shaped section-lg my-0">
            <div class="shape shape-style-1 bg-gradient-info">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
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
                            <h1 class="display-3  text-white">Avaliações
                                <span> de projetos já enviados</span>
                            </h1>
                                
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
        
        <section class="section section-lg pt-lg-0 mt--200">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <br><br><br><br><br><br><br><br><br><br>
                        <div class="row row-grid" id="cards">
                            <div class="col-lg-4" v-for="avaliacao in avaliacoes" :key="avaliacao.id_avaliacao">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <h6 class="text-info text-uppercase">{{ avaliacao.titulo }}</h6>
                                    
                                    <p class="description mt-3">{{ avaliacao.parecer }}</p>
                                    <div>
                                        <badge type="info" rounded>{{ estilizaData(avaliacao.data_avaliacao) }}</badge>
                                        <badge type="info" rounded>Nota: {{ avaliacao.nota }}</badge>
                                    </div> 
                                    <br>
                                <base-button type="info" title="Visualizar Dados da Avaliação" @click="infoAvaliacao(avaliacao.id_avaliacao)">
                                    <i class="ni ni-paper-diploma"></i>
                                </base-button>
                                <base-button @click="delAvaliacao(avaliacao.id_avaliacao)" type="danger" style="float: right;">
                                        X
                                </base-button>                           
                                </card>
                                                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-shaped my-0 overflow-hidden">
            <div class="shape shape-style-3 bg-gradient-info shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container pt-lg pb-300">
                <div class="row text-center justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="display-3 text-white">Inserir nova Avaliação</h2>
                        <p class="lead text-white">No formulário abaixo informe os dados da avaliação que deseja incluir no sistema</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg pt-lg-0 section-contact-us">
            <div class="container">
                <div class="row justify-content-center mt--300">
                    <div class="col-lg-8">
                        <card gradient="secondary" shadow body-classes="p-lg-5" v-if="!submitted">
                            <h4 class="mb-3" style="color: #2C92B8">Nova Avaliação</h4>
                            <base-input addon-left-icon="ni ni-calendar-grid-58">
                                <flat-picker slot-scope="{focus, blur}"
                                            @on-open="focus"
                                            @on-close="blur"
                                            placeholder="Data da Avaliação"
                                            :config="{allowInput: true}"
                                            class="form-control datepicker"
                                            v-model="newAvaliacao.data_avaliacao">
                                </flat-picker>
                            </base-input>
                            <base-input 
                                        alternative
                                        type="number"
                                        v-model="newAvaliacao.nota"
                                        placeholder="Nota"
                                        addon-left-icon="ni ni-check-bold">
                                
                            </base-input>
                            <base-dropdown>
                                <base-button slot="title" type="secondary" class="dropdown-toggle">
                                {{projetoSel}}
                                </base-button>
                                <div v-for="projeto in projetos" :key="projeto.id_projeto">
                                <a class="dropdown-item" @click="(projetoSel = projeto.titulo, newAvaliacao.id_projeto = projeto.id_projeto)">{{projeto.titulo}}</a>
                                </div>
                            </base-dropdown>
                            <base-dropdown>
                                <base-button slot="title" type="secondary" class="dropdown-toggle">
                                {{avaliadorSel}}
                                </base-button>
                                <div v-for="avaliador in avaliadores" :key="avaliador.id_avaliador">
                                <a class="dropdown-item" 
                                    @click="(avaliadorSel = avaliador.nome, newAvaliacao.id_avaliador = avaliador.id_avaliador)">
                                        {{avaliador.nome}} - {{avaliador.registro}}
                                </a>
                                </div>
                            </base-dropdown>
                            <br><br>
                            <textarea class="form-control form-control-alternative" rows="3" alternative
                                       placeholder="Parecer"
                                       v-model="newAvaliacao.parecer"
                                       addon-left-icon="ni ni-collection">
                            </textarea>
                            <hr>
                            <base-button type="info" round block size="lg" @click="addAvaliacao">
                                Cadastrar
                            </base-button>
                        </card>
                        <card v-else>
                            <h4 class="mb-1" style="color: #2C92B8">Avaliação cadastrada com sucesso!</h4>
                        </card>
                    </div>
                </div>
            </div>
        </section>
        <modal :show.sync="modals.modal"
                gradient="info"
                modal-classes="modal-info modal-dialog-centered">
            <template>
                <form role="form" >
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                     <flat-picker slot-scope="{focus, blur}"
                            @on-open="focus"
                            @on-close="blur"
                            placeholder="Data da Avaliação"
                            :config="{allowInput: true}"
                            class="form-control datepicker"
                            v-model="avaliacaoEscolhida.data_avaliacao">
                     </flat-picker>
                    </base-input>
                    <base-input 
                        alternative
                        type="number"
                        v-model="avaliacaoEscolhida.nota"
                        placeholder="Nota"
                        addon-left-icon="ni ni-check-bold">
                    </base-input>
                    <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                            {{avaliacaoEscolhida.titulo}}
                        </base-button>
                        <div v-for="projeto in projetos" :key="projeto.id_projeto">
                            <a class="dropdown-item" @click="(avaliacaoEscolhida.titulo = projeto.titulo, avaliacaoEscolhida.id_projeto_fk = projeto.id_projeto)">{{projeto.titulo}}</a>
                        </div>
                    </base-dropdown>
                    <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                            {{avaliacaoEscolhida.nome}}
                        </base-button>
                        <div v-for="avaliador in avaliadores" :key="avaliador.id_avaliador">
                            <a class="dropdown-item" 
                                @click="(avaliacaoEscolhida.nome = avaliador.nome, avaliacaoEscolhida.id_avaliador_fk = avaliador.id_avaliador)">
                              {{avaliador.nome}} - {{avaliador.registro}}
                            </a>
                        </div>
                    </base-dropdown>
                    <br><br>
                    <textarea class="form-control form-control-alternative" rows="3" alternative
                        placeholder="Parecer"
                        v-model="avaliacaoEscolhida.parecer"
                        addon-left-icon="ni ni-collection">
                    </textarea>
                </form>
                </template>
                <template slot="footer">
                    <base-button type="link"
                        text-color="white"
                        class="ml-auto"
                        @click="modals.modal = false">
                        Cancelar
                    </base-button>
                    <base-button type="white" @click="update(avaliacaoEscolhida.id_avaliacao)">Atualizar</base-button>
                </template>
            </modal>
    </div>
</template>
<script>
import axios from 'axios';
import Modal from "@/components/Modal.vue";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import BaseDropdown from "@/components/BaseDropdown.vue";

export default {
  components: { 
      Modal,
      flatPicker,
      BaseDropdown 
  },
  name: "avaliacao",

  data () {
    return {
       submitted: false,
       projetos: [],
       avaliadores: [],
       modals: {
        modal: false,
       },
       avaliacaoEscolhida: {
       },
       projetoSel: 'Selecione um Projeto',
       avaliadorSel: 'Selecione um Avaliador',
       avaliacoes: [],
       newAvaliacao: {}
    }
  },

  mounted () {
    this.getAvaliacoes();
    this.getAllAvaliadores();
    this.getAllProjetos();
  },

  methods: {
    async addAvaliacao() {
      await axios.post(`http://localhost:7777/avaliacao`, {
        parecer: this.newAvaliacao.parecer, 
        nota: this.newAvaliacao.nota, 
        data_avaliacao: this.newAvaliacao.data_avaliacao, 
        id_avaliador: this.newAvaliacao.id_avaliador, 
        id_projeto: this.newAvaliacao.id_projeto
      });
      this.submitted = true;

      this.getAvaliacoes();
    },

    async getAvaliacoes() {
      await axios.get(`http://localhost:7777/avaliacao`)
        .then(response => {
          this.avaliacoes = response.data
      });
    },

    async getAllAvaliadores () {
      await axios.get(`http://localhost:7777/pessoa/avaliadores`).then(response => {
        this.avaliadores = response.data;
      });
    },

    async getAllProjetos() {
      await axios.get(`http://localhost:7777/projeto`)
        .then(response => {
          this.projetos = response.data
        });
    },

    async update(insc) {
        console.log(this.avaliacaoEscolhida);
      await axios.put(`http://localhost:7777/avaliacao/${insc}`, {
        parecer: this.avaliacaoEscolhida.parecer, 
        nota: this.avaliacaoEscolhida.nota, 
        data_avaliacao: new Date(this.avaliacaoEscolhida.data_avaliacao), 
        id_avaliador: this.avaliacaoEscolhida.id_avaliador_fk, 
        id_projeto: this.avaliacaoEscolhida.id_projeto_fk
      });
      this.modals.modal = false;
      this.getAvaliacoes();
    },

    async infoAvaliacao(insc) {
      await axios.get(`http://localhost:7777/avaliacao/${insc}`).then(response => {
        this.avaliacaoEscolhida = response.data
      });
      console.log(this.avaliacaoEscolhida);
      this.avaliacaoEscolhida.data_avaliacao = this.estilizaData(this.avaliacaoEscolhida.data_avaliacao);
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

    async delAvaliacao(id) {
      await axios.delete(`http://localhost:7777/avaliacao/${id}`).then();
      this.getAvaliacoes();
    }
  }
};
</script>
<style>
</style>
