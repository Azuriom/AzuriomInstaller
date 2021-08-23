<template>
  <div>
    <h2>{{ $t('download.title') }}</h2>

    <p v-html="$t('download.legal')"/>

    <div class="text-center">
      <button @click="download" class="btn btn-primary">
        <b-icon-cloud-download/> {{ $t('download.go') }}

        <span v-if="loading" class="spinner-border spinner-border-sm"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import Api from '@/services/Api';

export default {
  name: 'Download',

  methods: {
    download(): void {
      this.$store.commit('startLoading');

      Api.download().then(() => {
        setTimeout(() => {
          this.$store.commit('finishLoading');
          window.location.reload(true);
        }, 750);
      }).catch((error) => {
        this.$store.commit('finishLoading');
        this.$emit('error', error);
      });
    },
  },

  computed: {
    ...mapState(['loading']),
  },
};
</script>
