<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
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
                        <h1 class="display-3  text-white">Avaliadores
                            <span>que participarão da banca de avaliação do concurso</span>
                        </h1>
                    </div>
                </div>
            </div>
            
        </div>
        </section>
        <section class="section section-skew">
            <div class="container" id="av">
                <card shadow class="card-profile mt--300" no-body v-for="avaliador in avaliadores" :key="avaliador.id_avaliador">
                    <div class="px-4">
                        <div class="text-center mt-5">
                            <h3>{{ avaliador.nome }}</h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Registro: {{ avaliador.registro }}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Data de Nascimento: {{ avaliador.data_nascimento }}</div>
                        </div>
                        <br>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'avaliador',
  el: '#av',

  data () {
    return {
      avaliadores: []
    }
  },

  mounted () {
    this.getAllAvaliadores();
  },

  methods: {
    async getAllAvaliadores () {
      await axios.get(`http://localhost:7777/pessoa/avaliadores`).then(response => {
        this.avaliadores = response.data;
      });
    }
  }
};
</script>
<style>
</style>
