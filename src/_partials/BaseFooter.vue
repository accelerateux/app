<template>
  <footer>
    <!-- <topper></topper> -->
<!--     <footer-body 
      APP_ABBR_NAME="AUX">
    </footer-body> -->
    <legal
      :COPYRIGHT="'Copyright - '+currentYear+' Accelerate UX'">
    </legal>
    
    <hiddenItems></hiddenItems>

  </footer>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
const topper = defineAsyncComponent(() => import("@/_components/footer/topper.vue"));
const footerBody = defineAsyncComponent(() => import("@/_components/footer/footer-body.vue"));
const legal = defineAsyncComponent(() => import("@/_components/footer/legal.vue"));
const hiddenItems = defineAsyncComponent(() => import("@/_components/hidden/hidden-items.vue"));

export default {
  
  components: {
    topper,
    footerBody,
    legal,
    hiddenItems
  },
  setup(){
    const currentYear = ref( new Date().getFullYear() );
    return {
      currentYear
    }
  }
}
</script>