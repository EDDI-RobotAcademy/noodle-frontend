<template>
  <v-card-title class="text-h4 font-weight-bold text-center pa-4">
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