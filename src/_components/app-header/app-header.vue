<template>
  <div class="ds-header">
    <div class="ds-header__nav">
      <div class="fds-level fds-level--justify-right fds-level--gutter-m fds-m-r--m">
        <span>
          <a @click.prevent="goto('/profile')" :href="basePath + '/profile'" class="ds-header__link">Profile</a>
        </span>
        <span>
          <a @click.prevent="goto('/logout')" :href="basePath + '/logout'" class="ds-header__link">Logout</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useNavigation } from "@/_composables/useNavigation";

export default {

  setup(props) {

    const { goto } = useNavigation();
    let baseUrl = import.meta.env.BASE_URL.substring(0, import.meta.env.BASE_URL.length - 1)
    const basePath = ref( baseUrl );

    return {
      goto,
      basePath
    }
  }
}
</script>