import Vue from 'vue';
import Vuex from 'vuex';
import State from '@/store/State';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),

  getters: {
    compatible(state) {
      return state.data.compatible;
    },
    requirements(state) {
      return state.data.requirements;
    },
    extracted(state) {
      return state.data.status.extracted;
    },
    errors(state) {
      return state.errors;
    },
    data(state) {
      return state.data;
    },
    phpIniPath(state) {
      return state.phpIniPath;
    },
  },

  mutations: {
    startLoading(state) {
      state.loading = true;
      state.errors = [];
    },
    finishLoading(state) {
      state.loading = false;
    },
    updateData(state, data) {
      state.data = data;

      if (data && data.phpIniPath) {
        state.phpIniPath = data.phpIniPath;
      }
    },
    nextStep(state, step) {
      state.step = step;
      state.errors = [];
    },
    addError(state, error) {
      state.errors.push(error);
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
});
