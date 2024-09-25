<template>
  <v-app>
    <v-main>
      <SurveyButton />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SurveyButton from '@/floatingButton/pages/SurveyButton.vue'

export default defineComponent({
  components: {SurveyButton},
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
