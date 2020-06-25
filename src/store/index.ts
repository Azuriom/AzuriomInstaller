import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface FetchedStatus {
  downloaded: boolean;
  extracted: boolean;
  configured: boolean;
  installed: boolean;
}

export interface FetchedData {
  minPhpVersion: string;
  phpVersion: string;
  path: string;
  file: string;
  requirements: object;
  compatible: boolean;
  status: FetchedStatus;
}

export class State {
  public loading = false;

  public data!: FetchedData;

  public step = 'requirements';

  public errors: string[] = [];
}

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
