<template>
  <div class="footer">
    <div class="footer-container">
    <div class="footer-logo-area">
      <img class="footer-noodle-logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="Noodle Logo" />
    </div>
    <div class="footer-content">
      <p>서울 금천구 가산디지털1로 25 18층 플레이데이터 (가산동 670)</p>
      <p>한재혁  |  김지민  |  이민재  |  이현석  |  최인헌</p>
      <p>SK-networks Family AI Camp 1st - Final Project 1Team</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter',
};
</script>

<style scoped>
.footer{
  width: 100%;
  height: 15vh;
  background-color: rgb(31, 31, 31);
  text-align: center;
}

.footer-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.footer-logo-area{
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
}

.footer-noodle-logo{
  width: 100px;
  height: 100px;
}

.footer-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
}
</style>