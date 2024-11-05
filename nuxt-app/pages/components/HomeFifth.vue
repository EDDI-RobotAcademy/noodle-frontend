<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-logo-area">
        <img class="footer-noodle-logo" :src="'/fixed/NOODLE_logo.png'" alt="Noodle Logo" />
      </div>
      <div class="footer-content">
        <p>서울 금천구 가산디지털1로 25 18층 플레이데이터 (가산동 670)</p>
        <p>한재혁 | 김지민 | 이민재 | 이현석 | 최인헌</p>
        <p>SK-networks Family AI Camp 1st - Final Project 1Team</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeFooter',
})
</script>

<style scoped>
.footer {
  width: 100%;
  height: 15vh;
  background-color: rgb(31, 31, 31);
  text-align: center;
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.footer-logo-area {
  width: 12vh;
  height: 12vh;
  justify-content: center;
  align-items: center;
}

.footer-noodle-logo {
  width: 12vh;
  height: 12vh;
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 1.8vh;
  font-weight: bold;
  gap: 0.5vh;
}

@media screen and (max-width: 768px) {
  .footer-content {
    font-size: 1.5vh;
  }
  
  .footer-logo-area {
    width: 10vh;
    height: 10vh;
  }
  
  .footer-noodle-logo {
    width: 10vh;
    height: 10vh;
  }
}

@media screen and (max-width: 480px) {
  .footer-content {
    font-size: 1.2vh;
  }
  
  .footer-logo-area {
    width: 8vh;
    height: 8vh;
  }
  
  .footer-noodle-logo {
    width: 8vh;
    height: 8vh;
  }
}
</style>