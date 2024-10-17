<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">보완할 점</h2>
    <v-list dense>
      <v-list-item v-for="(improvement, index) in improvements" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ improvement }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
export default {
  name: 'ReportImprovements',
  props: {
    improvements: {
      type: Array,
      required: true
    }
  }
}
</script>