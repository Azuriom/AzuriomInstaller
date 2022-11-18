<script setup lang="ts">
import type { FetchedData } from '@/api'

import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { baseFetch, download } from '@/api'
import DownloadView from '@/views/DownloadView.vue'
import RequirementsView from '@/views/RequirementsView.vue'
import FlagChineseSimplified from '@/components/FlagChineseSimplified.vue'
import FlagEnglish from '@/components/FlagEnglish.vue'
import FlagFrench from '@/components/FlagFrench.vue'
import FlagGerman from '@/components/FlagGerman.vue'

const { locale, t } = useI18n({ useScope: 'global' })

const preLoading = ref(true)
const loading = ref(false)
const step = ref('requirements')
const data = ref<FetchedData>()
const errors = reactive<string[]>([])
const phpIniPath = computed(() => data.value?.phpIniPath ?? t('unknown'))

onMounted(() => refreshRequirements())

async function refreshRequirements() {
  errors.length = 0
  loading.value = true

  try {
    const response = await baseFetch()

    if (!response.data.requirements) {
      errors.push(t('error', { error: 'No data in response' }))
      step.value = 'error'
      preLoading.value = false
      return
    }

    data.value = response.data
    loading.value = false
  } catch (e) {
    catchError(e)
  }

  preLoading.value = false
}

function showDownload() {
  step.value = 'download'
}

async function startDownload() {
  loading.value = true
  errors.length = 0

  try {
    await download()

    setTimeout(() => {
      loading.value = false

      reloadPage()
    }, 750)
  } catch (e) {
    catchError(e)
  }
}

function catchError(error: unknown) {
  loading.value = false

  if (preLoading.value) {
    step.value = 'error'
  }

  if (axios.isAxiosError(error) && error.response?.data.message) {
    errors.push(error.response.data.message)
    return
  }

  errors.push(t('error', { error }))
}

function setLocale(newLocale: string) {
  locale.value = newLocale
}

function reloadPage() {
  // Force reloads on supported browsers. On other browsers, the boolean
  // will just be ignored.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location.reload(true)
}
</script>

<template>
  <div>
    <h1 class="text-center">{{ $t('title') }}</h1>

    <div
      v-for="error in errors"
      :key="error"
      class="alert alert-danger"
      role="alert"
    >
      {{ error }}
      <div
        v-if="error.startsWith('cURL error 60:')"
        v-html="t('help.cUrl60', { path: phpIniPath })"
      />
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="preLoading"
        class="d-flex flex-column align-items-center justify-content-center"
        style="height: 300px"
      >
        <div class="spinner-border spinner-border-lg text-primary mb-3" />

        <h2>{{ t('loading') }}</h2>
      </div>

      <RequirementsView
        v-else-if="data && step === 'requirements'"
        :data="data"
        :loading="loading"
        @reload="reloadPage"
        @refresh="refreshRequirements"
        @next="showDownload"
      />

      <DownloadView
        v-else-if="step === 'download'"
        :loading="loading"
        @download="startDownload"
        @error="catchError"
      />
    </transition>

    <hr />

    <footer class="text-center">
      <FlagEnglish @click="setLocale('en')" />
      <FlagFrench @click="setLocale('fr')" />
      <FlagGerman @click="setLocale('de')" />
      <FlagChineseSimplified @click="setLocale('zh-CN')" />

      <p
        class="mb-0"
        v-html="t('copyright', { year: new Date().getFullYear() })"
      />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
