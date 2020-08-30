<template>
  <transition name="fade" mode="out-in">
        <div v-if="!game">
            <div id="gameSelect" class="text-center">
                <h2 class="mb-3">{{ $t('config.game.title') }}</h2>

                <div class="row">
                    <div class="col-md-4">
                        <a href="#" @click.prevent="selectGame('minecraft')">
                            <img src="./../../assets/games/minecraft.png" alt="Minecraft" class="img-fluid rounded mb-1">

                            <p>Minecraft</p>
                        </a>
                    </div>

                    <div class="col-md-4">
                        <a href="#" @click.prevent="selectGame('gmod')">
                            <img src="./../../assets/games/gmod.svg" alt="Garry's mod" class="img-fluid rounded m-3">

                            <p>Garry's mod</p>
                        </a>
                    </div>

                    <div class="col-md-4">
                        <a href="#" @click.prevent="selectGame('csgo')">
                            <img src="./../../assets/games/csgo.png" alt="Minecraft" class="img-fluid rounded mb-1">

                            <p>CS:GO</p>
                        </a>
                    </div>
                </div>

                <p class="text-danger font-weight-bold mb-0">
                    {{ $t('config.warn') }}
                </p>
            </div>
        </div>

        <form v-else @submit.prevent="install">
            <h2 class="text-center">{{ games[game] }}</h2>

            <!-- TODO Steam games -->
            <!--
            <button @click="selectGame(null)" type="button" class="btn btn-secondary mb-3">
                <b-icon-arrow-left/> {{ $t('config.game.change') }}
            </button>
            -->

            <h3>{{ $t('config.settings.title') }}</h3>

            <div class="form-group mb-4">
                <label for="locale">{{ $t('config.settings.locale') }}</label>

                <select v-model="locale" class="custom-select" id="locale" required>
                    <option v-for="(localeName, localeKey) in locales" :key="localeKey" :value="localeKey">{{ localeName}}</option>
                </select>
            </div>

            <div v-if="steamGame">
                <div class="form-group">
                    <label for="steamProfile">{{ $t('config.steam.profile') }}</label>

                    <input v-model="steamProfile" :class="{'is-invalid': $v.steamProfile.$error}" id="steamProfile" type="url" class="form-control" placeholder="http://steamcommunity.com/profiles/****">

                    <div v-if="$v.steamProfile.$error" class="invalid-feedback">
                        {{ $t('validation.required') }}
                    </div>

                    <small class="form-text text-muted">{{ $t('config.steam.profileInfo') }}</small>
                </div>

                <div class="form-group">
                    <label for="steamKey">{{ $t('config.steam.key') }}</label>

                    <input v-model="steamKey" :class="{'is-invalid': $v.steamKey.$error}" id="steamKey" type="text" class="form-control">

                    <div v-if="$v.steamKey.$error" class="invalid-feedback">
                        {{ $t('validation.required') }}
                    </div>

                    <small v-html="$t('config.steam.keyInfo')" class="form-text text-muted"/>
                </div>
            </div>

            <div v-else>
                <h3>{{ $t('config.user.title') }}</h3>

                <div class="form-group">
                    <label for="name">{{ $t('config.user.name') }}</label>

                    <input v-model.trim="name" :class="inputClass($v.name)" id="name" type="text" class="form-control" autocomplete="name">

                    <div v-if="$v.name.$error" class="invalid-feedback">
                        {{ $t('validation.required') }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">{{ $t('config.user.email') }}</label>

                    <input v-model.trim="email" :class="inputClass($v.email)" id="email" type="email" class="form-control" autocomplete="email">

                    <div v-if="$v.email.$error" class="invalid-feedback">
                        {{ $t('validation.email') }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">{{ $t('config.user.password') }}</label>

                    <input v-model="password" :class="inputClass($v.password)" id="password" type="password" class="form-control" autocomplete="new-password">

                    <div v-if="$v.password.$error" class="invalid-feedback">
                        {{ $t('validation.password') }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="password-confirm">{{ $t('config.user.passwordConfirm') }}</label>

                    <input v-model="passwordConfirm" :class="inputClass($v.passwordConfirm)" id="password-confirm" type="password" class="form-control" autocomplete="new-password">

                    <div v-if="$v.passwordConfirm.$error" class="invalid-feedback">
                        {{ $t('validation.passwordConfirm') }}
                    </div>
                </div>

                <div v-if="game === 'minecraft'" class="form-group">
                    <div class="custom-control custom-switch">
                        <input v-model="minecraftPremium" type="checkbox" class="custom-control-input" id="minecraftPremiumSwitch">
                        <label class="custom-control-label" for="minecraftPremiumSwitch">{{ $t('config.minecraft.premium') }}</label>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button type="submit" class="btn btn-primary">
                    {{ $t('config.install') }}
                    <span v-if="loading" class="spinner-border spinner-border-sm"/>
                    <b-icon-check v-else scale="1.5"/>
                </button>
            </div>
        </form>
  </transition>
</template>

<script>
import {
  requiredIf, requiredUnless, email, sameAs, minLength,
} from 'vuelidate/lib/validators';

import Api from '@/services/Api';
import { mapState } from 'vuex';

export default {
  name: 'Config',

  data() {
    return {
      game: 'minecraft', // TODO Steam Games
      steamProfile: '',
      steamKey: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      minecraftPremium: false,
      locale: this.$i18n.locale,
      locales: {
        en: 'English',
        fr: 'Français',
      },
      games: {
        minecraft: 'Minecraft',
        gmod: 'Garry\'s mod',
        csgo: 'CS:GO',
      },
    };
  },

  methods: {
    selectGame(game) {
      this.game = game;
    },

    install() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit('startLoading');

      Api.config(this.game, {
        locale: this.locale,
        name: this.name,
        email: this.email,
        password: this.password,
        minecraftPremium: this.minecraftPremium,
        steamProfile: this.steamProfile,
        steamApiKey: this.steamKey,
      }).then(() => {
        this.$store.commit('nextStep', 'installed');
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
    steamGame() {
      return this.game !== 'minecraft';
    },
  },

  watch: {
    game() {
      this.$store.commit('clearErrors');
    },
  },

  validations: {
    name: {
      required: requiredUnless('steamGame'),
    },
    email: {
      required: requiredUnless('steamGame'),
      email,
    },
    password: {
      required: requiredUnless('steamGame'),
      minLength: minLength(6),
    },
    passwordConfirm: {
      required: requiredUnless('steamGame'),
      sameAsPassword: sameAs('password'),
    },
    steamProfile: {
      required: requiredIf('steamGame'),
    },
    steamKey: {
      required: requiredIf('steamGame'),
    },
  },
};
</script>
