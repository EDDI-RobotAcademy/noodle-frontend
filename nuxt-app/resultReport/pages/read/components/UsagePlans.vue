<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">활용 방안</h2>
    <v-list dense rounded outlined elevation="8" class="usage-plans">
      <v-list-item v-for="(usage, index) in usagePlans" :key="index">
        <v-list-item-content>
          <v-list-item class="mt-2">{{ usage.description }}</v-list-item>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsagePlans',
  props: {
    usagePlans: {
      type: Array,
      required: true
    }
  }
})
</script>

<style>
.usage-plans {
  background-color: #525252;
  color: #ffffff;
}
</style>