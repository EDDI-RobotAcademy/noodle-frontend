<template>
  <v-app>
    <!-- <SurveyButton v-if="$route.name == 'HomeView' || $route.name == 'projectManage'"/> -->
    <navigation-menu-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationMenuBar from './navigationBar/NavigationMenuBar.vue'

export default defineComponent({
  components: {NavigationMenuBar}, 
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>

<style>
:root {
  --navigation-bar-height: 70px;
}
</style>
