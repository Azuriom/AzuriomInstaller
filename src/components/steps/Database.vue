<template>
<form @submit.prevent="verifyDatabase">
    <h2>{{ $t('database.title') }}</h2>

    <div class="form-group">
        <label for="type">{{ $t('database.type') }}</label>
        <select v-model="type" class="custom-select" id="type">
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
            <option value="pgsql">PostgreSQL</option>
        </select>
    </div>

    <div v-if="hasCredentials" id="databaseForm">
        <div class="form-row">
            <div class="form-group col-md-9">
                <label for="host">{{ $t('database.host') }}</label>
                <input v-model.trim="host" :class="inputClass($v.host)" type="text" class="form-control" id="host" placeholder="127.0.0.1">

                <div v-if="$v.host.$error" class="invalid-feedback">
                    {{ $t('validation.required') }}
                </div>
            </div>

            <div class="form-group col-md-3">
                <label for="port">{{ $t('database.port') }}</label>
                <input v-model="port" :class="inputClass($v.port)" type="number" class="form-control" id="port" placeholder="3306">

                <div v-if="$v.port.$error" class="invalid-feedback">
                    {{ $t('validation.required') }}
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="database">{{ $t('database.database') }}</label>
            <input v-model.trim="database" :class="inputClass($v.database)" type="text" class="form-control" id="database" placeholder="azuriom">

            <div v-if="$v.database.$error" class="invalid-feedback">
                {{ $t('validation.required') }}
            </div>
        </div>

        <div class="form-group">
            <label for="user">{{ $t('database.user') }}</label>
            <input v-model.trim="user" :class="inputClass($v.user)" type="text" class="form-control" id="user" placeholder="root">

            <div v-if="$v.user.$error" class="invalid-feedback">
                {{ $t('validation.required') }}
            </div>
        </div>

        <div class="form-group">
            <label for="password">{{ $t('database.password') }}</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="123456">
        </div>
    </div>

    <p v-if="type === 'sqlite'" class="text-danger">{{ $t('database.sqlite') }}</p>

    <div class="text-center">
        <button type="submit" class="btn btn-primary">
            {{ $t('continue') }}
            <span v-if="loading" class="spinner-border spinner-border-sm"/>
            <b-icon-arrow-right v-else/>
        </button>
    </div>
</form>
</template>

<script>
import { requiredIf, numeric, between } from 'vuelidate/lib/validators';
import Api from '@/services/Api';
import { mapState } from 'vuex';

export default {
  name: 'Database',

  data() {
    return {
      type: 'mysql',
      host: '',
      port: 3306,
      user: '',
      database: '',
      password: '',
    };
  },

  methods: {
    verifyDatabase() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit('startLoading');

      Api.database({
        type: this.type,
        credentials: this.hasCredentials ? {
          host: this.host,
          port: this.port,
          user: this.user,
          database: this.database,
          password: this.password,
        } : null,
      }).then(() => {
        this.$store.commit('nextStep', 'config');
      }).catch((error) => {
        this.$emit('error', error);
      }).finally(() => {
        this.$store.commit('finishLoading');
      });
    },

    inputClass(input) {
      return {
        'is-invalid': input.$error,
        'is-valid': !input.$invalid,
      };
    },
  },

  computed: {
    ...mapState(['loading']),
    hasCredentials() {
      return this.type !== 'sqlite';
    },
  },

  watch: {
    type() {
      this.$store.commit('clearErrors');
    },
  },

  validations: {
    host: {
      required: requiredIf('hasCredentials'),
    },
    port: {
      numeric,
      between: between(1, 65535),
    },
    database: {
      required: requiredIf('hasCredentials'),
    },
    user: {
      required: requiredIf('hasCredentials'),
    },
  },
};
</script>
