<template>
  <div class="menu">
    <div class="menu__item menu__item__logo">
      <!-- <img class="menu-icon" src="./svg/menuDark.svg" width="30"> -->
      <svg class="icon"><use href="@/assets/icons.svg#ic_add" /></svg>
      <span>Administrador de usuarios</span>
    </div>
    <div class="menu__item account">
      <span class="account__icon">RR</span>
      <div class="account__info">
        <span class="account__info__name">Renzo Alejandro Rosas Rosales</span>
        <span class="account__info__role">Administrador de ETUPSA 73</span>
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
}
.menu__item{
  display: flex;
  align-items: center;
}
.menu__item__logo{
  display: flex;
  gap: 0.5rem;
  font-weight: bold;
}
.account{
  display: flex;
  gap: 0.5rem;
}
.account__icon{
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(155, 255, 155);
  border-radius: 100%;
}
.account__info{
  display: flex;
  flex-direction: column;
  &__name{
    font-size: 14px;
  }
  &__role{
    font-size: 12px;
  }
}

.icon {
  width: 24px;
  height: 24px;
  fill: black;
}
</style>
