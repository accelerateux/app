
let api = {}
let created = false
let apiStopped = false
let transcript = []

const createAPI = (_options = {}, _callback) => {
  console.log('createAPI')
  if (created) {
    _callback({ error: 'already created', status: 'error' })
  } else {
    api = getAPI(_options)
    created = true;
    _callback({ api: api, status: 'created' })
  }
}

const startAPI = (_callback) => {
  api.start();
  apiStopped = false;
  _callback({ status: 'started' });
}

const stopAPI = (_callback) => {
  api.stop();
  apiStopped = true;
  
  _callback({ status: 'stopped', transcript: transcript });
}

const getAPI = (_options) => {
  return api;
}

export const nlpService = {
  createAPI: createAPI,
  startAPI: startAPI,
  stopAPI: stopAPI,
  getAPI: getAPI
};