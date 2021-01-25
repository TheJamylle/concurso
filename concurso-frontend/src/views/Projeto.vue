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
                                        <p style="color: #fff"><b>Área</b></p>
                                        <div id="sel" v-for="area in areas" :key="area.id_area">
                                            <base-radio :value="area.id_area" :name="area.id_area" v-model="projetoEscolhido.id_area_fk" class="mb-3">
                                            {{ area.descricao }}
                                            </base-radio>
                                        </div>
                                        <hr>
                                        <p style="color: #fff"><b>Prêmio</b></p>
                                        <div id="sad" v-for="premio in premios" :key="premio.id_premio">
                                            <base-radio :value="premio.id_premio" :name="premio.id_premio" v-model="projetoEscolhido.id_premio_fk" class="mb-3">
                                            {{ premio.nome }}
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
            <tabs :fill="false" circle style="position: absolute; margin-left: 80%;">
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

            <modal :show.sync="rated"
                   gradient="primary"
                   modal-classes="modal-primary modal-dialog-centered">
                   <h5 slot="header" style="color: #fff" class="modal-title" id="modal-title-notification">
                     Projetos Avaliados
                   </h5>
                <template>
                  <table class="table mt-1" style="background: transparent; border-radius: 7px; opacity: 0.95; font-size: 14px">
                <thead style="background: #fff" class="title text-primary">
                    <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autores</th>
                    <th scope="col">Avaliadores</th>
                    <th scope="col">Avaliações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pro in projetosRated" :key="pro.projeto_id_projeto">
                    <th scope="row">{{ pro.projeto_id_projeto }}</th>
                    <td>{{ pro.projeto_titulo }}</td>
                    <td><p v-for="cand in pro.autores" :key="cand.id_candidato">{{ cand.nome }}</p></td>
                    <td><p v-for="ava in pro.avaliacoes" :key="ava.id_avaliacao">{{ ava.nome }}</p></td>
                    <td><p v-for="ava in pro.avaliacoes" :key="ava.id_avaliacao">{{ ava.nota }}</p></td>
                    </tr>
                </tbody>
                  </table>
                </template>
            </modal>

            <modal :show.sync="notRated"
                   gradient="danger"
                   modal-classes="modal-danger modal-dialog-centered">
                <template>
                  <h5 slot="header" style="color: #fff" class="modal-title" id="modal-title-notification">
                     Projetos Não Avaliados
                   </h5>
                   <table class="table mt-1" style="background: transparent; border-radius: 7px; opacity: 0.95; font-size: 14px">
                <thead style="background: #fff" class="title text-danger">
                    <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autores</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pro in projetosRated" :key="pro.projeto_id_projeto">
                    <th scope="row">{{ pro.projeto_id_projeto }}</th>
                    <td>{{ pro.projeto_titulo }}</td>
                    <td><p v-for="cand in pro.autores" :key="cand.id_candidato">{{ cand.nome }}</p></td>
                    </tr>
                </tbody>
                  </table>
                </template>
            </modal>

            <modal :show.sync="winner"
                   gradient="success"
                   modal-classes="modal-success modal-dialog-centered">
                   <h5 slot="header" style="color: #fff" class="modal-title" id="modal-title-notification">
                     Projetos Avaliados
                   </h5>
                <template>
                  <table class="table mt-1" style="background: transparent; border-radius: 7px; opacity: 0.95; font-size: 14px">
                <thead style="background: #fff" class="title text-success">
                    <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autores</th>
                    <th scope="col">Avaliadores</th>
                    <th scope="col">Nota Final</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pro in projetosWinners" :key="pro.projeto_id_projeto">
                    <th scope="row">{{ pro.projeto_id_projeto }}</th>
                    <td>{{ pro.projeto_titulo }}</td>
                    <td><p v-for="cand in pro.autores" :key="cand.id_candidato">{{ cand.nome }}</p></td>
                    <td><p v-for="ava in pro.avaliacoes" :key="ava.id_avaliacao">{{ ava.nome }}</p></td>
                    <td><p v-for="ava in pro.avaliacoes" :key="ava.id_avaliacao">{{ ava.nota }}</p></td>
                    </tr>
                </tbody>
                  </table>
                  {{projetosWinners}}
                </template>
            </modal>
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
       premios: [],
       projetoEscolhido: {},
       projetosWinners: [],
       projetosRated: [],
       projetosNotRated: []
    }
  },

  mounted () {
    this.getAllProjetos();
    this.getAreas();
    this.getProjetosRated();
    this.getProjetosNoRated();
    this.getAllPremios();
  },

  methods: {
    getAllProjetos() {
      axios.get(`http://localhost:7777/projeto`)
        .then(response => {
          this.projetos = response.data
        });
    },

    async getAllPremios() {
      console.log(this.premios);
      await axios.get(`http://localhost:7777/premio`)
        .then(response => {
          this.premios = response.data
      });
      console.log(this.premios);
    },

    async getProjetosRated() {
      axios.get(`http://localhost:7777/projeto/avaliados`).then(response => {
        this.projetosRated = response.data
      });
    },

    async getProjetosNoRated() {
      axios.get(`http://localhost:7777/projeto/naoavaliados`).then(response => {
        this.projetosNotRated = response.data
      });
    },

    async getProjetosWinners() {
      axios.get(`http://localhost:7777/projeto/vencedores`).then(response => {
        this.projetosWinners = response.data
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
      console.log(this.projetoEscolhido);
      await axios.put(`http://localhost:7777/projeto/${id}`, {
        titulo: this.projetoEscolhido.titulo, 
        resumo: this.projetoEscolhido.resumo, 
        data_envio: new Date(), 
        id_area: this.projetoEscolhido.id_area_fk,
        id_premio_fk: this.projetoEscolhido.id_premio_fk
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
