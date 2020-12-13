<template>
    <div>
        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default shape-skew">
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
                                <h1 class="display-3  text-white">Áreas de atuação
                                    <span>para projetos e prêmios</span>
                                </h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="section section-lg pt-lg-0 mt--200">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid" id="cards">
                            <div class="col-lg-4" v-for="area in areas" :key="area.id_area">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <h6 class="text-primary text-uppercase">{{ area.descricao }}</h6>
                                    
                                    <p class="description mt-3">Áreas de atuação do concurso, destinadas a projetos e prêmios cadastrados no sistema.</p>
                                    <div>
                                        <badge type="primary" rounded>projetos</badge>
                                        <badge type="primary" rounded>prêmios</badge>
                                    </div> 
                                    <br>
                                <base-button @click="delArea(area.id_area)" type="danger" style="float: right;">
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
            <div class="shape shape-style-3 bg-gradient-default shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container pt-lg pb-300">
                <div class="row text-center justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="display-3 text-white">Inserir nova Área</h2>
                        <p class="lead text-white">No formulário abaixo informe a nova área de projetos que deseja incluir no sistema</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg pt-lg-0 section-contact-us">
            <div class="container">
                <div class="row justify-content-center mt--300">
                    <div class="col-lg-8">
                        <card gradient="secondary" shadow body-classes="p-lg-5" v-if="!submitted">
                            <h4 class="mb-1">Nova Área de Atuação</h4>
                            <base-input class="mt-5"
                                        alternative
                                        id="descricao"
                                        v-model="descricao"
                                        name="descricao"
                                        placeholder="Nome da área"
                                        addon-left-icon="ni ni-user-run">
                                
                            </base-input>
                            <base-button type="default" round block size="lg" @click="newArea">
                                Cadastrar
                            </base-button>
                        </card>
                        <card v-else>
                            <h4 class="mb-1">Área cadastrada com sucesso!</h4>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Card from '../components/Card.vue';

export default {
  name: "area",
  el: '#cards',
  data () {
    return {
       submitted: false,
       areas: [],
       descricao: '',
    }
  },

  mounted() {
    this.getAreas();
  },

  methods: {
      newArea() {
        axios.post(`http://localhost:7777/area`, { descricao: descricao._value } )
        .then(response => {
        this.areas.push(response.data)
        });

        this.submitted = true;
        this.getAreas();
      },

      getAreas() {
        axios.get(`http://localhost:7777/area`)
        .then(response => {
          this.areas = response.data
        });
      },

      async delArea(id) {
        await axios.delete(`http://localhost:7777/area/${id}`).then();

        this.getAreas();
      },
  },
  components: {
      Card,
  }
};
</script>
