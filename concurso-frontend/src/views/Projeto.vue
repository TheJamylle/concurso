<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
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
                        <h1 class="display-3  text-white">Projetos
                            <span>que estão concorrendo a prêmios</span>
                        </h1>
                                
                    </div>
                </div>
            </div>
            
        </div>
        <div class="container py-0">
                <div class="row row-grid align-items-center">
                    <div class="col-md-6 order-lg-2 ml-lg-auto">
                        <div class="position-relative pl-md-5">
                            <img src="img/ill/ill-2.svg" class="img-center img-fluid">
                        </div>
                    </div>
                    <div class="col-lg-6 order-lg-1" id="pros">
                        <card shadow class="shadow-lg--hover mt-5" v-for="projeto in projetos" :key="projeto.id_projeto">
                            <div class="d-flex px-3">
                                <div>
                                    <icon name="ni ni-single-copy-04" gradient="primary" color="white" shadow
                                          rounded></icon>
                                </div>
                                <div class="pl-4">
                                    <h5 class="title text-primary">{{ projeto.titulo }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <p style="font-size: 12px;"> Enviado em <b>{{ estilizaData(projeto.data_envio) }}</b></p></h5>
                                    <p>{{ projeto.resumo }}</p>
                                </div>
                                   
                            </div>
                            <div v-for="autor in projeto.autores" :key="autor.numero_inscricao">
                                <badge type="primary" rounded>{{ autor.nome }} - {{ autor.numero_inscricao }}</badge>
                            </div>
                            <base-button @click="delProjeto(projeto.id_projeto)" title="Excluir projeto" type="danger" style="float: right;">
                                        X
                            </base-button>

                            <base-button
                                type="primary"
                                @click="infoProjeto(projeto.id_projeto)"
                                title="Visualizar e Editar dados do Projeto"
                                style="float: right; ">
                                <i class="ni ni-settings"></i>
                            </base-button>


                            <modal :show.sync="modal"
                                    gradient="primary"
                                    modal-classes="modal-primary modal-dialog-centered">
                            <template>
                                    <form role="form" >
                                        <base-input alternative
                                                    class="mb-3"
                                                    placeholder="Título"
                                                    v-model="projetoEscolhido.titulo"
                                                    addon-left-icon="ni ni-bold">
                                        </base-input>
                                        <textarea class="form-control form-control-alternative" rows="3" alternative
                                                    placeholder="Resumo"
                                                    v-model="projetoEscolhido.resumo"
                                                    addon-left-icon="ni ni-collection">
                                        </textarea>
                                        <hr>
                                        <div id="sel" v-for="area in areas" :key="area.id_area">
                                            <base-radio :value="area.id_area" :name="area.id_area" v-model="projetoEscolhido.id_area_fk" class="mb-3">
                                            {{ area.descricao }}
                                            </base-radio>
                                        </div>
                                    </form>
                                </template>

                            <template slot="footer">
                                <base-button type="link"
                                            text-color="white"
                                            class="ml-auto"
                                            @click="modal = false">
                                    Cancelar
                                </base-button>
                                <base-button type="white" @click="update(projetoEscolhido.id_projeto)">Salvar</base-button>
                            </template>
                        </modal>
                        </card>
                    </div>
                </div>
            </div>
            <br>
            <modal-projeto></modal-projeto>
            <tabs :fill="false" circle style="position: fixed; margin-left: 80%;margin-top: -600px">
                <tab-pane>
                    <a slot="title" class="nav-link-icon d-block" title="Projetos Avaliados" @click="rated = true"><i class="ni ni-paper-diploma" ></i></a>
                </tab-pane>
                <tab-pane>
                    <a slot="title" class="nav-link-icon d-block" title="Projetos Não Avaliados" @click="notRated = true"><i class="ni ni-map-big"></i></a>
                </tab-pane>
                <tab-pane>
                    <a slot="title" class="nav-link-icon d-block" title="Projetos Vencedores" @click="winner = true"><i
                           class="ni ni-trophy"></i></a>
                    </tab-pane>
                </tabs>
    </section>
</template>
<script>
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import ModalProjeto from './components/ModalProjeto.vue';
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";

export default {
  components: { ModalProjeto, Modal, Tabs, TabPane },
  name: "projeto",
  el: '#pros',

  data () {
    return {
       submitted: false,
       projetos: [],
       modal: false,
       rated: false,
       winner: false,
       notRated: false,
       areas: [],
       projetoEscolhido: {},
       projetosWinners: [],
       projetosRated: [],
       projetosNotRated: []
    }
  },

  mounted () {
    this.getAllProjetos();
    this.getAreas();
  },

  methods: {
    getAllProjetos() {
      axios.get(`http://localhost:7777/projeto`)
        .then(response => {
          this.projetos = response.data
        });
    },

    async getAreas() {
      await axios.get(`http://localhost:7777/area`)
        .then(response => {
          this.areas = response.data
      });
    },

    async infoProjeto(id) {
      await axios.get(`http://localhost:7777/projeto/${id}`).then(response => {
        this.projetoEscolhido = response.data
      });
      this.modal = true;
    },

    async update(id) {
      await axios.put(`http://localhost:7777/projeto/${id}`, {
        titulo: this.projetoEscolhido.titulo, 
        resumo: this.projetoEscolhido.resumo, 
        data_envio: new Date(), 
        id_area: this.projetoEscolhido.id_area_fk
      }).then();
      this.getAllProjetos();
      this.modal = false;
    },

    estilizaData (data) {
      const dataRenderizada = (
             (new Date(data).getDate()+1) > 9 ? (new Date(data).getDate()+1) : ("0"+(new Date(data).getDate()+1))
            )+"/"+
            (
             (new Date(data).getMonth()+1) > 9 ? (new Date(data).getMonth()+1) : ("0"+(new Date(data).getMonth()+1))
            )+"/"+new Date(data).getFullYear();
      return dataRenderizada;
    },

    async delProjeto(id) {
      await axios.delete(`http://localhost:7777/projeto/${id}`).then();
      this.getAllProjetos();
    },
  }
};
</script>
<style>
</style>
