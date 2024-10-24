<template>
  <div class="home-third-body">
    <div class="left-content">
      <p class="fade-in first">NOODLE만이 가능한</p>
      <p class="fade-in second">개발자들을 위한 혁신</p>
    </div>

    <div class="right-content" :class="{ 'fade-up': showRightContent, 'hidden': !showRightContent }">
      <div class="image-container"></div>
      <div class="text-container">
        <p>NOODLE은 개발자들이 개발에만 몰두할 수 있도록</p>
        <p>업무의 Backlog를 자동 생성하여 개발 업무의 혁신을 꿈꿉니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeThird',
  data() {
    return {
      showRightContent: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.showRightContent = true;
    }, 1800); // 1.8초 후 (0.8초 딜레이 + 1초 애니메이션)
  }
};
</script>

<style scoped>
.home-third-body {
  display: flex;
  background-color: #040202;
  width: 100%;
  height: 100vh;
}

.left-content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 100px;
  padding-bottom: 100px;
  position: relative;
  overflow: hidden;
}

.left-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/images/fixed/homethird_image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
}

.left-content p {
  font-size: 65px;
  font-weight: bold;
  color: #fff;
  z-index: 2;
}

.right-content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
}

.image-container {
  width: 80%;
  height: 50%;
  background-image: url('@/assets/images/fixed/1212.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
}

.text-container {
  color: #fff;
  font-size: 23px;
  font-weight: bold;
  padding-bottom: 50px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

.first {
  animation-delay: 0s;
}

.second {
  animation-delay: 0.8s;
}

.hidden {
  opacity: 0;
  visibility: hidden;
}

.fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease-out forwards;
  visibility: visible;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
