let speechEvent = new Event("speechEvent", {
	bubbles: true
});

export const speechService = {

	api: {},
	created: false,
	apiStopped: false,
	transcript: [],

	createAPI: function (options = {}, callback) {
		console.log('createAPI')
		if (speechService.created) {
			callback({
				error: 'already created',
				status: 'error'
			})
		} else {
			speechService.api = speechService.getAPI(options)
			speechService.created = true;
			callback({
				api: speechService.api,
				status: 'created'
			})
		}
	},

	startAPI: function (callback) {
		speechService.api.start();
		speechService.apiStopped = false;
		callback({
			status: 'started'
		});
	},

	stopAPI: function (callback) {
		speechService.api.stop();
		speechService.apiStopped = true;
		let transcript = speechService.transcript[ speechService.transcript.length -1 ];
		callback({
			status: 'stopped',
			transcript: transcript
		});
	},

	onResult: function (event) {
		const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
		speechService.transcript.push(text);
		speechEvent.lastSentence = text;
		speechEvent.transcript = speechService.transcript;
		//dispatchEvent( speechEvent )
		//console.log('onResult', speechService.transcript) 
	},

	onEnd: function (event) {
		console.log('onEnd', event)

		/* let trns = speechService.transcript[ speechService.transcript.length -1 ];
		speechEvent.fullTranscript = trns;
		
		//dispatchEvent(speechEvent);
		if (!speechService.apiStopped) speechService.api.start();
		console.log('fullTranscript', speechEvent.fullTranscript) */
	},

	getAPI: function (options) {

		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) throw new Error('Speech Recognition does not exist on this browser. Use Chrome or Firefox');
		if (!SpeechRecognition) return;

		const recognition = new SpeechRecognition();

		recognition.interimResults = options.interimResults ? options.interimResults : true;
		recognition.continuous = options.continous ? options.continous : false;
		recognition.lang = options.lang ? options.lang : 'en-US';
		recognition.maxAlternatives = options.maxAlternatives ? options.maxAlternatives : 1;

		//recognition.addEventListener('end', speechService.onEnd)
		recognition.addEventListener('result', speechService.onResult)

		return recognition;
	}

};