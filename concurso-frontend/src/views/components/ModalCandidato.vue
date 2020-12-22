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
                                            placeholder="CPF"
                                            v-model="candidato.cpf"
                                            addon-left-icon="ni ni-circle-08">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.data_nascimento"
                                            placeholder="Data de Nascimento MM/DD/YYYY"
                                            addon-left-icon="ni ni-calendar-grid-58">
                                </base-input>
                                <h7 slot="header" class="modal-title" style="display: block;"><b>Telefone</b></h7>
                                <br>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.telefone.ddd"
                                            placeholder="DDD" style="width: 20%; float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.telefone.numero"
                                            placeholder="Número" style="width: 70%; float: right">
                                </base-input>
                                
                                <h7 slot="header" class="modal-title" style="display: block;"><b>Endereço</b></h7>
                                <br>
                                <base-input alternative
                                            v-model="candidato.endereco.logradouro"
                                            class="mb-3"
                                            placeholder="Logradouro" style="width: 70%; float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.endereco.numero"
                                            placeholder="Número" style="width: 25%;float: right">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.endereco.bairro"
                                            placeholder="Bairro">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.endereco.quadra"
                                            placeholder="Quadra" style="width: 25%;float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.endereco.cidade"
                                            placeholder="Cidade" style="width: 55%; float: left; margin-left: 5%">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="candidato.endereco.uf"
                                            placeholder="UF" style="width: 10%; float: right">
                                </base-input>
                                <h7 slot="header" class="modal-title" style="display: block;"><b>Projeto</b></h7>
                                <br>
                            <div id="sel" v-for="projeto in projetos" :key="projeto.id_projeto">
                                <base-radio :value="projeto.id_projeto" 
                                            :name="projeto.id_projeto" 
                                            v-model="candidato.id_projeto" 
                                            class="ms-3"
                                            style="float: left; margin: 2%"
                                            >
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
  props: {
    candidatoUpdate: {
      type: Object
    }
  },

  data() {
    return {
      telefoneTipos: ['Pessoal', 'Residencial', 'Comercial'],
      candidato: {
        nome: '',
        cpf: '',
        id_projeto: 0, 
        data_nascimento: '', 
        endereco: {
          logradouro: '',
          numero: '',
          quadra: '',
          bairro: '',
          cidade: '',
          uf: '',
        }, 
        telefone: {
          tipo: 'pessoal',
          ddd: '',
          numero: '',
        },
        numero_inscricao: Math.floor(Math.random()*(9999-1001)+1000),
      },
      projetos: [],
      modals: {
        modal: false,
      }
    };
  },

  watch: {
    updateCandidato () {
      this.candidato = this.candidatoUpdate;
    }
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
        nome: this.candidato.nome, 
        cpf: this.candidato.cpf,
        endereco: this.candidato.endereco,
        telefone: this.candidato.telefone,
        data_nascimento: new Date(this.candidato.data_nascimento), 
        id_projeto: this.candidato.id_projeto,
        numero_inscricao: this.candidato.numero_inscricao
      })
        .then();
        this.modals.modal = false;
    }
  }
};
</script>
<style>
</style>
