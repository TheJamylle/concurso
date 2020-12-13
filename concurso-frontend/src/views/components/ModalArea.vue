<template>
    <div class="row">
        <div class="col-md-4">
            <base-button type="primary" class="mb-3" @click="modals.modal = true" style="float: left;">
              🖊
            </base-button>

            <modal :show.sync="modals.modal"
                   gradient="primary"
                   style="clear: both;"
                   body-classes="p-0"
                   modal-classes="modal-dialog-centered modal-sm">
                <card type="secondary" shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0">
                    <template>
                        <div class="text-center text-muted mb-4">
                            <small>Informe a nova descrição dessa Área</small>
                        </div>
                        <form role="form">
                            <base-input alternative
                                        class="mb-3"
                                        placeholder="Nova Descrição"
                                        id="descricao"
                                        name="descricao"
                                        addon-left-icon="ni ni-email-83">
                            </base-input>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="updateArea(area.id_area, descricao)">Salvar</base-button>
                            </div>
                        </form>
                    </template>
                </card>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        modal: false
      },
      descricao: ''
    };
  },
  methods: {
    async updateArea(id, descricao) {
      await axios.put(`http://localhost:7777/area/${id}`, { descricao: descricao._value })
        .then();
      
      modals.modal = true;
    }
  }
};
</script>
<style>
</style>
