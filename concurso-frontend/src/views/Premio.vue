<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-dark shape-skew alpha-4">
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
                <h1 class="display-3  text-white">Prêmios
                    <span>ofertados no concurso</span>
                </h1>
            </div>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container" style="margin-top: -200px">
                <div id="prizes" v-for="premio in premios" :key="premio.id_premio" >
                    <tabs fill class="flex-column flex-md-row">
                    <card shadow slot-scope="{activeTabIndex}">
                        <tab-pane key="tab1">
                            <template slot="title">
                                {{ premio.nome }}
                            </template>

                            <p class="description">{{ premio.descricao }}</p><br><br>
                            <p class="description">Ano: {{ premio.ano }}</p>
                            <base-button @click="delPremio(premio.id_premio)" 
                                            title="Excluir cronograma" type="danger" 
                                            style="float: right">
                                <i class="ni ni-fat-remove"></i>
                            </base-button>
                        </tab-pane>

                        <tab-pane key="tab2">
                            <template slot="title">
                                Cronograma
                            </template>

                            <table class="table" style="background: white;opacity: 0.95">
                                <thead>
                                    <tr>
                                    <th scope="col">Nº</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Data Inicial</th>
                                    <th scope="col">Data Final</th>
                                    <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(cro, i) in premio.cronograma" :key="cro.id_cronograma">
                                    <th scope="row">{{ i+1 }}</th>
                                    <td>{{ cro.item }}</td>
                                    <td>{{ estilizaData(cro.data_inicio) }}</td>
                                    <td>{{ estilizaData(cro.data_fim) }}</td>
                                    <td>
                                        <base-button type="primary" title="Visualizar Dados do Cronograma" @click="infoCronograma(cro.id_cronograma)">
                                            <i class="ni ni-circle-08"></i>
                                        </base-button>
                                        
                                        <base-button @click="delCronograma(cro.id_cronograma)" title="Excluir cronograma" type="danger" >
                                            <i class="ni ni-fat-remove"></i>
                                        </base-button>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                <base-button @click="(modals.item = true, newCronograma.id_premio = premio.id_premio)"
                                    type="secondary"
                                    title="Registrar Novo Item"
                                    style="float: right;">
                                    <i class="ni ni-fat-add"></i>
                                </base-button>
                        </tab-pane>
                    </card>   
                    </tabs>
                </div>
                <br>
                <base-button @click="modals.prize = true"
                    type="default"
                    title="Registrar Novo Prêmio"
                    style="float: right;">
                    <i class="ni ni-fat-add"></i>
                </base-button>
            </div>
        </section>

        <modal :show.sync="modals.item"
                   gradient="danger"
                   modal-classes="modal-danger modal-dialog-centered">
                <h6 slot="header" class="modal-title" id="modal-title-notification">Criar novo Item de Cronograma</h6>

                <div class="py-3 text-center">
                    <h6 class="heading mt-4">Item</h6>
                    <base-input alternative
                            class="mb-3"
                            v-model="newCronograma.item"
                            addon-left-icon="ni ni-bold">
                    </base-input>
                    <h6 class="heading mt-4">Data Inicial</h6>
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="{allowInput: true}"
                                    class="form-control datepicker"
                                    v-model="newCronograma.data_inicio">
                        </flat-picker>
                    </base-input>
                    <h6 class="heading mt-4">Data Final</h6>
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="{allowInput: true}"
                                    class="form-control datepicker"
                                    v-model="newCronograma.data_fim">
                        </flat-picker>
                    </base-input>
                </div>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 class="ml-auto"
                                 @click="modals.item = false">
                        Close
                    </base-button>
                    <base-button type="white"
                                 @click="addCronograma()">
                        Ok, Got it
                    </base-button>
                </template>
            </modal>

            <modal :show.sync="modals.prize"
                   gradient="primary"
                   modal-classes="modal-primary modal-dialog-centered">
                <h6 slot="header" class="modal-title" id="modal-title-notification">Adicionar novo Prêmio</h6>

                <div class="py-3 text-center">
                    <h6 class="heading mt-4">Nome</h6>
                    <base-input alternative
                            class="mb-3"
                            v-model="newPremio.nome"
                            addon-left-icon="ni ni-bold">
                    </base-input>
                    <h6 class="heading mt-4">Ano</h6>
                    <base-input alternative
                            class="mb-3"
                            v-model="newPremio.ano"
                            addon-left-icon="ni ni-time-alarm">
                    </base-input>
                    <h6 class="heading mt-4">Descrição</h6>
                            <textarea class="form-control form-control-alternative" rows="3" alternative
                                        v-model="newPremio.descricao"
                                        addon-left-icon="ni ni-align-left-2">
                            </textarea>
                            <br>
                    <base-dropdown>
                        <base-button slot="title" type="secondary" class="dropdown-toggle">
                        {{areaSel}}
                        </base-button>
                        <div v-for="area in areas" :key="area.id_area">
                        <a class="dropdown-item" @click="(areaSel = area.descricao, newPremio.id_area = area.id_area)">{{area.descricao}}</a>
                        </div>
                    </base-dropdown>
                </div>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 class="ml-auto"
                                 @click="modals.item = false">
                        Close
                    </base-button>
                    <base-button type="white"
                                 @click="addPremio()">
                        Ok, Got it
                    </base-button>
                </template>
            </modal>
    </div>
</template>
<script>
import axios from 'axios';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import Modal from "@/components/Modal.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
export default {
  components: {
    Tabs,
    TabPane,
    flatPicker,
    Modal,
    BaseDropdown
  },

  data () {
      return {
        premios: [],
        modals: {
          prize: false,
          item: false
        },
        newCronograma: {
          data_inicio: '', 
          data_fim: '', 
          item: '', 
          id_premio: 0
        },
        newPremio: {},
        areas: [],
        areaSel: 'Área de atuação'
      }
  },

  mounted () {
    this.getAllPremios();
    this.getAreas();
  },

  methods: {
    async getAreas() {
      await axios.get(`http://localhost:7777/area`)
        .then(response => {
          this.areas = response.data
      });
    },

    async getAllPremios() {
      await axios.get(`http://localhost:7777/premio`)
        .then(response => {
          this.premios = response.data
      });
    },

    async addPremio() {
      await axios.post(`http://localhost:7777/premio`, {
        nome: this.newPremio.nome, 
        descricao: this.newPremio.descricao, 
        ano: this.newPremio.ano, 
        id_area: this.newPremio.id_area
      });

      this.getAllPremios();
      this.modals.prize = false;
    },

    async addCronograma() {
      await axios.post(`http://localhost:7777/cronograma`, {
        data_inicio: this.newCronograma.data_inicio, 
        data_fim: this.newCronograma.data_fim, 
        item: this.newCronograma.item, 
        id_premio: this.newCronograma.id_premio
      });
      this.getAllPremios();
      this.modals.item = false;
    },

    async delPremio(id) {
      await axios.delete(`http://localhost:7777/premio/${id}`);

      this.getAllPremios();
    },

    async delCronograma(id) {
      await axios.delete(`http://localhost:7777/cronograma/${id}`);

      this.getAllPremios();
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
  }
};
</script>
<style>
</style>
