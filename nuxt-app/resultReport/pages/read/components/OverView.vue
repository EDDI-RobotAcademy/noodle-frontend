<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">개요</h2>
    <v-list class="overview">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ formattedOverview }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'overview',
  props: {
    overview: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedOverview() {
      return this.overview ? `『${this.overview}』` : '';
    }
  }
})
</script>

<style>
.overview {
  background-color: #525252;
  color: #ffffff;
  border-radius: 12px;
}

.v-list-item-title {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
</style>