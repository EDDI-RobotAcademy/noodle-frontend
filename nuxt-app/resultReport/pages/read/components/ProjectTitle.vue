<template>
  <v-card-title class="text-h5 font-weight-bold text-center pa-4 no-truncate">
    {{ projectTitle }}
  </v-card-title>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectTitle',
  props: {
    projectTitle: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.no-truncate {
  white-space: nowrap;
  overflow: visible;
}
</style>