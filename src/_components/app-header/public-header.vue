<template>
  <div class="ds-header">
    <div class="ds-header__nav">
      <div class="fds-level fds-level--justify-right fds-level--gutter-m fds-m-r--m">
        <span v-for="item in NAV_DATA.main" :key="item.uid" :data-control-id="item.uid">
          <a @click.prevent="navigateTo(item.path)" :href="basePath + item.path" class="ds-header__link">{{ item.label }}</a>
        </span>
        <span class="fds-p-l--s fds-p-r--s">|</span>
        <span v-for="item in NAV_DATA.side" :key="item.uid" :data-control-id="item.uid">
          <a @click.prevent="navigateTo(item.path)" :href="basePath + item.path" class="ds-header__link">{{ item.label }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from "@/_composables/useNavigation";

export default {

  props: {
    NAV_DATA: Object,
  },

  setup(props) {
    const auth = getAuth();

    const { goto } = useNavigation();
    let baseUrl = import.meta.env.BASE_URL.substring(0, import.meta.env.BASE_URL.length - 1)
    const basePath = ref( baseUrl );

    const navigateTo = (_path) => {
      if(_path=='/logout'){
        signOut(auth).then(()=>{
          goto('/login');
        });
      } else {
        goto(_path)
      }
    }

    return {
      goto,
      basePath,
      navigateTo
    }
  }
}
</script>