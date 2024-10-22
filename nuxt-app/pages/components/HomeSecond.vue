<template>
  <div class="home-second-body">
    <div class="left-area-body">
      <div class="left-area" data-aos="fade-right" ref="leftArea">
        <div class="text-area">
          <p>NOODLE은</p>
          <p>이런 서비스를 제공합니다.</p>
        </div>
        <div class="left-card-area">
          <v-card>
            <v-img src="/fixed/github_logo3.png" cover></v-img>
          </v-card>
          <v-card>
            <v-img src="/fixed/search.jpg" cover></v-img>
          </v-card>
        </div>
      </div>
    </div>
    <div class="right-area-body">
      <div class="right-area" data-aos="fade-left" ref="rightArea">
        <div class="right-card-area">
          <v-card>
            <v-img src="/fixed/create_backlog.jpg" cover></v-img>
          </v-card>
          <v-card>
            <v-img src="/fixed/create_report.jpg" cover></v-img>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';

export default defineComponent({
  name: 'HomeSecond',
  setup() {
    const leftArea = ref(null); // ref로 DOM 요소를 참조하기 위해 초기화
    const rightArea = ref(null); // ref로 DOM 요소를 참조하기 위해 초기화

    function handleScroll() {

      if (!leftArea.value || !rightArea.value) return

      const scrollPosition = window.scrollY
      const threshold = 400

      if (scrollPosition < threshold) {
        leftArea.value.classList.remove('aos-animate')
        rightArea.value.classList.remove('aos-animate')
      } else {
        leftArea.value.classList.add('aos-animate')
        rightArea.value.classList.add('aos-animate')
      }
    }

    onMounted(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 400
      })
      window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      leftArea,
      rightArea,

      handleScroll
    }
  }
});
</script>

<style scoped>
.home-second-body {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120vh;
  background-color: #080808;
}

.left-area-body {
  width: 30%;
  height: 100%;
}

.right-area-body {
  width: 30%;
  height: 100%;
}

.left-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-end;
  background-color: #080808;
}

.text-area {
  width: 70%;
  color: #fff;
  /* font-size: bold; */
  font-size: 25px;
  margin-top: 50px;
  margin-bottom: 30px;
}

.left-card-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 30px;
  gap: 30px;
}

.right-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #080808;
}

.right-card-area {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
  gap: 30px;
  justify-content: flex-end;

}

.v-card {
  width: 80%;
  height: 40%;
  border-radius: 20px;
}

.v-img {
  width: 100%;
  height: 100%;
  color: #fff;
}

/* .content-area{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  gap: 20px;

} */

/* .left-area{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
} */

/* .text-area-area{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

} */

/* .text-area{
  width: 100%;
  height: 7%;
  margin-left: 5%;
  text-align: left;
} */

/* .left-card{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding-top: 0;
  gap: 20px;
} */

/* .right-card-area{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  gap: 20px;
} */

/* .v-card{
  width: 70%;
  height: 100%;
  border-radius: 20px;
} */
</style>
