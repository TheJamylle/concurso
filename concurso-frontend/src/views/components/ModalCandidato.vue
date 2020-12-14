<template>
    <div class="row">
        <div class="col-md-4">
            <base-button type="secondary" class="mt-4" @click="modals.modal = true">
                Novo Candidato
            </base-button>

            <modal :show.sync="modals.modal"
                   gradient="success"
                   modal-classes="modal-success modal-dialog-centered">
                <h5 slot="header" class="modal-title" id="modal-title-notification">Cadastrar novo Candidato</h5>

                <template>
                        <form role="form" >
                            <base-input alternative
                                            class="mb-3"
                                            placeholder="Nome"
                                            v-model="candidato.nome"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                            <div id="sel" v-for="projeto in projetos" :key="projeto.id_projeto">
                                <base-radio :value="projeto.id_projeto" :name="projeto.id_projeto" v-model="projeto.id_projeto" class="mb-3">
                                 {{ projeto.titulo }}
                                </base-radio>
                            </div>
                        </form>
                    </template>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 class="ml-auto"
                                 @click="modals.modal = false">
                        Cancelar
                    </base-button>
                    <base-button type="white" @click="newCandidato()">Salvar</base-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import axios from 'axios';

export default {
  el: "#sel",
  components: {
    Modal
  },
  data() {
    return {
      candidato: {
        nome: '',
        endereco: {},
        cpf: '',
        id_projeto: 0
      },
      projetos: [],
      modals: {
        modal: false,
      }
    };
  },

  mounted () {
    this.getProjetos();
  },

  methods: {
    async getProjetos() {
      await axios.get(`http://localhost:7777/projeto`)
        .then(response => {
          this.projetos = response.data
      });
    },

    async newCandidato() {
      await axios.post(`http://localhost:7777/pessoa/candidatos`, 
      { 
        titulo: this.projeto.titulo, 
        resumo: this.projeto.resumo, 
        data_envio: this.projeto.data_envio, 
        id_area: this.projeto.id_area 
      })
        .then();
        this.modals.modal = false;
    }
  }
};
</script>
<style>
</style>
