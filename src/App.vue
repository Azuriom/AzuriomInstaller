<script setup lang="ts">
import AzuriomInstaller from './views/AzuriomInstaller.vue'
</script>

<template>
  <div id="app" class="container">
    <div class="row justify-content-center align-items-center py-3 py-md-5">
      <div
        class="content col-xl-8 col-lg-10 col-12 p-3 px-md-5 py-md-4 rounded"
      >
        <div class="text-center">
          <img src="./assets/logo.svg" alt="Azuriom" class="mb-4" width="350" />
        </div>

        <AzuriomInstaller />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'bootstrap';

body {
  background: #2b1954;
  background: linear-gradient(
    45deg,
    #161334 0%,
    #181438 36%,
    #201643 70%,
    #2b1954 100%
  );
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  z-index: 5;
  min-height: 100vh;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('./assets/background.svg') no-repeat center / cover;
    z-index: -10;
  }
}

.row {
  min-height: 100%;
}

.content {
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.2), 0 6px 3px rgba(0, 0, 0, 0.25);
  background: #eee;
  z-index: 15;
}

h1 {
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;

  &::after {
    content: '';
    width: 80px;
    height: 3px;
    bottom: 0;
    right: calc(50% - 40px);
    position: absolute;
    background: #034ce2;
  }
}

.btn .spinner-border {
  vertical-align: middle;
}

.spinner-border-lg {
  height: 3rem;
  width: 3rem;
}

.locale-flag {
  height: 1.75rem;
  width: 1.75rem;
}
</style>
