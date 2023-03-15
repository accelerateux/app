<template>
    <div>
      <baseHeader USE_SEARCH="false"></baseHeader>

      <main id="main-content" tabindex="-1">
        <div class="fds-section">
          <div class="fds-section__bd">

            <div class="fds-breadcrumb fds-hide">
              <nav class="fds-breadcrumb__nav" aria-label="Breadcrumbs">
                <ol class="fds-breadcrumb__list">
                  <li class="fds-breadcrumb__item">
                    <a class="fds-breadcrumb__link" href="/link.html">Inspections</a>
                  </li>
                  <li class="fds-breadcrumb__item" aria-current="page">
                    <a class="fds-breadcrumb__link" href="/link.html">Inspection Detail</a>
                  </li>
                </ol>
              </nav>
            </div>
            <div class="fds-level@m fds-level--justify-between">
              <h1 class="fds-m--none">Dashboard</h1>
              <div class="fds-level fds-level--justify-between fds-level--grow-auto fds-hide">
                <span>
                  <button class="fds-btn fds-btn--fill fds-btn--secondary" type="button">
                    <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    Edit
                  </button>
                </span>
                <span>
                  <button class="fds-btn fds-btn--fill fds-btn--primary" type="button">
                    <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg>
                    Start
                  </button>
                </span>
              </div>
            </div>

          </div>
        </div>

        <div class="fds-section">
          <div class="fds-section__bd">

            

            <div class="fds-m-t--l">
              
              <div class="fds-grid">
                <div class="fds-grid__1/1 fds-grid__1/2@l">
                
                  <h3>Transcript</h3>
                  <textarea class="fds-textarea" name="Name" placeholder="Transcript" rows="8">{{ fullTranscript }}</textarea>
                  <div class="fds-m-t--m">
                    
                    <div class="fds-level fds-level--gutter-m">
                      <button @click="startListen()" type="button" class="fds-btn fds-btn--plain fds-p--s fds-radius--full fds-bg--tertiary-100 fds-color--primary fds-link:hover--primary fds-bg:hover--primary-100" title="Start Recording Audio" aria-label="Start Recording Audio">
                        <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" fill="#494440" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></svg>
                      </button>
                    
                      <button @click="stopListen()" type="button" class="fds-btn fds-btn--plain fds-p--s fds-radius--full fds-bg--tertiary-100 fds-color--red fds-link:hover--red fds-bg:hover--red-100" title="Stop Recording Audio" aria-label="Stop Recording Audio">
                        <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" fill="#494440" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"></path></svg>
                      </button>

                      <button @click="analyzeTranscript()" type="button" class="fds-btn fds-btn--secondary" title="Analyze Transcript" aria-label="Analyze Transcript">Analyze</button>
                    </div>
                  </div>

                </div>
                <div class="fds-grid__1/1 fds-grid__1/2@l">
                  <div>
                    <h3>Sentiment Score</h3>
                    <div class="fds-field">
                    <input v-model="sentimentScore" class="fds-input fds-field__item" id="sentimentScore-id" aria-required="true" name="sentimentScore-id" type="text">
                    </div>
                    <h3>Positive Words</h3>
                    <textarea class="fds-textarea" name="Name" placeholder="Sentiment" rows="3">{{ positiveWords }}</textarea>
                    <h3>Negative Words</h3>
                    <textarea class="fds-textarea" name="Name" placeholder="Sentiment" rows="3">{{ negativeWords }}</textarea>

                  </div>
                  
                </div>
              </div>
              
            </div>

          
          </div>
        </div>
        <div class="fds-section">
          <div class="fds-section__bd">
            <div id="markUpId" class="fds-m-t--l">
            </div>
          </div>
        </div>


      </main>
      <baseFooter></baseFooter>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
import { useNavigation } from "@/_composables/useNavigation";
//import { v4 as uuidv4 } from "uuid";

const baseHeader = defineAsyncComponent(() => import("@/_partials/BaseHeader.vue"));
const baseFooter = defineAsyncComponent(() => import("@/_partials/BaseFooter.vue"));

export default {
  components: {
    baseHeader,
    baseFooter
  },

  setup(props) {
    const baseUrl = ref(import.meta.env.BASE_URL);
    const store = useStore();
    const { goto } = useNavigation();

    const fullTranscript = computed(() => store.getters["speech/getTranscript"]);
    const nlpReport = computed(() => {
      let data = store.getters['nlp/getCurrentReport'];
      if(data) return data;
      else return null;
    });
    const sentimentScore = ref();
    const positiveWords = ref();
    const negativeWords = ref();
    const calculation = ref();
    const markedUpText = computed(() => {
      let data = store.getters['nlp/getMarkup'];
      if(data){
        doMarkup(data)
      } else {
        return null;
      }
    });

    const speechHandler = ( _evt ) => {
      let loudNoises = _evt.fullTranscript;
      console.log('loud noises!! ',loudNoises)
    }
  
    const startListen = () => {
      store.dispatch('speech/startSpeechAPI'); 
    }

    const stopListen = () => {
      store.dispatch('speech/stopSpeechAPI');

    }

    //const transcriptSentiment = ref('')
    
    const analyzeTranscript = () => {
      store.dispatch(
        'nlp/analyzePhrase',
        {
          transcript: fullTranscript.value,
          options: { extras: { 'cats': 5, 'amazing': 2 } }
        }
      );
      store.dispatch(
        'nlp/setMarkedUpText',
        {
          transcript: fullTranscript.value
        }
      );
    }

    const doMarkup = (_html=null) => {
      if(_html){
        let prnt = document.getElementById('markUpId');
        prnt.innerHTML = _html; 
      }
    }

    watch( nlpReport, (value) => {
      console.log('value',value);
      sentimentScore.value = (value.score > 0 ? 'Positive':'Negative') + ' - ('+(value.score*100)+')';
      positiveWords.value = value;
      negativeWords.value = value;
    })

    onBeforeMount(()=>{
      store.dispatch('speech/createSpeechAPI', {continous: true});
    })

    onMounted(()=>{
      document.body.addEventListener('speechEvent', speechHandler)
    });

    return {
      baseUrl,
      goto,
      startListen,
      stopListen,
      fullTranscript,
      analyzeTranscript,
      sentimentScore,
      positiveWords,
      negativeWords,
      markedUpText,
      doMarkup
    };
  }
};
</script>
