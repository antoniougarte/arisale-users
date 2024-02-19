<template>
  <div class='actions'>
    <div class="actions__buttons">
      <svg class="main_icon"><use href="@/assets/icons.svg#ic_menu" /></svg>
      <span>Atrás</span>
    </div>
    <div class="actions__buttons">
      <div>
        <svg class="main_icon"><use href="@/assets/icons.svg#ic_lupa" /></svg>
      </div>
      <div>
        <svg class="main_icon"><use href="@/assets/icons.svg#ic_repeat" /></svg>
      </div>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div role="button" class="main-button" v-bind="attrs" v-on="on">
            Nuevo usuario
          </div>
        </template>
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Ingresa el correo del nuevo usuario</p>
          </div>
          <div class="userCard__main">
            <v-text-field v-model="email" label="Correo electrónico" outlined clearable></v-text-field>
          </div>
          <div class="userCard__btn">
            <div role="button" class="main-button" @click="cancel">
              Cancelar
            </div>
            <div role="button" class="main-button" @click="verifyEmail">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dialog = ref(false);
const email = ref('');

const verifyEmail = () => {
  console.log(email.value);
};

const cancel = () => {
  dialog.value = false;
};

onMounted(() => {
  console.log('test');
});
</script>

<style lang="scss" scoped>
.actions{
  display: flex;
  justify-content: space-between;
}
.actions__buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.main-button{
  display: flex;
  justify-items: center;
  align-items: center;
  height: 48px;
  border-radius: 25px;
  background-color: #163005;
  color: #fdfcfb;
  padding: 0 1.5rem;
}
.userCard__title{
  text-align: center;
}
.userCard{
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 2rem;
  border-radius: 20px;
}
.userCard__btn{
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.main_icon {
  width: 24px;
  height: 24px;
  fill: white;
  background-color: #163005;
  border-radius: 8px;
}
</style>
