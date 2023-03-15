//import Sentiment from 'sentiment';
//import sentiment from 'wink-sentiment';

import { winkUtilities } from '@/Shared/_services/winkUtilities';
const { highlightParagraph } = winkUtilities();

// Load wink-nlp package.
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP( model, [ 'sbd','pos', 'sentiment' ] ); // 'sentiment'
const its = nlp.its;
const as = nlp.as;

let extraWords = {};

const getSentiment = (_payload, _callback) => {

  //let snt = new Sentiment();

  let phrase = _payload.transcript;
  let options = _payload.options || {};
  try {
    if(options.langStr){
      //snt.registerLanguage(options.langStr, options.langObj);
    }
    if(options.extras){
      //extraWords = options.extras
    }

    /* let report = snt.analyze( 
      phrase,
      extraWords
    ); */

    //let report = sentiment( phrase );
    let doc = nlp.readDoc( phrase );
    //
    let data = {
      score: doc.out(its.sentiment)
    };
    
    console.log('sent', data)
    _callback({ data: data });
    
  } catch (_err){
    console.log('catch', _err)
    _callback({ error: 'Error in NLP Service: ' + _err });
  }
  //snt.destroy();
}

const highlightSentences = (_payload, _callback) => {
  
  let paragraph = _payload.transcript;
  let doc = nlp.readDoc( paragraph );
  let results = highlightParagraph( doc, its, 20 );
  
  doc.sentences().each( (s, k) => s.markup( results.bTag(k), results.eTag() ));
  let markup = `<div class="wink-summary">${doc.out(its.markedUpText).replaceAll('\n','<br/>')}</div>`; //html
  _callback({ data: markup }); 
}

export const nlpService = {
  getSentiment: getSentiment,
  highlightSentences: highlightSentences
};