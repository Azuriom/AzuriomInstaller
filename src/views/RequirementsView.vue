<script setup lang="ts">
import type { FetchedData } from '@/api'

import {
  BIconArrowClockwise,
  BIconArrowRight,
  BIconCheckLg,
  BIconInfoCircle,
  BIconExclamationTriangle,
  BIconXLg,
} from 'bootstrap-icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ loading: boolean; data: FetchedData }>()
const emit = defineEmits<{ refresh: []; reload: []; next: [] }>()

function nextStep() {
  if (props.data.extracted) {
    setTimeout(() => emit('reload'))
    return
  }

  emit('next')
}

function markdownify(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\\n/g, '<br>')
}

function translateRequirement(requirement: string) {
  if (requirement.startsWith('extension-')) {
    return t('requirements.extension', {
      extension: requirement.replace('extension-', ''),
    })
  }

  if (requirement.startsWith('function-')) {
    return t('requirements.function', {
      function: requirement.replace('function-', ''),
    })
  }

  return t(`requirements.${requirement}`, { version: props.data.minPhpVersion })
}

function translateRequirementHelp(requirement: string) {
  if (requirement.startsWith('extension-')) {
    const v = props.data.phpVersion

    return t('requirements.help.extension', {
      command: `apt install curl php${v}-mysql php${v}-pgsql php${v}-sqlite3 php${v}-bcmath php${v}-mbstring php${v}-xml php${v}-curl php${v}-zip php${v}-gd`,
    })
  }

  if (requirement.startsWith('function-')) {
    return t('requirements.help.function', {
      path: props.data.phpIniPath || '',
    })
  }

  if (requirement === 'writable') {
    return t('requirements.help.writable', {
      command: `chmod -R 755 ${props.data.path} && chown -R www-data:www-data ${props.data.path}`,
    })
  }

  return requirement === 'writable' && !props.data.htaccess
    ? t('requirements.help.htaccess')
    : t(`requirements.help.${requirement}`, {
        docs: `<a href="https://azuriom.com/docs/faq" target="_blank" rel="noopener noreferrer">${t(
          'docs',
        )}</a>`,
      })
}

function hasRequirementHelp(requirement: string) {
  if (requirement === 'php') {
    return false
  }

  if (!props.data.windows) {
    return true
  }

  return requirement !== 'writable' && !requirement.startsWith('extension-')
}
</script>

<template>
  <div>
    <p class="text-center">{{ t('welcome') }}</p>

    <div v-if="!data.compatible">
      <div class="list-group mb-3 requirements">
        <div
          v-for="(reqStatus, requirement) in data.requirements"
          :key="requirement"
          class="list-group-item"
        >
          <div class="row">
            <div class="col-10">
              {{ translateRequirement(requirement) }}
            </div>

            <div v-if="requirement === 'php'" class="col-2">
              <span
                class="float-end"
                :class="reqStatus ? 'text-success' : 'text-danger'"
                :title="data.phpFullVersion"
              >
                {{ data.phpVersion }}
              </span>
            </div>

            <div v-else class="col-2 fs-5">
              <span :class="reqStatus ? 'text-success' : 'text-danger'" class="float-end">
                <BIconCheckLg v-if="reqStatus" />

                <BIconXLg v-if="!reqStatus" />
              </span>
            </div>

            <div v-if="!reqStatus && hasRequirementHelp(requirement)" class="col-md-12 px-4 mt-2">
              <span class="text-primary me-1">
                <BIconInfoCircle />
              </span>
              <span v-html="markdownify(translateRequirementHelp(requirement))" />
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-danger">
        <BIconExclamationTriangle /> {{ t('requirements.missing') }}
      </div>

      <div class="text-center">
        <button
          @click="emit('refresh')"
          :disabled="loading"
          class="btn btn-secondary rounded-pill mx-1"
        >
          <BIconArrowClockwise />
          {{ t('requirements.recheck') }}
          <span v-if="loading" class="spinner-border spinner-border-sm" />
        </button>
      </div>
    </div>

    <div v-else class="text-center text-success">
      <p>{{ t('requirements.success') }}</p>

      <button @click="nextStep" class="btn btn-primary rounded-pill mx-1">
        {{ t('continue') }} <BIconArrowRight />
      </button>
    </div>
  </div>
</template>
