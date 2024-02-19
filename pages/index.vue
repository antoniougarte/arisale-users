<template>
  <div>
    <ActionsComponent />
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
            <td>{{ item.initials }}</td>
            <td>{{ item.firstname }} {{ item.lastname }}</td>
            <td>{{ item.role.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.cellphone }}</td>
            <td>{{ item.documentIdentityType }}</td>
            <td>{{ item.documentNumber }}</td>
            <td>{{ item.status }}</td>
            <!-- Botones de acciones -->
            <td class="buttons-table">
              <div role="button" class="main-button" @click="openModal(item)">
                editar usuario
              </div>
              <router-link :to="`/items/${item.id}`">
                <!-- Botón de ver detalles -->
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <div role="button" class="main-button" v-bind="attrs" v-on="on">
            Nuevo usuario
          </div>
        </template>
        <v-card class="userCard">
          <div class="userCard__title">
    <p>Ingresa el correo del nuevo usuario: {{ userName }}</p>
          </div>
          <div class="userCard__main">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              outlined
              clearable
            ></v-text-field>
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
  </div>
</template>
<script>
import ActionsComponent from '~/components/ActionsComponent.vue';
import { headers } from '~/utils/headersUtils.js';

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
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlhZCIsImV4cCI6MTcxMDk1ODAwMSwiaWF0IjoxNzA4MzY2MDAxLCJkYXRhIjoiUytuTkZGakE0R2w0aldqbEl3eGdDQmhiWjFOdTk4T2F2aGo0R2FydFpkWFBrL2xGZFZWQXVkdk00RCtHeVBZZSJ9.YJneZR2Yfy__eELE0mYFa_HZANHl3V2ETI1EDgCVBbU',
        },
      });

      const { items } = response.data;
      console.log(items);
      return { items };
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return { items: [] };
    }
  },

  props: ['userName'],
  data() {
    return {
      itemsPerPage: 10,
      currentPage: 1,
      items: [],
      headers: headers,
      footerProps: {
        itemsPerPageOptions: [10, 20, 30],
      },
      dialog: false,
    };
  },
  mounted() {
    // console.log(`The initial count `, this.items)
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return 3;
    },
  },
  methods: {
    openModal(item) {
      console.log(item);
      this.selectedItem = item;
      this.userName = `${item.firstname} ${item.lastname}`;
      this.dialog = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //   }
    // },
    updatePage() {
      // No es necesario hacer nada, la asignación reactiva lo manejará
    }
  }
}
</script>
<style lang="scss" scoped>.main {
  margin: 1rem 0;
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
  justify-content: space-between;
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

</style>
