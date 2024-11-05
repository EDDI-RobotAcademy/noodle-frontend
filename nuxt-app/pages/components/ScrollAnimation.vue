<template>
  <!-- <a class="scroll" href="#">If you want to know more about NOODLE</a> -->
  <a class="scroll" href="#">Read more</a>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScrollAnimation'
})
</script>

<style scoped>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.scroll {
  position: relative;
  display: block;
  font-size: 0.933rem;
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  padding: 10px 10px 10px 40px;
}

.scroll::before {
  display: block;
  position: absolute;
  top: -2px;
  left: 0;
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 12px;
  content: "";
}

.scroll::after {
  display: block;
  position: absolute;
  top: 9px;
  left: 11px;
  width: 2px;
  height: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 1px;
  content: "";
  animation-name: scroll;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 2s;
}

@keyframes scroll {
  0% {
    opacity: 1;
    height: 8px;
  }

  20% {
    opacity: 1;
    height: 8px;
  }

  30% {
    transform: translateY(0);
    opacity: 1;
    height: 19px;
  }

  40% {
    opacity: 1;
  }

  80% {
    transform: translateY(19px);
    opacity: 0;
    height: 0;
  }

  81% {
    transform: translateY(0);
    opacity: 0;
    height: 8px;
  }

  100% {
    opacity: 1;
    height: 8px;
  }
}

/* 반응형 디자인 추가 */
@media (max-width: 768px) {
  .scroll {
    font-size: 0.8rem;
    padding: 8px 8px 8px 32px;
  }

  .scroll::before {
    width: 20px;
    height: 30px;
  }

  .scroll::after {
    top: 7px;
    left: 9px;
    width: 1.5px;
    height: 6px;
  }
}

@media (max-width: 480px) {
  .scroll {
    font-size: 0.7rem;
    padding: 6px 6px 6px 25px;
  }

  .scroll::before {
    width: 16px;
    height: 24px;
  }

  .scroll::after {
    top: 5px;
    left: 7px;
    width: 1px;
    height: 4px;
  }
}
</style>
