
import { createStore } from 'vuex';

import { navigation } from '@/Shared/_store/navigation.module';
import { alerts } from '@/Shared/_store/alerts.module';
import { speech } from '@/Shared/_store/speech.module';

export const store = createStore({
  modules: {
    navigation: navigation,
    alerts: alerts,
    speech: speech
  }
});