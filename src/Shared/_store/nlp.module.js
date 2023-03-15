
import { nlpService } from '@/Shared/_services/nlp.service';

const state = () => ({
	errors: [],
  currentReport: {},
	markup: ''
});

const getters = {

	getErrors: state => state.errors,
	getCurrentReport: state => state.currentReport,
	getMarkup: state => state.markup

};

const actions = {

  async analyzePhrase( { commit }, _payload){
		return new Promise( (resolve) => {
      commit('SET_ERRORS', []);

			nlpService.getSentiment( _payload, _result => {
				if(_result.errors){
					commit('SET_ERRORS', _result.errors);
				} else {
					commit('SET_REPORT', _result.data);
				}
				resolve();
			});
      
		});
  },

	async setMarkedUpText( {commit}, _payload ){
		return new Promise( (resolve) => {
      commit('SET_ERRORS', []);

			nlpService.highlightSentences( _payload, _result => {
				if(_result.errors){
					commit('SET_ERRORS', _result.errors);
				} else {
					commit('SET_MARKUP', _result.data);
				}
				resolve();
			});
      
		});
	}
  
};

const mutations = {

  SET_ERRORS(_state, _payload){
    _state.errors = _payload;
  },

	SET_REPORT(_state, _payload) {
    _state.currentReport = _payload;
	},

	SET_MARKUP(_state, _payload) {
    _state.markup = _payload;
	}

};

export const nlp = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};