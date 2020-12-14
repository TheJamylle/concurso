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
                        
                        <base-button @click="delCandidato(cand.id_candidato)" title="Excluir candidato" type="danger" >
                            X
                        </base-button>
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
import ModalCandidato from './components/ModalCandidato.vue';

export default {
  components: { ModalCandidato },
  name: "candidato",
  el: '#cans',

  data () {
    return {
       submitted: false,
       candidatos: []
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

    async delCandidato(id) {
      await axios.delete(`http://localhost:7777/candidato/${id}`).then();
      this.getAllCandidatos();
    }
  }
};
</script>
<style>
</style>
