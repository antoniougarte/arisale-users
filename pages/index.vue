<template>
  <div>
    <ActionsComponent
      @updateTable="updateTable"
    />
    <div class="main">
      <table class="custom-table">
        <!-- Encabezados de la tabla -->
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
            <th class="txt-actions">Acciones</th>
          </tr>
        </thead>
        <!-- Cuerpo de la tabla -->
        <tbody>
          <tr v-for="item in items" :key="item.series">
            <!-- Contenido de cada fila -->
            <td>
              <span class="initials" :style="{ 'background-color': item.color || 'transparent' }">
                {{ item.initials }}
              </span>
            </td>
            <td>{{ item.firstname }} {{ item.lastname }}</td>
            <td>{{ item.role.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.cellphone }}</td>
            <td>{{ item.documentIdentityType }}</td>
            <td>{{ item.documentNumber }}</td>
            <td>{{ item.status }}</td>
            <!-- Botones de acciones -->
            <td class="buttons-table">
              <div role="button" @click="openModal(item)">
                <svg class="sprite"><use href="@/assets/icons.svg#ic_edit" /></svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
        <div class="table__footer">
          <div class="table__footer__items table__footer__first">
            <span>Mostrar</span>
            <select v-model="itemsPerPage" @change="updateTable" class="table__footer__select select-table">
              <option v-for="option in footerProps.itemsPerPageOptions" :key="option" :value="option">{{ option }}</option>
            </select>
            <span>registros por página</span>
          </div>

          <div class="table__footer__items">
            <svg @click="prevPage()" class="sprite" ><use href="@/assets/icons.svg#ic_chevron_left" /></svg>
            <span>{{ currentPage }}</span>
            <svg @click="nextPage()" class="sprite"><use href="@/assets/icons.svg#ic_chevron_right" /></svg>
          </div>

          <div class="table__footer__items">
            <span>Ir a la página</span>
            <select v-model="currentPage" @change="updateTable" class="table__footer__select select-table">
              <option
                v-for="page in totalPages"
                :key="page"
                :value="page"
              >
                {{ page }}
              </option>
            </select>
          </div>
        </div>
    </div>
    <!-- Modal -->
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card class="userCard">
        <div class="userCard__title">
          <p>Editar usuario</p>
        </div>
        <div class="userCard__main">
          <span class="logoUser" :style="{ 'background-color': userName.color || 'transparent' }">
            <p>{{ userName.initials }}</p>
          </span>
          <div class="userCard__inputs">
            <v-text-field v-model="userName.firstname" class="custom-input" outlined dense disabled clearable label="Nombre(s)" />
            <v-text-field v-model="userName.lastname" class="custom-input" outlined dense disabled clearable label="Apellidos" />
            <v-select v-model="selectedRole" label="Rol" :items="roleOptions" item-text="name" item-value="id" outlined dense hide-details />
            <v-switch v-model="activeUser" inset :label="`Usuario inactivo`"
            ></v-switch>
          </div>
        </div>
        <div class="userCard__btn">
          <div role="button" class="btn__card btn__cardCancel" @click="dialog = false">
            Cancelar
          </div>
          <div role="button" class=" btn__card btn__cardConfirm" @click="editUser(userName)">
            Actualizar
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ActionsComponent from '~/components/ActionsComponent.vue';
import { headers } from '~/utils/headersUtils.js';
import { RoleEnum } from '~/utils/roles.ts';


export default {
  components: { ActionsComponent },
  async asyncData({ $axios }) {
    try {
      const pageNumber = 1;
      const pageSize = 10;
      const includeCurrentUser = false;
      const excludeInactiveUsers = false;

      const response = await $axios.get('https://ad.dev.arisale.com.pe/user-service/api/users', {
        params: {
          pageSize,
          pageNumber,
          includeCurrentUser,
          excludeInactiveUsers,
        },
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTA1NzE0NywiaWF0IjoxNzA4NDY1MTQ3LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.zXuDKGnUxWPleZ05_IzQTc8mnwFmGJqM1jaAJX_VpXY',
        },
      });

      const items = response.data.items;
      const totalItems = response.data.totalItems

      // console.log(response.data);
      return { items, totalItems };
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return { items: [] };
    }
  },

  props: {
    initialUserName: String,
  },
  data() {
    return {

      selectedRole: null,
      roleOptions: RoleEnum.toArray(),
      activeUser: false,

      userName: '',
      email:'',
      itemsPerPage: 10,
      currentPage: 1,
      items: [],
      totalItems: null,
      headers: headers,
      footerProps: {
        itemsPerPageOptions: [10, 20, 30],
      },
      dialog: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    openModal(item) {
      this.selectedRole = item.role.id;
      this.userName = item;
      this.activeUser = item.status==='Inactivo'?true:false;
      this.dialog = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateTable()
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
        this.currentPage++;
        this.updateTable()
      }
    },
    async updateTable() {
      try {
        const pageNumber = this.currentPage;
        const pageSize = this.itemsPerPage;
        const includeCurrentUser = false;
        const excludeInactiveUsers = false;

        const response = await this.$axios.get('https://ad.dev.arisale.com.pe/user-service/api/users', {
          params: {
            pageSize,
            pageNumber,
            includeCurrentUser,
            excludeInactiveUsers,
          },
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTA1NzE0NywiaWF0IjoxNzA4NDY1MTQ3LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.zXuDKGnUxWPleZ05_IzQTc8mnwFmGJqM1jaAJX_VpXY',
          },
        });

        this.items = response.data.items;
        this.totalItems = response.data.totalItems;

        // console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        this.items = [];
      }
    },
    async editUser(user) {
      try {
        const userId = user.id;
        const editDto = {
          roleId: this.selectedRole,
          isActive: this.activeUser?false:true,
        };

        const response = await this.$axios.put(`https://ad.dev.arisale.com.pe/user-service/api/users/edit/${userId}`, editDto, {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMTA1NzE0NywiaWF0IjoxNzA4NDY1MTQ3LCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.zXuDKGnUxWPleZ05_IzQTc8mnwFmGJqM1jaAJX_VpXY',
            'Content-Type': 'application/json',
          },
        });
        // console.log(response);
        this.dialog = false;
        this.updateTable();
      } catch (error) {
        console.error('Error al editar el usuario:', error);
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.main {
  margin: 10px 0;
  background-color: white;
  border-radius: 10px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  color: #5c5b5a;
  font-size: 14px;

  th,
  td {
    border-top: 1px solid #e2e1e0;
    border-bottom: 1px solid #e2e1e0;
    padding: 8px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
}
.pagination-text,
.pagination-controls {
  text-align: center;
  font-size: 14px;
}

.pagination-controls {
  margin-top: 8px;
  button {
    background-color: #4caf50;
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
}

.buttons-table {
  display: flex;
  justify-content: center;
  text-align: center;
}

.txt-actions {
  text-align: center !important;
}
.table__footer{
  padding: 1rem;
  display: flex;
  color: #5c5b5a;
  font-size: 14px;
  justify-content: space-between;
  &__items{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__first{
    gap: 0.3rem;
  }
  &__select{
    padding: 0 1rem;
    border-radius: 5px;
    border: solid 1px #e2e1e0;
  }
}
.main_icon {
  width: 24px;
  height: 24px;
  fill: white;
  background-color: #163005;
  border-radius: 8px;
}
.select-table{
  padding: 0 0.5rem;
  text-align: center;
}
.initials{
  color:white;
  font-size: 16px;
  border-radius: 100%;
  font-weight: bolder;
  padding: 5px;
}
.userCard{
  padding: 2rem;
  border-radius: 16px;
  color: #5c5b5a;
}
.userCard__title{
  text-align: center;
  p{
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 2rem;
  }
}
.userCard__main{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userCard__inputs{
  display: flex;
  flex-direction: column;
  // gap: 1rem;
}
.custom-input{
  font-size: 12px;
  width: 100%;
  min-width: 300px;
}
.userCard__btn{
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.btn__card{
  height: 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2.5rem;
}
.btn__cardCancel{
  color: #5c5b5a;
  border: solid 1px #5c5b5a;
}
.btn__cardConfirm{
  color: white;
  background-color: #163005 ;
}
.logoUser{
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  p{
    font-size: 65px;
    font-weight: bolder;
    margin: 0;
    color: white;

  }
}
</style>
