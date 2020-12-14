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
                                    <h5 class="title text-primary">{{ projeto.titulo }}</h5>
                                    <p>{{ projeto.resumo }}</p>
                                </div>
                                   
                            </div>
                            <div v-for="autor in projeto.autores" :key="autor.numero_inscricao">
                                <badge type="primary" rounded>{{ autor.nome }} - {{ autor.numero_inscricao }}</badge>
                            </div>
                            <base-button @click="delProjeto(projeto.id_projeto)" title="Excluir projeto" type="danger" style="float: right;">
                                        X
                            </base-button>
                        </card>
                    </div>
                </div>
            </div>
            <br>
            <modal-projeto></modal-projeto>
    </section>
</template>
<script>
import axios from 'axios';
import ModalProjeto from './components/ModalProjeto.vue';

export default {
  components: { ModalProjeto },
  name: "projeto",
  el: '#pros',

  data () {
    return {
       submitted: false,
       projetos: [],
    }
  },

  mounted () {
    this.getAllProjetos();
  },

  methods: {
    getAllProjetos() {
      axios.get(`http://localhost:7777/projeto`)
        .then(response => {
          this.projetos = response.data
        });
    },

    async delProjeto(id) {
        console.log(id);
      await axios.delete(`http://localhost:7777/projeto/${id}`).then();
      this.getAllProjetos();
    },
  }
};
</script>
<style>
</style>
