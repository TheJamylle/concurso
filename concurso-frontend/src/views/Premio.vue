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
                <div class="row">
                    <div class="col-lg-6">
                        <h1 class="display-3  text-white">Prêmios
                            <span>ofertados no concurso</span>
                        </h1>
                    </div>
                </div>
            </div>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <div id="prizes" v-for="premio in premios" :key="premio.id_premio">
                    <tabs fill class="flex-column flex-md-row">
                    <card shadow slot-scope="{activeTabIndex}">
                        <tab-pane key="tab1">
                            <template slot="title">
                                {{ premio.nome }}
                            </template>

                            <p class="description">{{ premio.descricao }}</p><br><br>
                            <p class="description">Ano: {{ premio.ano }}</p>
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
                                <base-button @click="modals.item = true"
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
    </div>
</template>
<script>
import axios from 'axios';
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
export default {
  components: {
    Tabs,
    TabPane
  },

  data () {
      return {
        premios: [],
        modals: {
          prize: false,
          item: false
        }
      }
  },

  mounted () {
    this.getAllPremios();
  },

  methods: {
    async getAllPremios() {
      await axios.get(`http://localhost:7777/premio`)
        .then(response => {
          this.premios = response.data
      });
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
