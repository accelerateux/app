<template>
  <header>

    <!--<disclaimer></disclaimer>-->
    <app-header></app-header>
    
  </header>
</template>

<script>
//import disclaimer from '@/_components/disclaimer/disclaimer.vue';
import appHeader from '@/_components/app-header/app-header.vue';

export default {

  components: {
    appHeader
  },

  setup(props){

    return {

    }
  }  
}
</script>
