<template>
  <v-dialog v-model="dialog" width="500">
    <v-card class="userCard">
      testetstsets
      <div class="userCard__title">
        <p>Ingresa el correo del nuevo usuario: {{ user.firstname }} {{ user.lastname }}</p>
      </div>
      <div class="userCard__main">
        <v-text-field v-model="email" label="Correo electrónico" outlined clearable></v-text-field>
      </div>
      <div class="userCard__btn">
        <div role="button" class="main-button" >
          Cancelar
        </div>
        <div role="button" class="main-button" >
          Continuar
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup() {
    const test = ref('test');
    const dialog = ref(false)
    const email = ref('')

    return {
      test, dialog, email
    };
  }
}
</script>

<style lang="scss" scoped>
</style>
