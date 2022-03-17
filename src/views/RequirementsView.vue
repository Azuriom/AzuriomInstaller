<template>
  <div>
    <p v-html="$t('welcome')" class="text-center" />

    <div v-if="!data.compatible">
      <div class="list-group mb-3 requirements">
        <div
          v-for="(requirementStatus, requirement) in data.requirements"
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
                :class="requirementStatus ? 'text-success' : 'text-danger'"
                :title="data.phpFullVersion"
              >
                {{ data.phpVersion }}
              </span>
            </div>

            <div v-else class="col-2 fs-5">
              <span
                :class="requirementStatus ? 'text-success' : 'text-danger'"
                class="float-end"
              >
                <BIconCheckLg v-if="requirementStatus" />

                <BIconXLg v-if="!requirementStatus" />
              </span>
            </div>

            <div
              v-if="!requirementStatus && requirement !== 'php'"
              class="col-md-12 px-4 mt-2"
            >
              <span class="text-primary me-1">
                <BIconInfoCircle />
              </span>
              <span v-html="translateRequirementHelp(requirement)" />
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-danger">
        <BIconExclamationTriangle /> {{ $t('requirements.missing') }}
      </div>

      <div class="text-center">
        <button
          @click="refreshRequirements"
          :disabled="loading"
          class="btn btn-secondary mx-1"
        >
          <BIconArrowClockwise />
          {{ $t('requirements.recheck') }}
          <span v-if="loading" class="spinner-border spinner-border-sm" />
        </button>
      </div>
    </div>

    <div v-else class="text-center text-success">
      <p>{{ $t('requirements.success') }}</p>

      <button @click="nextStep" class="btn btn-primary rounded-pill mx-1">
        {{ $t('continue') }} <BIconArrowRight />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  BIconArrowClockwise,
  BIconArrowRight,
  BIconCheckLg,
  BIconInfoCircle,
  BIconExclamationTriangle,
  BIconXLg,
} from 'bootstrap-icons-vue'
import { FetchedData } from '@/api'

export default defineComponent({
  name: 'RequirementsView',
  components: {
    BIconArrowClockwise,
    BIconArrowRight,
    BIconCheckLg,
    BIconInfoCircle,
    BIconExclamationTriangle,
    BIconXLg,
  },
  props: {
    loading: Boolean,
    data: {
      type: Object as PropType<FetchedData>,
      required: true,
    },
  },
  methods: {
    refreshRequirements() {
      this.$emit('refresh')
    },

    nextStep() {
      if (this.data.extracted) {
        setTimeout(() => this.$emit('reload'))
        return
      }

      this.$emit('next')
    },

    translateRequirementHelp(requirement: string) {
      if (requirement.startsWith('extension-')) {
        const v = this.data.phpVersion

        return this.$t('requirements.help.extension', {
          command: `apt install curl php${v}-mysql php${v}-pgsql php${v}-sqlite php${v}-bcmath php${v}-mbstring php${v}-xml php${v}-curl php${v}-zip php${v}-gd`,
        })
      }

      if (requirement.startsWith('function-')) {
        return this.$t('requirements.help.function')
      }

      if (requirement === 'writable') {
        return this.$t('requirements.help.writable', {
          command: `chmod -R 755 ${this.data.path} && chown -R www-data:www-data ${this.data.path}`,
        })
      }

      if (requirement === 'writable' && !this.data.htaccess) {
        return this.$t('requirements.help.htaccess')
      }

      return this.$t(`requirements.help.${requirement}`)
    },

    translateRequirement(requirement: string) {
      if (requirement.startsWith('extension-')) {
        return this.$t('requirements.extension', {
          extension: requirement.replace('extension-', ''),
        })
      }

      if (requirement.startsWith('function-')) {
        return this.$t('requirements.function', {
          function: requirement.replace('function-', ''),
        })
      }

      return this.$t(`requirements.${requirement}`, {
        version: this.data.minPhpVersion,
      })
    },
  },
})
</script>
