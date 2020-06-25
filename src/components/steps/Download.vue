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

<script>
import Api from '@/services/Api';
import { mapState } from 'vuex';

export default {
  name: 'Download',

  methods: {
    download() {
      this.$store.commit('startLoading');

      Api.download().then(() => {
        this.$store.commit('nextStep', 'database');
      }).catch((error) => {
        this.$emit('error', error);
      }).finally(() => {
        this.$store.commit('finishLoading');
      });
    },
  },

  computed: {
    ...mapState(['loading']),
  },
};
</script>
