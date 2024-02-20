<template>
  <div class='actions'>
    <div class="actions__buttons">
      <div class="spriteContainer__back">
        <svg class="sprite"><use href="@/assets/icons.svg#ic_left_arrow" /></svg>
      </div>
      <span><strong>Atrás</strong></span>
    </div>
    <div class="actions__buttons">
      <div class="spriteContainer">
        <svg class="sprite"><use href="@/assets/icons.svg#ic_lupa" /></svg>
      </div>
      <div class="spriteContainer" @click="updateTable">
        <svg class="sprite"><use href="@/assets/icons.svg#ic_repeat" /></svg>
      </div>
      <v-dialog v-model="modalUser" width="360">
        <template v-slot:activator="{ on, attrs }">
          <div role="button" class="main-button" v-bind="attrs" v-on="on">
            Nuevo usuario
          </div>
        </template>
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Ingresa el correo del nuevo usuario</p>
          </div>
          <div class="userCard__input">
            <v-text-field v-model="email" label="Correo electrónico" outlined clearable dense class="input"></v-text-field>
          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancel">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="verifyEmail">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="modalDataUser" width="360">
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Ingresa los datos del nuevo usuario</p>
          </div>
          <div class="userCard__input">
            <!-- <v-text-field v-model="email" label="Correo electrónico" outlined clearable dense class="input"></v-text-field> -->
            <v-text-field v-model="userVerify.firstname" class="custom-input" outlined dense disabled clearable label="Nombre(s)" />
            <v-text-field v-model="userVerify.lastname" class="custom-input" outlined dense disabled clearable label="Apellidos" />
            <v-select v-model="selectedRole" label="Rol" :items="roleOptions" item-text="name" item-value="id" outlined dense hide-details />

          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancel">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="verifyEmail">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalExistUser" width="360">
        <v-card class="userCard">
          <div class="userCard__title">
            <p>¡Ups!</p>
          </div>
          <div class="userCard__input">
            <!-- <v-text-field v-model="email" label="Correo electrónico" outlined clearable dense class="input"></v-text-field> -->
            <v-text-field v-model="userVerify.firstname" class="custom-input" outlined dense disabled clearable label="Nombre(s)" />
            <v-text-field v-model="userVerify.lastname" class="custom-input" outlined dense disabled clearable label="Apellidos" />
            <v-select v-model="selectedRole" label="Rol" :items="roleOptions" item-text="name" item-value="id" outlined dense hide-details />

          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancel">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="verifyEmail">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { RoleEnum } from '~/utils/roles.ts';

export default {
  setup() {
    const modalUser = ref(false);
    const modalDataUser = ref(false);
    const modalExistUser = ref(false);
    const userVerify = ref([]);
    const selectedRole = ref(false);
    const roleOptions= ref(RoleEnum.toArray());
    const email = ref('');

  const verifyEmail = async () => {
    try {
      const companyId = '98b43c9172d84980abd7e46a672d5e32'
      const appId = 'bafbbd946ade11ea98e20ee7c6890289';

      const response = await axios.get(`https://ad.dev.arisale.com.pe/user-service/api/users/validate-by-email/${email.value}`, {

        headers: {
          'accept': 'application/json',
          'x-company-id': companyId,
          'x-app-id': appId,
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTA1NzE0NywiaWF0IjoxNzA4NDY1MTQ3LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.zXuDKGnUxWPleZ05_IzQTc8mnwFmGJqM1jaAJX_VpXY',
        },
      });
      // const data = response.data;
      if (response.status === 200) {
        userVerify.value = response.data
        console.log(userVerify.value.firstname)
        modalUser.value = false;
        modalDataUser.value = true;
      }
      console.log(response);
    } catch (error) {
      console.error('Error al verificar el email:', error);
      if (error.response.status === 409) {
        modalUser.value = false;
        modalExistUser.value = true;
      }
    }
  };

    const cancel = () => {
      modalUser.value = false;
    };

    const updateTable = () => {
      this.$emit('updateTable');
    };

    return {
      modalUser, email, verifyEmail, cancel, updateTable, modalDataUser, userVerify, selectedRole, roleOptions, modalExistUser
    };
  }
}
</script>

<style lang="scss" scoped>
.actions{
  display: flex;
  justify-content: space-between;
}
.actions__buttons{
  color: #163005;
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
.spriteContainer__back {
  display: flex;
}
.spriteContainer {
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  .sprite{
    fill: #5c5b5a;
  }
}
.userCard{
  display: flex;
  color: #5c5b5a;
  flex-direction: column;
  padding: 2.5rem;
  border-radius: 20px;
}
.userCard__title{
  text-align: center;
  p{
    font-size: 20px;
    font-weight: bolder;
    line-height: 1.2;
  }
}
// .userCard__input{
//   font-size: 12px;
//   .input{
//     fieldset{

//     background-color: gray !important;
//     }
//   }
// }
.userCard__btn{
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn__cancel {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  color: #5c5b5a;
  border: solid 1px #5c5b5a;
  border-radius: 24px;
}
.btn__confirm {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  color: white;
  background-color: #163005;
  border-radius: 24px;
}
</style>
