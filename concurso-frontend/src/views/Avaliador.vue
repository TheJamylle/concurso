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
        <section class="section section-skew" style="margin-top: -15%;">
          <div class="container">
            <div class="col col-grid align-items-center" id="av">
                <card shadow class="shadow-lg--hover mt-5" no-body v-for="avaliador in avaliadores" :key="avaliador.id_avaliador">
                    <div class="px-4">
                      <button
                        @click="infoAvaliador(avaliador.registro)"
                        title="Visualizar e Editar dados do Avaliador"
                        style="float: right; font-size: 13px;background: transparent; border: none; color: #000; width: 10px; height: 20px; margin: 20px">
                          <i class="ni ni-settings"></i>
                      </button>
                      <button
                        title="Remover Avaliador"
                        style="font-size: 25px;background: transparent; border: none; color: #000; float: right;height: 5px; margin-top: 130px; margin-right: -50px"
                        @click="delAvaliador(avaliador.registro)">
                          <i class="ni ni-fat-remove"></i>
                      </button>
                      <modal :show.sync="modal"
                            gradient="secondary"
                            modal-classes="modal-secondary modal-dialog-centered">
                            <h5 slot="header" style="color: #724EBD" class="modal-title" id="modal-title-notification">Informações do Avaliador</h5>

                            <template>
                                    <form role="form" >
                                        <h6 style="color: #724EBD"> <b>Nome</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="avaliadorEscolhido.nome"
                                            >
                                        </base-input>
                                        <h6 style="color: #724EBD"> <b>CPF</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="avaliadorEscolhido.cpf"
                                            >
                                        </base-input>
                                        <h6 style="color: #724EBD"> <b>Data de Nascimento</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="avaliadorEscolhido.data_nascimento"
                                            >
                                        </base-input>
                                        <h6 style="color: #724EBD"><b>Endereço</b></h6>
                                        <base-input alternative
                                                    v-model="avaliadorEscolhido.endereco.logradouro"
                                                    class="mb-3"
                                                    style="width: 70%; float: left">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.endereco.numero"
                                                    style="width: 25%;float: right">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.endereco.bairro"
                                                    >
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.endereco.quadra"
                                                    style="width: 25%;float: left">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.endereco.cidade"
                                                    style="width: 55%; float: left; margin-left: 5%">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.endereco.uf"
                                                    style="width: 10%; float: right">
                                        </base-input>
                                        <!-- <h6 style="color: #724EBD"> <b>Telefone</b> </h6>
                                        <base-input alternative
                                            class="mb-3"
                                            v-model="avaliadorEscolhido.telefone.ddd"
                                            style="width: 20%; float: left">
                                        </base-input>
                                        <base-input alternative
                                                    class="mb-3"
                                                    v-model="avaliadorEscolhido.telefone.numero"
                                            style="width: 70%; float: right">
                                        </base-input> -->
                                    </form>
                                </template>

                            <template slot="footer">
                                <base-button type="white" class="ml-auto"
                                            @click="update(avaliadorEscolhido.registro)">OK</base-button>
                            </template>
                        </modal>
                        <div class="text-center mt-5">
                            <h3>{{ avaliador.nome }}</h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Registro: {{ avaliador.registro }}</div>
                            <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Data de Nascimento: {{ estilizaData(avaliador.data_nascimento) }}</div>
                        </div>
                        <br>
                    </div>
                </card>
            </div>
          </div>
          <modal-avaliador></modal-avaliador>
        </section>
        
    </div>
</template>
<script>
import axios from 'axios';
import ModalAvaliador from './components/ModalAvaliador.vue';
import BaseButton from '../components/BaseButton.vue';
import Modal from "@/components/Modal.vue";

export default {
  components: { ModalAvaliador, BaseButton, Modal },
  name: 'avaliador',
  el: '#av',

  data () {
    return {
      avaliadores: [],
      flagNew: false,
      modal: false,
      avaliadorEscolhido: {
        endereco: {}
      }
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
    },

    infoAvaliador(insc) {
      for(let i = 0; i < this.avaliadores.length; i++) {
        if(this.avaliadores[i].registro == insc) {
          this.avaliadorEscolhido = this.avaliadores[i];
          break;
        }
      }
      this.avaliadorEscolhido.endereco = JSON.parse(this.avaliadorEscolhido.endereco);
      this.avaliadorEscolhido.data_nascimento = this.estilizaData(this.avaliadorEscolhido.data_nascimento);
      this.modal = true;
      console.log(this.avaliadorEscolhido.endereco);
    },

    async delAvaliador(registro) {
      await axios.delete(`http://localhost:7777/pessoa/avaliadores/${registro}`).then();

      this.getAllAvaliadores();
    },

    async update(insc) {
      await axios.put(`http://localhost:7777/pessoa/avaliadores/${insc}`, {
        nome: this.avaliadorEscolhido.nome, 
        cpf: this.avaliadorEscolhido.cpf,
        data_nascimento: this.avaliadorEscolhido.data_nascimento, 
        endereco: this.avaliadorEscolhido.endereco
      });
      this.modal = false;

      this.getAllAvaliadores();
    },

    estilizaData (data) {
      const dataRenderizada = (
             (new Date(data).getDate()+1) > 9 ? (new Date(data).getDate()+1) : ("0"+(new Date(data).getDate()+1))
            )+"/"+
            (
             (new Date(data).getMonth()+1) > 9 ? (new Date(data).getMonth()+1) : ("0"+(new Date(data).getMonth()+1))
            )+"/"+new Date(data).getFullYear();
      return dataRenderizada;
    }
  }
};
</script>
<style>
</style>
