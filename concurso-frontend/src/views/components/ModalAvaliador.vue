<template>
    <div class="row">
        <div class="col-md-4">
            <base-button rounded @click="modals.modal = true"
              title="Registrar Novo Avaliador"
              style="float: right; height: 61px; font-size: 24px; margin: 30px; background: #724EBD; border: none">
                <i class="ni ni-fat-add"></i>
            </base-button>

            <modal :show.sync="modals.modal"
                   gradient="default"
                   modal-classes="modal-default modal-dialog-centered">
                <h5 slot="header" class="modal-title" id="modal-title-notification">Cadastrar novo Avaliador</h5>

                <template>
                        <form role="form" >
                            <base-input alternative
                                            class="mb-3"
                                            placeholder="Nome"
                                            v-model="avaliador.nome"
                                            addon-left-icon="ni ni-ruler-pencil">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="CPF"
                                            v-model="avaliador.cpf"
                                            addon-left-icon="ni ni-circle-08">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.data_nascimento"
                                            placeholder="Data de Nascimento MM/DD/YYYY"
                                            addon-left-icon="ni ni-calendar-grid-58">
                                </base-input>
                                <h7 slot="header" class="modal-title" style="display: block;"><b>Telefone</b></h7>
                                <br>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.telefone.ddd"
                                            placeholder="DDD" style="width: 20%; float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.telefone.numero"
                                            placeholder="Número" style="width: 70%; float: right">
                                </base-input>
                                
                                <h7 slot="header" class="modal-title" style="display: block;"><b>Endereço</b></h7>
                                <br>
                                <base-input alternative
                                            v-model="avaliador.endereco.logradouro"
                                            class="mb-3"
                                            placeholder="Logradouro" style="width: 70%; float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.endereco.numero"
                                            placeholder="Número" style="width: 25%;float: right">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.endereco.bairro"
                                            placeholder="Bairro">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.endereco.quadra"
                                            placeholder="Quadra" style="width: 25%;float: left">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.endereco.cidade"
                                            placeholder="Cidade" style="width: 55%; float: left; margin-left: 5%">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            v-model="avaliador.endereco.uf"
                                            placeholder="UF" style="width: 10%; float: right">
                                </base-input>
                        </form>
                    </template>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 class="ml-auto"
                                 @click="modals.modal = false">
                        Cancelar
                    </base-button>
                    <base-button type="white" @click="newAvaliador()">Salvar</base-button>
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
    Modal,
  },
  props: {
    avaliadorUpdate: {
      type: Object
    }
  },

  data() {
    return {
      telefoneTipos: ['Pessoal', 'Residencial', 'Comercial'],
      avaliador: {
        nome: '',
        cpf: '',
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
        registro: Math.floor(Math.random()*(999999-100001)+100000),
      },
      modals: {
        modal: false,
      }
    };
  },

  watch: {
    updateAvaliador () {
      this.avaliador = this.avaliadorUpdate;
    }
  },

  mounted () {

  },

  methods: {

    async newAvaliador() {
      console.log(this.avaliador)
      await axios.post(`http://localhost:7777/pessoa/avaliadores`, 
      { 
        nome: this.avaliador.nome, 
        cpf: this.avaliador.cpf,
        endereco: this.avaliador.endereco,
        telefone: this.avaliador.telefone,
        data_nascimento: new Date(this.avaliador.data_nascimento),
        registro: this.avaliador.registro
      })
        .then();
      this.modals.modal = false;
    }
  }
};
</script>
<style>
</style>
