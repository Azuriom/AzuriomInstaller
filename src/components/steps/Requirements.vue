<template>
  <div>
    <p v-html="$t('welcome')" class="text-center"/>

    <div v-if="!compatible">
      <div class="list-group mb-3 requirements">
        <div v-for="(requirementStatus, requirement) in requirements" :key="requirement" class="list-group-item">
          <div class="row">
            <div class="col-10">
              {{ translateRequirement(requirement) }}
            </div>

            <div v-if="requirement === 'php'" class="col-2">
              <span class="float-right" :class="requirementStatus ? 'text-success' : 'text-danger'" :title="data.phpFullVersion">
                {{ data.phpVersion }}
              </span>
            </div>

            <div v-else class="col-2">
              <b-icon-check v-if="requirementStatus" scale="2" variant="success" class="float-right"/>

              <b-icon-x v-else scale="2" variant="danger" class="float-right"/>
            </div>

            <div v-if="!requirementStatus && hasHelp(requirement)" class="col-md-12 px-4 mt-2">
              <b-icon-info-circle-fill variant="primary" class="mr-1"/>
              <span v-html="translateRequirementHelp(requirement)"/>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-danger">
        <b-icon-exclamation-circle-fill/> {{ $t('requirements.missing') }}
      </div>

      <div class="text-center">
        <button @click="refreshRequirements" :disabled="loading" class="btn btn-secondary mx-1">
          <b-icon-arrow-clockwise/>
          {{ $t('requirements.recheck') }}
          <span v-if="loading" class="spinner-border spinner-border-sm"/>
        </button>
      </div>
    </div>

    <div v-else class="text-center text-success">
      <p>
        <b-icon-check scale="1.5"/> {{ $t('requirements.success') }}
      </p>

      <button @click="nextStep" class="btn btn-primary rounded-pill mx-1">
        {{ $t('continue') }} <b-icon-arrow-right/>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Requirements',

  computed: {
    ...mapState(['loading']),
    ...mapGetters(['requirements', 'compatible', 'extracted', 'data']),
  },

  methods: {
    refreshRequirements() {
      this.$emit('refresh');
    },

    nextStep() {
      this.$store.commit('nextStep', this.extracted ? 'database' : 'download');
    },

    hasHelp(requirement) {
      return requirement !== 'php';
    },

    translateRequirementHelp(requirement) {
      if (requirement.startsWith('extension-')) {
        const v = this.data.phpVersion;

        return this.$t('requirements.help.extension', {
          command: `apt install curl php${v}-mysql php${v}-pgsql php${v}-sqlite php${v}-bcmath php${v}-mbstring php${v}-xml php${v}-curl php${v}-zip php${v}-gd`,
        });
      }

      if (requirement === 'writable') {
        return this.$t('requirements.help.writable', {
          command: `chmod -R 755 ${this.data.path} && chown -R www-data:www-data ${this.data.path}`,
        });
      }

      if (requirement === 'writable' && !this.data.htaccess) {
        return this.$t('requirements.help.htaccess');
      }

      return this.$t(`requirements.help.${requirement}`);
    },

    translateRequirement(requirement) {
      if (requirement.startsWith('extension-')) {
        return this.$t('requirements.extension', {
          extension: requirement.replace('extension-', ''),
        });
      }

      return this.$t(`requirements.${requirement}`, { version: this.data.minPhpVersion });
    },
  },
};
</script>
