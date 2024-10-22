<template>
  <v-card-title class="text-h4 font-weight-bold text-center pa-4">
    {{ projectTitle }}
  </v-card-title>
</template>

<script>
export default {
  name: 'ProjectTitle',
  props: {
    projectTitle: {
      type: String,
      required: true
    }
  }
}
</script>