<template>
  <v-app>
    <navigation-menu-bar/>
    <v-main>
      <SurveyButton />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SurveyButton from '@/floatingButton/pages/SurveyButton.vue'
import NavigationMenuBar from './navigationBar/NavigationMenuBar.vue'

export default defineComponent({
  components: {SurveyButton, NavigationMenuBar},
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
