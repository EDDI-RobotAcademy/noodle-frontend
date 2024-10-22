<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">완성도</h2>
    <v-row v-for="(item, index) in completionRates" :key="index" class="mb-6" align="center">
      <v-col cols="4" class="text-center">
        <h3 class="mb-2">{{ item.label }}</h3>
        <svg :width="size" :height="size" class="progress-ring">
          <circle :stroke="'#e0e0e0'" :stroke-width="strokeWidth" fill="transparent" :r="radius" :cx="center"
            :cy="center" />
          <circle :stroke="item.color" :stroke-width="strokeWidth" fill="transparent" :r="radius" :cx="center"
            :cy="center" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset(item.rate)" />
          <text :x="center" :y="center" text-anchor="middle" :fill="item.color" font-size="20" font-weight="bold"
            dy=".3em">
            {{ item.rate }}%
          </text>
        </svg>
      </v-col>
      <v-col cols="8">
        <v-card-text class="pa-0">
          {{ completionFeedback[index] }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompletionRates',
  props: {
    completionRates: {
      type: Array,
      required: true
    },
    completionFeedback: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const radius = computed(() => {
      return (props.size / 2) - (props.strokeWidth / 2)
    })
    const center = computed(() => {
      return props.size / 2
    })
    const circumference = computed(() => {
      return 2 * Math.PI * radius.value
    })

    function dashOffset(rate) {
      return circumference.value - (rate / 100 * circumference.value)
    }

    return {
      radius,
      center,
      circumference,

      dashOffset,
    }
  }
})
</script>

<style scoped>
.progress-ring circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>