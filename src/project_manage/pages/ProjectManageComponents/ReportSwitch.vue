<template>
  <div class="switch white">
    <input type="radio" id="switch-on" v-model="localChecked" value="Commit-List" />
    <input type="radio" id="switch-off" v-model="localChecked" value="Report" />
    <label for="switch-on">{{ leftLabel }}</label>
    <label for="switch-off">{{ rightLabel }}</label>
    <span class="toggle" :class="{ 'checked': localChecked }"></span>
  </div>
</template>

<script>
export default {
  name: 'ReportSwitch',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    leftLabel: {
      type: String,
      default: 'Commit-List'
    },
    rightLabel: {
      type: String,
      default: 'Report'
    }
  },
  computed: {
    localChecked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
</script>

<style scoped>
/* 스위치에 관한 설정 */
.switch {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 32px;
  height: var(--switch-height, 20px);
  position: relative;
  width: var(--switch-width, 60px);
  padding: 0 10px;
  transform: translateX(-80px);
}

/* 스위치 글자 관련 설정 */
.switch label {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: var(--switch-height, 20px);
  text-transform: uppercase;
  transition: color 0.2s ease;
  width: 35px;
}

.switch label:nth-of-type(1) {
  position: absolute;
  left: -85%;
  text-align: right;
}

.switch label:nth-of-type(2) {
  position: absolute;
  right: -70%;
  text-align: left;
}

.switch input {
  height: var(--switch-height, 20px);
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: var(--switch-width, 100px);
  z-index: 2;
}

.switch input:checked ~ label:nth-of-type(1) {
  color: #fff;
}

.switch input:checked ~ label:nth-of-type(2) {
  color: #808080;
}

.switch input~ :checked ~ label:nth-of-type(1) {
  color: #808080;
}

.switch input~ :checked ~ label:nth-of-type(2) {
  color: #fff;
}

.switch input:checked ~ .toggle {
  left: 10px;
}

.switch input~ :checked ~ .toggle {
  left: 40px;
}

.switch input:checked {
  z-index: 0;
}

.toggle {
  background: #4a4a4a;
  border-radius: 50%;
  height: calc(var(--switch-height, 20px) - 8px);
  left: 0;
  position: absolute;
  top: 4px;
  transition: left 0.2s ease;
  width: calc(var(--switch-height, 20px) - 8px);
  z-index: 1;
}

.toggle.checked {
  left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 20px) - 8px));
}
</style>