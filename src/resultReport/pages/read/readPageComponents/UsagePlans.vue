<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">활용 방안</h2>
    <v-list dense>
      <v-list-item v-for="(usage, index) in usagePlans" :key="index">
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ usage.title }}</v-list-item-title>
          <v-list-item-title class="mt-2">{{ usage.description }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
export default {
  name: 'UsagePlans',
  props: {
    usagePlans: {
      type: Array,
      required: true
    }
  }
}
</script>