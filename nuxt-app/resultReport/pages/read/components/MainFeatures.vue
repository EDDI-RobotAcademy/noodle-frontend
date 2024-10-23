<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">주요 기능</h2>
    <v-list dense>
      <v-list-item v-for="(feature, index) in features" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ feature }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainFeatures',
  props: {
    features: {
      type: Array,
      required: true
    }
  }
})
</script>