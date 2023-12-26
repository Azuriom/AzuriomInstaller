<script setup lang="ts">
import AzuriomInstaller from './views/AzuriomInstaller.vue'
</script>

<template>
  <div id="app" class="container">
    <div class="row justify-content-center align-items-center py-3 py-md-5">
      <div class="content col-xl-8 col-lg-10 col-12 bg-body p-3 px-md-5 py-md-4 shadow-sm rounded">
        <div class="text-center">
          <img src="./assets/logo.svg" alt="Azuriom" class="mb-4" width="350" />
        </div>

        <AzuriomInstaller />
      </div>
    </div>
  </div>
</template>
