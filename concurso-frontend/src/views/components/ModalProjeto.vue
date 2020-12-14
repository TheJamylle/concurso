<template>
    <div class="row">
        <div class="col-md-4">
            <base-button type="primary" class="mt-4" @click="modals.modal = true" style="float: right;">
                Inscrever Novo Projeto
            </base-button>

            <modal :show.sync="modals.modal"
                   gradient="primary"
                   modal-classes="modal-primary modal-dialog-centered">
                <h5 slot="header" class="modal-title" id="modal-title-notification">Cadastrar novo Projeto</h5>

                <template>
                        <form role="form" >
                            <base-input alternative
                                        class="mb-3"
                                        placeholder="Título"
                                        v-model="projeto.titulo"
                                        addon-left-icon="ni ni-bold">
                            </base-input>
                            <textarea class="form-control form-control-alternative" rows="3" alternative
                                        placeholder="Resumo"
                                        v-model="projeto.resumo"
                                        addon-left-icon="ni ni-collection">
                            </textarea>
                            <div id="sel" v-for="area in areas" :key="area.id_area">
                                <base-radio :value="area.id_area" :name="area.id_area" v-model="projeto.id_area" class="mb-3">
                                 {{ area.descricao }}
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
                    <base-button type="white" @click="newProjeto()">Salvar</base-button>
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
      projeto: {
        titulo: '',
        data_envio: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        resumo: '',
        id_area: 0
      },
      areas: [],
      modals: {
        modal: false,
      }
    };
  },

  mounted () {
    this.getAreas();
  },

  methods: {
    async getAreas() {
      await axios.get(`http://localhost:7777/area`)
        .then(response => {
          this.areas = response.data
      });
    },

    async newProjeto() {
      await axios.post(`http://localhost:7777/projeto`, 
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
