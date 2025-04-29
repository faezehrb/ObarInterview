<template>
  <div>
    <header>
      <MainMenu />
    </header>
    <main class="page-wrapper">
      <div class="container p-0" :class="{ 'no-style': currentStep === 3 }">
        <div class="form-wrapper">
          <router-view v-slot="{ Component }">
            <component :is="Component" v-model:step="currentStep" />
          </router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainMenu from './MainMenu.vue';

const currentStep = ref(1);
</script>

<style scoped>
.container {
  width: 90%;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 16px 0px #00000014;
  margin: 100px auto;
  max-width: 990px;
}

.form-wrapper {
  width: 100%;
}
.container.no-style {
  background-color: transparent !important;
  box-shadow: none !important;
}

@media (min-width: 992px) {
  .page-wrapper {
    min-height: calc(100vh - 117px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    margin: 0 auto; 
  }
}
</style>