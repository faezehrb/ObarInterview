<template>
  <div>
    <header>
      <MainMenu />
    </header>
    <main class="container mt-5">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import MainMenu from './MainMenu.vue'
</script>