<template>
  <div class="menu">
    <div class="menu__item menu__item__logo">
      <!-- <img class="menu-icon" src="./svg/menuDark.svg" width="30"> -->
      <svg class="icon"><use href="@/assets/icons.svg" /></svg>
      <span>Guías de remisión (BETA)</span>
    </div>
    <div v-if="(this.$route.path==='/')" class="menu__item select" >
      <!-- <img src="./svg/filterIcon.svg" width="20"> -->
      <span>Local Principal Etupsa OMA</span>
      <!-- <img src="./svg/arrowDown.svg" width="20"> -->
    </div>
    <div class="menu__item menu__item__account">
      <span class="menu__item__account__icon">RR</span>
      <div class="menu__item__account__info">
        <span class="menu__item__account__info__name">Renzo Alejandro Rosas Rosales</span>
        <span class="menu__item__account__info__role">Administrador de ETUPSA 73</span>
      </div>
      <!-- <img src="./svg/arrowDownDark.svg" width="30" > -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


</script>

<style lang="scss" scoped>
.menu{
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: #5c5b5a;
  &__item{
    display: flex;
    align-items: center;
    &__logo{
      display: flex;
      gap: 0.5rem;
      font-weight: bold;
    }
    &__account{
      display: flex;
      gap: 0.5rem;
      &__icon{
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(155, 255, 155);
        border-radius: 100%;
      }
      &__info{
        display: flex;
        flex-direction: column;
        &__name{
          font-size: 14px;
        }
        &__role{
          font-size: 12px;
        }
      }
    }
  }
}
.menu-icon{
  background-color: #163005;
  border-radius: 5px;
  padding: 0.3rem;
  cursor:pointer;
}
.select{
  display: flex;
  gap: 7rem;
  padding: .3rem 0.5rem;
  border: solid 1px #e2e1e0;
  border-radius: 15px;
  font-size: 14px;
  cursor:pointer;
}

.icon {
  width: 24px;
  height: 24px;
  fill: black;
}
</style>
