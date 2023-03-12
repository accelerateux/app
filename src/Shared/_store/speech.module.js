
import { speechService } from '@/Shared/_services/speech.service';

const state = () => ({
	errors: [],
	api: {},
	status: '',
	transcript: ''
});

const getters = {

	getErrors: state => state.errors,
	getAPI: state => state.api,
	getStatus: state => state.status,
	getTranscript: state => state.transcript

};

const actions = {

  async createSpeechAPI( { commit }, _payload){
		return new Promise( (resolve) => {
      commit('SET_ERRORS', []);

			speechService.createAPI( _payload, result => {
				if(result.errors){
					commit('SET_ERRORS', result.errors);
					commit('SET_API_STATUS', result.status);
				} else {
					commit('SET_API', result.api);
					commit('SET_API_STATUS', result.status);
				}
				resolve();
			});
      
		});
  },

	startSpeechAPI( {commit} ){
		speechService.startAPI( result => {
			commit('SET_API_STATUS', result.status);
		})
	},

	stopSpeechAPI( {commit} ){
		speechService.stopAPI( result => {
			commit('SET_API_STATUS', result.status);
			commit('SET_TRANSCRIPT', result.transcript);
		})
	}
  
};

const mutations = {

  SET_ERRORS(_state, _payload){
    _state.errors = _payload;
  },

	SET_API(_state, _payload) {
    _state.api = _payload;
  },

	SET_API_STATUS(_state, _payload) {
    _state.status = _payload;
  },

	SET_TRANSCRIPT(_state, _payload) {
		_state.transcript = _payload;
	}

};

export const speech = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};