<script setup lang="ts">
import { BIconCloudDownload } from 'bootstrap-icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{ download: [] }>()
defineProps<{ loading: boolean }>()
</script>

<template>
  <div class="text-center">
    <h2>{{ t('download.title') }}</h2>

    <p>{{ t('download.info') }}</p>

    <button @click="emit('download')" class="btn btn-primary rounded-pill">
      <BIconCloudDownload /> {{ t('download.go') }}

      <span v-if="loading" class="spinner-border spinner-border-sm" />
    </button>
  </div>
</template>
