
import { homeService } from '@/Home/_services/home.service';

const state = () =>({
  isLoaded: false,
  errors: [],
  future: ''
});
  

const getters = {
  isLoaded: state => state.isLoaded,
  getErrors: state => state.errors,
  getFuture: state => state.future
};

const actions = {

  setFuture( { commit, state, rootState }, _payload ){
    commit('SET_ERRORS', []);

    homeService.getFuture( _payload, (_result) => {
      if(_result.errors){
        commit('SET_ERRORS', _result.errors);
      } else {
        commit('SET_FUTURE', _result.data );
      }
    });
  }

};

const mutations = {
  SET_ERRORS(state, payload){
    state.errors = payload;
  },

  SET_FUTURE( _state, _payload ){
    _state.future = _payload;
  },

};

export const home = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};