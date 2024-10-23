<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">기술 스택</h2>
    <v-chip-group>
      <v-chip v-for="(tech, index) in techStack" :key="index" outlined>
        {{ tech }}
      </v-chip>
    </v-chip-group>
  </v-card-text>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TechStack',
  props: {
    techStack: {
      type: Array,
      required: true
    }
  }
})
</script>