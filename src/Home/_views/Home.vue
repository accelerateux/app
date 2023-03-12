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

            <div class="fds-level fds-level--gutter-m">
              
              <button @click="startListen()" type="button" class="fds-btn fds-btn--plain fds-p--s fds-radius--full fds-bg--tertiary-100 fds-color--primary fds-link:hover--primary fds-bg:hover--primary-100" title="Start Recording Audio" aria-label="Start Recording Audio">
                <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" fill="#494440" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></svg>
              </button>
            
              <button @click="stopListen()" type="button" class="fds-btn fds-btn--plain fds-p--s fds-radius--full fds-bg--tertiary-100 fds-color--red fds-link:hover--red fds-bg:hover--red-100" title="Stop Recording Audio" aria-label="Stop Recording Audio">
                <svg class="fds-icon fds-icon--size-2" aria-hidden="true" focusable="false" role="img" fill="#494440" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"></path></svg>
              </button>

              <button @click="analyzeTranscript()" type="button" class="fds-btn fds-btn--secondary" title="Analyze Transcript" aria-label="Analyze Transcript">Analyze</button>
                
            </div>

            <div class="fds-m-t--l">
              <h3>Transcript</h3>
              <textarea class="fds-textarea" name="Name" placeholder="Transcript" rows="8">{{ fullTranscript }}</textarea>
            </div>

            <div class="fds-m-t--l">
              <h3>Sentiment Analysis</h3>
              <textarea class="fds-textarea" name="Name" placeholder="Sentiment" rows="8">{{ transcriptSentiment }}</textarea>
            </div>
          

          </div>
        </div>
      </main>
      <baseFooter></baseFooter>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted, onBeforeMount, computed } from "vue";
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
    const transcriptSentiment = ref('')

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

    const analyzeTranscript = () => {
      
    }

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
      transcriptSentiment,
      analyzeTranscript
    };
  }
};
</script>
