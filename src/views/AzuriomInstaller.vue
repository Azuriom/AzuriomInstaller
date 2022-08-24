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
        v-html="$t('help.cUrl60', { path: phpIniPath })"
      />
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="preLoading"
        class="d-flex flex-column align-items-center justify-content-center"
        style="height: 300px"
      >
        <div class="spinner-border spinner-border-lg text-primary mb-3" />

        <h2>{{ $t('loading') }}</h2>
      </div>

      <requirements
        v-else-if="step === 'requirements'"
        :data="data"
        :loading="loading"
        @reload="reloadPage"
        @refresh="refreshRequirements"
        @next="showDownload"
      />

      <download
        v-else-if="step === 'download'"
        :loading="loading"
        @download="download"
        @error="handleAxiosError"
      />
    </transition>

    <hr />

    <footer class="text-center">
      <flag-english @click="setLocale('en')" />
      <flag-french @click="setLocale('fr')" />
      <flag-zhcn @click="setLocale('zh-CN')" />

      <p
        class="mb-0"
        v-html="$t('copyright', { year: new Date().getFullYear() })"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { defineComponent } from 'vue'
import { baseFetch, download, FetchedData } from '@/api'
import Download from '@/views/DownloadView.vue'
import Requirements from '@/views/RequirementsView.vue'
import FlagEnglish from '@/components/FlagEnglish.vue'
import FlagFrench from '@/components/FlagFrench.vue'
import FlagChineseSimplified from '@/components/FlagChineseSimplified.vue'

export default defineComponent({
  name: 'AzuriomInstaller',
  components: {
    FlagEnglish,
    FlagFrench,
    FlagChineseSimplified,
    Download,
    Requirements,
  },
  data() {
    return {
      preLoading: true,
      loading: false,
      errors: [] as string[],
      step: 'requirements',
      data: null as unknown as FetchedData | null,
    }
  },
  computed: {
    phpIniPath(): string {
      if (this.data && this.data.phpIniPath) {
        return this.data.phpIniPath
      }

      return this.$t('unknown')
    },
  },
  mounted() {
    this.refreshRequirements()
  },
  methods: {
    async refreshRequirements() {
      this.errors = []
      this.loading = true

      try {
        const response = await baseFetch()

        if (!response.data.requirements) {
          this.addError(this.$t('error', { error: 'No data in response' }))
          this.step = 'error'
          this.preLoading = false
          return
        }

        this.data = response.data
        this.loading = false
      } catch (e) {
        this.handleAxiosError(e as AxiosError)
      }

      this.preLoading = false
    },

    showDownload(): void {
      this.step = 'download'
    },

    async download() {
      this.errors = []
      this.loading = true

      try {
        await download()

        setTimeout(() => {
          this.loading = false
          this.reloadPage()
        }, 750)
      } catch (e) {
        this.handleAxiosError(e as AxiosError)
      }
    },

    handleAxiosError(error: AxiosError) {
      this.loading = false

      if (this.preLoading) {
        this.step = 'error'
      }

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        this.addError(error.response.data.message)
        return
      }

      this.addError(this.$t('error', { error }))
    },

    addError(error: string) {
      this.errors.push(error)
    },

    setLocale(locale: string) {
      this.$i18n.locale = locale
    },

    reloadPage() {
      // Force reloads on supported browsers. On other browsers, the boolean
      // will just be ignored.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.location.reload(true)
    },
  },
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
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
