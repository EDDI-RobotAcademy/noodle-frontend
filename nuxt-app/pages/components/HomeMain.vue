<template>
  <div class="home-main-body">
    <div class="content-area">
      <div class="title-area">
        <transition name="fade-down">
          <p class="main-title" :class="{ 'visible': showElements }">NOODLE</p>
        </transition>
        <div>
          <p class="sub-title">{{ typedText }}<span class="cursor">_</span></p>
        </div>
        <transition name="fade">
          <div class="sub-introduce" :class="{ 'visible': showElements }">
            <p>AI를 활용하여 업무의 효율을 높이는 세상</p>
          </div>
        </transition>
      </div>
    </div>
    <RecentReport class="recentreport" :class="{ 'fade-in': showElements }" />
    <ScrollAnimation class="scrollanimation" :class="{ 'fade-in': showElements }" @click="goToHomeSecond" />
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css';
import { defineComponent, getCurrentInstance, onMounted, ref, nextTick } from 'vue';
import RecentReport from './RecentReport.vue';
import ScrollAnimation from './ScrollAnimation.vue';

export default defineComponent({
  name: 'HomeMain',
  components: {
    RecentReport,
    ScrollAnimation,
  },
  setup() {
    const { emit } = getCurrentInstance()

    const fullText = ref('Use Your Noodle!')
    const typedText = ref('')
    const typeIndex = ref(0)
    const showElements = ref(false)

    function typeText() {
      if (typeIndex.value < fullText.value.length) {
        typedText.value += fullText.value.charAt(typeIndex.value)
        typeIndex.value++
        setTimeout(typeText, 80)
      } else {
        showElements.value = true
        nextTick(() => {
          AOS.refresh()
        })
      }
    }
    function goToHomeSecond() {
      emit('scroll-to-home-second')
    }

    onMounted(() => {
      typeText()
    })

    return {
      fullText,
      typedText,
      typeIndex,
      showElements,

      typeText,
      goToHomeSecond
    }
  }
})
</script>

<style scoped>
.home-main-body {
  background-image: url('/fixed/main.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: moveBackgroundX 30s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--navigation-bar-height));
  width: 100vw;
  overflow: hidden;
  position: relative;
}

@keyframes moveBackgroundX {
  0% {
    background-position: 0% center;
  }

  100% {
    background-position: 100% center;
  }
}

.content-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72.5vh;
  width: 40%;
  margin-left: 10%;
  margin-top: 20vh;
}

.title-area {
  height: 30vh;
  width: 100%;
  text-align: left;
}

.main-title {
  color: rgb(255, 240, 30);
  font-size: 8vw;
  animation: fadeDown 0.8s ease-out;
  line-height: 1;
  margin: 0;
  padding: 0;
}

.sub-title {
  color: #ffffff;
  font-size: 3.5vw;
  margin: 0;
  padding: 0;
}

.sub-introduce {
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
}

.cursor {
  display: inline-block;
  width: 0.5em;
  animation: blink 0.7s infinite;
  font-weight: bold;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-down-enter-active {
  transition: all 0.8s ease-out;
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.searchbox,
.recentreport,
.main-title,
.sub-introduce,
.scrollanimation {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.searchbox.fade-in,
.recentreport.fade-in,
.main-title.visible,
.sub-introduce.visible,
.scrollanimation.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.scrollanimation {
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 6s ease 0s infinite;
  animation-delay: 5s;
}

@keyframes bounce {

  0%,
  10%,
  20%,
  95%,
  100% {
    transform: translateY(0);
  }

  5%,
  15% {
    transform: translateY(-10px);
  }
}

@media (max-width: 1200px) {
  .content-area {
    width: 60%;
    margin-left: 5%;
  }

  .main-title {
    font-size: 10vw;
  }

  .sub-title {
    font-size: 4vw;
  }
}

@media (max-width: 768px) {
  .content-area {
    width: 80%;
    margin-left: 5%;
  }

  .main-title {
    font-size: 12vw;
  }

  .sub-title {
    font-size: 5vw;
  }

  .sub-introduce {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .content-area {
    width: 90%;
    margin-left: 5%;
    margin-top: 10vh;
  }

  .main-title {
    font-size: 14vw;
  }

  .sub-title {
    font-size: 6vw;
  }

  .sub-introduce {
    font-size: 0.9rem;
  }

  .scrollanimation {
    bottom: 3vh;
  }
}
</style>