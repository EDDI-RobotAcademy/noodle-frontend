<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">주요 기능</h2>
    <v-list rounded outlined elevation="8" dense class="features-list">
      <v-list-item v-for="(feature, index) in features" :key="index">
        <v-list-item-content>
          <div v-html="feature" class="markdown-preview mt-4"></div>
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

<style>
.features-list {
  background-color: #525252;
  color: #ffffff;
}
</style>