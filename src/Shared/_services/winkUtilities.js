//import { quantile } from "d3-array";

let _doc = {};
let _its = {};
let _percentage = .20;

const sentenceWiseNormalizedWeights = () => {
  // Define open class part-of-speeches; used to compute intitial information content
  const openClassPOS = Object.create(null);
  openClassPOS.ADJ = true;
  openClassPOS.ADV = true;
  openClassPOS.INTJ = true;
  openClassPOS.NOUN = true;
  openClassPOS.PROPN = true;
  openClassPOS.VERB = true;
  openClassPOS.NUM = true;
  openClassPOS.SYM = true;
  // N-gram to use to construct a pos group.
  const NGram = 4;
  // Used to build table of weights of pos groups. Apart from frequency, it also maintains
  // (a) array of sentences, where a given pos group was found, (b) total weight computed as
  // frequency minus count of closed class part-of-speech in the group.
  const posGroupWeightTable = Object.create( null );
  // Build pos group frequency table.
  _doc.sentences().each( s => {
    // Ignore punctuation and space (tab, CRLF etc).
    const pos = s.tokens().out( _its.pos ).filter( p => p !== 'SPACE' && p !== 'PUNCT' );
    // Ignore sentences where we cannot build NGram i.e. sentences shorter than NGram.
    if ( pos.length < 4 ) return;
    // Determine NGrams;
    for ( let k = 0; k+ NGram - 1 < pos.length; k += 1 ) {
      const pos4Gram = pos.slice( k, k + NGram );
      // Used to compute the weight for a pos group.
      const initInfoContent = pos4Gram.reduce(
        ( pv, cv ) => pv - ( ( openClassPOS[cv] ) ? 0 : 1 ),
        0 
      );
      const posGroup = pos4Gram.join( '_' );
  		posGroupWeightTable[ posGroup ] = posGroupWeightTable[ posGroup ] || Object.create( null );
      posGroupWeightTable[ posGroup ].group = posGroup;
      posGroupWeightTable[ posGroup ].sentences = posGroupWeightTable[ posGroup ].sentences || [];
      posGroupWeightTable[ posGroup ].sentences.push( s.index() );
      posGroupWeightTable[ posGroup ].weight = ( posGroupWeightTable[ posGroup ].weight === undefined ) ? 
                                                initInfoContent + 1 : 
                                                ( posGroupWeightTable[ posGroup ].weight + 1 );
      posGroupWeightTable[ posGroup ].iv = initInfoContent;
    }
  } );

  // Transform object into an array, and filter out elements with weight <= 0.
  const posGroupWeights = Object.keys( posGroupWeightTable )
    						.map( e => posGroupWeightTable[ e ] )
    						.filter( e => e.weight > 0 );
  // This is an array index by each sentence's index and would contain the total weight
  // computed by adding all the weights of each pos group found in that sentence.
  let sentenceWiseWeights = new Array( _doc.sentences().length() );
  sentenceWiseWeights.fill( 0 );
  posGroupWeights.forEach( pgw => {
    pgw.sentences.forEach( e => { sentenceWiseWeights[ e ] += pgw.weight } );
  });
  // Normalize weights by first halving weight and the dividing by the max.
  // Halving reduces the relative differnce between weights.
  sentenceWiseWeights = sentenceWiseWeights.map( e=>e/2 );
  const max = Math.max( ...sentenceWiseWeights );

  return sentenceWiseWeights.map( e => e / max );
}

const cutoff = 0.9466666666666668; //quantile(sentenceWiseNormalizedWeights, (100 - _percentage)/100)

const beginTag = ( k ) => {
  const a = (sentenceWiseNormalizedWeights()[k]>cutoff)? sentenceWiseNormalizedWeights[k]:0;
//  if (a) return `<mark class="highlight" style='background-color:rgba(0,175,137,${a});'>`
  if (a){
    if (a>0.9){
      return `<mark class="wink-highlight wink-hi-1">`
    } else if ( a > 0.75) {
      return `<mark class="wink-highlight wink-hi-2">`
    } else if ( a > 0.5) {
      return `<mark class="wink-highlight wink-hi-3">`
    } else {
      return `<mark class="wink-highlight wink-hi-4">`
    }
  }
  if (focus) return `<mark class="wink-focus">`;
  return `<mark>`
};

const endTag = () => {
  return `</mark>`;
};

const highlightParagraph = (_d, _i, _p) => {
  _doc = _d;
  _its = _i;
  _percentage = _p;
  
  return {
    bTag: beginTag,
    eTag: endTag
  }
}


export function winkUtilities() {
  return {
    highlightParagraph
  }
}
