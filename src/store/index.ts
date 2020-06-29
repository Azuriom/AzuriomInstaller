import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export class FetchedStatus {
  downloaded = false;
  extracted = false;
  configured =false;
  installed = false;
}

export class FetchedData {
  minPhpVersion  = '';
  phpVersion = '';
  path = '';
  file = '';
  requirements!: object;
  compatible = false;
  status!: FetchedStatus;
}

export class State {
  public loading = false;

  public data = new FetchedData();

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
