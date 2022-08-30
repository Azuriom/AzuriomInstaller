<template>
  <div class="text-center">
    <h2>{{ $t('download.title') }}</h2>

    <p v-html="$t('download.info')" />

    <button @click="download" class="btn btn-primary">
      <BIconCloudDownload /> {{ $t('download.go') }}

      <span v-if="loading" class="spinner-border spinner-border-sm" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BIconCloudDownload } from 'bootstrap-icons-vue'

export default defineComponent({
  name: 'DownloadView',
  components: {
    BIconCloudDownload,
  },
  props: {
    loading: Boolean,
  },
  methods: {
    download() {
      this.$emit('download')
    },
  },
})
</script>
