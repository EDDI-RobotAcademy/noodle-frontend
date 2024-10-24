<template>
  <div class="home-third-body" ref="homeThird">
    <div class="left-content">
      <p class="fade-in first" ref="firstText">NOODLE만이 가능한</p>
      <p class="fade-in second" ref="secondText">개발자들을 위한 혁신</p>
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
      showRightContent: false,
      animationStarted: false
    }
  },
  mounted() {
    const options = {
      threshold: 0.3, // 30% 가 보일 때
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationStarted) {
          this.startAnimation();
          this.animationStarted = true;
          observer.unobserve(entry.target); // 한 번 실행 후 관찰 중단
        }
      });
    }, options);

    observer.observe(this.$refs.homeThird);
  },
  methods: {
    startAnimation() {
      // 첫 번째 텍스트 애니메이션 시작
      this.$refs.firstText.style.animationPlayState = 'running';

      // 첫 번째 텍스트 애니메이션 완료 감지
      this.$refs.firstText.addEventListener('animationend', () => {
        this.$refs.secondText.style.animationDelay = '0s';
        this.$refs.secondText.style.animationPlayState = 'running';
      });

      // 두 번째 텍스트 애니메이션 완료 감지
      this.$refs.secondText.addEventListener('animationend', () => {
        this.showRightContent = true;
      });
    }
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
  animation-play-state: paused; /* 모든 애니메이션 일시 정지 상태로 시작 */
}

.first {
  animation-play-state: paused; /* first 클래스도 일시 정지로 시작 */
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
