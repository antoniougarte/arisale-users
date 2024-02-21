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
      <v-dialog v-model="modalUser" width="360" persistent>
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
            <v-text-field
              v-model="state.email"
              label="Correo electrónico"
              outlined
              @input="v$?.email.$touch()"
              clearable
              dense
              :error="v$?.email?.$error"
              :error-messages="emailErrorMessage"
              class="input"
            ></v-text-field>
          </div>

          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancelverifyEmail">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="verifyEmail" >
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="modalDataUser" width="360" persistent>
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Ingresa los datos del nuevo usuario</p>
          </div>
          <div class="userCard__input">
            <!-- <v-text-field v-model="email" label="Correo electrónico" outlined clearable dense class="input"></v-text-field> -->
            <v-text-field v-model="userVerify.firstname" class="custom-input" outlined dense disabled clearable label="Nombre(s)" />
            <v-text-field v-model="userVerify.lastname" class="custom-input" outlined dense disabled clearable label="Apellidos" />
            <v-select v-model="state.selectedRole"
              @change="v$?.selectedRole.$touch()"
              :error="v$?.selectedRole?.$error"
              :error-messages="selectRoleErrorMessage" label="Rol" :items="roleOptions" item-text="name" item-value="id" outlined dense hide-details />

          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancelNewUser">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="createDataUser(userVerify)">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalNewUser" width="360" persistent>
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Ingresa los datos del nuevo usuario</p>
          </div>
          <div class="userCard__input">
            <!-- <v-text-field v-model="email" label="Correo electrónico" outlined clearable dense class="input"></v-text-field> -->
            <v-text-field v-model="state.newFirstName"
              @input="v$?.newFirstName.$touch()"
              :error="v$?.newFirstName?.$error"
              :error-messages="nameErrorMessage" class="custom-input" outlined dense clearable label="Nombre(s)" />
            <v-text-field v-model="state.newLastName"
              @input="v$?.newLastName.$touch()"
              :error="v$?.newLastName?.$error"
              :error-messages="lastnameErrorMessage" class="custom-input" outlined dense clearable label="Apellidos" />
            <v-select v-model="state.newRoleId"
              @change="v$?.newRoleId.$touch()"
              :error="v$?.newRoleId?.$error"
              :error-messages="roleErrorMessage" label="Rol" :items="roleOptions" item-text="name" item-value="id" outlined dense hide-details />

          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__cancel" @click="cancelNewUser">
              Cancelar
            </div>
            <div role="button" class="btn__confirm" @click="createNewUser">
              Continuar
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalExistUser" width="400">
        <v-card class="userCard">
          <div class="userCard__title">
            <p>¡Ups!</p>
          </div>
          <div class="userCard__input">
            <p>{{ messageUserExist }}</p>
          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__confirm" @click="confirmModalExist">
              Aceptar
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalUserCreated" width="400" persistent>
        <v-card class="userCard">
          <div class="userCard__title">
            <p>Se ha agregado un nuevo usuario a tu empresa!</p>
          </div>
          <div class="userCard__input">
            <p>{{ state.newFirstName }}, ahora puedes ingresar</p>
          </div>
          <div class="userCard__btn">
            <div role="button" class="btn__confirm" @click="confirmModalUserCreated">
              Aceptar
            </div>
          </div>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed } from '@nuxtjs/composition-api';
import axios from 'axios';
import { RoleEnum } from '~/utils/roles.ts';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

export default {
  setup(props, context) {

    const token = ref('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTEzOTQ1OCwiaWF0IjoxNzA4NTQ3NDU4LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.MWvwwFEDZ-3aNA7TnLnAS-UGJ-EmgUijXSm5cyaCfXA')

    const modalUser = ref(false);
    const modalDataUser = ref(false);
    const modalExistUser = ref(false);
    const modalNewUser = ref(false);
    const modalUserCreated = ref(false);
    const messageUserExist = ref('');
    const userVerify = ref([]);
    const roleOptions= ref(RoleEnum.toArray());

    const state = reactive({
      email: '',
      newFirstName: '',
      newLastName: '',
      newRoleId: '',
      selectedRole: '',
    });
    const rules = {
      email: {
        required: helpers.withMessage('el correo es requerido', required),
        email ,
      },
      newFirstName: { required: helpers.withMessage('el nombre es requerido', required), },
      newLastName: { required: helpers.withMessage('el apellido es requerido', required), },
      newRoleId: { required: helpers.withMessage('el rol es requerido', required), },
      selectedRole: { required: helpers.withMessage('el rol es requerido', required), },
    };

    const v$ = useVuelidate(rules, state);
    const emailErrorMessage = computed(()=>(v$.value.email?.$errors[0])?.$message);
    const nameErrorMessage = computed(()=>(v$.value.newFirstName?.$errors[0])?.$message);
    const lastnameErrorMessage = computed(()=>(v$.value.newLastName?.$errors[0])?.$message);
    const roleErrorMessage = computed(()=>(v$.value.newRoleId?.$errors[0])?.$message);
    const selectRoleErrorMessage = computed(()=>(v$.value.selectedRole?.$errors[0])?.$message);

    const cancelverifyEmail = () => {
      state.email = '';
      v$.value.$reset();
      modalUser.value = false;
    }
    const verifyEmail = async () => {
      v$.value.email.$touch();
      // console.log(v$.value.email.$touch());
      // console.log(v$.value.email.$error);
      try {
        if(v$.value.email.$error){
          return
        }
        const companyId = '684a0a3d9bd542bda81021f109ac3477'
        const appId = 'bafbbd946ade11ea98e20ee7c6890289';

        const response = await axios.get(`https://ad.dev.arisale.com.pe/user-service/api/users/validate-by-email/${state.email}`, {

          headers: {
            'accept': 'application/json',
            'x-company-id': companyId,
            'x-app-id': appId,
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTEzOTQ1OCwiaWF0IjoxNzA4NTQ3NDU4LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.MWvwwFEDZ-3aNA7TnLnAS-UGJ-EmgUijXSm5cyaCfXA',
          },
        });
        // const data = response.data;
        if (response.status === 200) {
          userVerify.value = response.data
          console.log(userVerify.value.firstname)
          modalUser.value = false;
          modalDataUser.value = true;
        };
        if (response.status === 204) {
          modalUser.value = false;
          modalNewUser.value = true;
        }
      } catch (error) {
        console.error('Error al verificar el email:', error);
        if (error.response.status === 409) {
          state.email = '';
          messageUserExist.value = error.response.data.message;
          modalUser.value = false;
          modalExistUser.value = true;
        }
      }
    };

    const cancel = () => {
      modalUser.value = false;
    };

    const updateTable = () => {
      context.emit('updateTable');
    };

    const confirmModalExist = () => {
      v$.value.$reset();
      messageUserExist.value = '';
      modalExistUser.value = false;
    };

    const createNewUser = async () => {
      v$.value.newFirstName.$touch();
      v$.value.newLastName.$touch();
      v$.value.newRoleId.$touch();
      try {
        if(v$.value.newFirstName.$error || v$.value.newLastName.$error ){
          return
        }

        const emailData = {
          firstname: state.newFirstName,
          lastname: state.newLastName,
          email: state.email,
          roleId: state.newRoleId,
          isOwner: true
        };

        const response = await axios.post('https://ad.dev.arisale.com.pe/user-service/api/users/new', emailData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
          }
        });

        if(response.status === 201){
          email.value='';
          modalNewUser.value = false;
          modalUserCreated.value = true;
        }
      } catch (error) {
        console.error('Error al verificar el email:', error);
      }
    };

    const createDataUser = async (userVerify) => {
      // console.log(state.email)
      // console.log(userVerify);
      v$.value.selectedRole.$touch();
      try {
        if(v$.value.selectedRole.$error){
          return
        }
        const emailData = {
          firstname: userVerify.firstname,
          lastname: userVerify.lastname,
          email: state.email,
          roleId: state.selectedRole,
          isOwner: true
        };

        const response = await axios.post('https://ad.dev.arisale.com.pe/user-service/api/users/new', emailData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
          }
        });

        if(response.status === 201){
          email.value='';
          modalDataUser.value = false;
          modalUserCreated.value = true;
        }
      } catch (error) {
        console.error('Error al verificar el email:', error);
      }
    };
    const cancelNewUser = () =>{
      state.newFirstName='';
      state.newLastName='';
      state.newRoleId=null;
      state.email='';
      modalNewUser.value=false;
      modalDataUser.value=false;
      v$.value.$reset();
    }
    const confirmModalUserCreated = () => {
      state.newFirstName='';
      state.newLastName ='';
      state.newRoleId ='';
      state.email ='';
      modalUserCreated.value = false;
    };
    return {      state,
      v$,emailErrorMessage, nameErrorMessage, lastnameErrorMessage, roleErrorMessage, selectRoleErrorMessage,
      modalUser, email, verifyEmail, cancel, updateTable, modalDataUser, userVerify, roleOptions, modalExistUser, messageUserExist,
      confirmModalExist, cancelverifyEmail, createNewUser, modalNewUser, modalUserCreated, confirmModalUserCreated, createDataUser,
      cancelNewUser, token,
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
.userCard__input{
  text-align: center;
  font-size: 14px;
  margin-bottom: 24px;
}
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
