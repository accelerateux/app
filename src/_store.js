
import { createStore } from 'vuex';

import { navigation } from '@/Shared/_store/navigation.module';
import { alerts } from '@/Shared/_store/alerts.module';
import { speech } from '@/Shared/_store/speech.module';
import { nlp } from '@/Shared/_store/nlp.module';
import { home } from  '@/Home/_store/home.module';

export const store = createStore({
  modules: {
    navigation: navigation,
    alerts: alerts,
    speech: speech,
    nlp: nlp,
    home: home
  }
});