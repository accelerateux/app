<template>
  <div>
    <public-header :NAV_DATA="navigationData"></public-header>

    <router-view></router-view>

  </div>
</template>
<script>
import { defineAsyncComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const publicHeader = defineAsyncComponent(() => import("@/_components/app-header/public-header.vue"));

export default {
  components: {
    publicHeader
  },

  setup(props) {

    const store = useStore();

    let baseUrl = import.meta.env.BASE_URL.substring(0, import.meta.env.BASE_URL.length - 1)
    const basePath = ref( baseUrl );

    const navigationData = computed(() => store.getters["navigation/getNavigationPublic"]);

    const emailId = ref(uuidv4());
    const passwordId = ref(uuidv4());


    onMounted(()=>{
      store.dispatch("navigation/setNavigationPublic");
    });
    
    return {
      basePath,
      navigationData,
      emailId,
      passwordId
    }
  }
}
</script>