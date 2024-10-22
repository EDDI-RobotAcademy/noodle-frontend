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
            <v-img src="@/assets/images/fixed/github_logo3.png" cover>된당 히히</v-img>
          </v-card>
          <v-card>
            <v-img src="@/assets/images/fixed/search.jpg" cover>된당 히히</v-img>
          </v-card>
        </div>
      </div>
    </div>
    <div class="right-area-body">
      <div class="right-area" data-aos="fade-left" ref="rightArea">
        <div class="right-card-area">
          <v-card>
            <v-img src="@/assets/images/fixed/create_backlog.jpg" cover>된당 히히</v-img>
          </v-card>
          <v-card>
            <v-img src="@/assets/images/fixed/create_report.jpg" cover>된당 히히</v-img>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomeSecond',
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 400 // AOS효과가 시작되는 스크롤 위치에 대한 설정값(px단위로 조절이 되고 값이 커질수록 아래에서 시작됨(스크롤을 더 내야한다는 뜻))
    });
    
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const leftArea = this.$refs.leftArea;
      const rightArea = this.$refs.rightArea;
      
      if (!leftArea || !rightArea) return; // 요소가 없으면 함수 종료
      
      const scrollPosition = window.scrollY;
      const threshold = 400; // 안에 내용이 없어지는 스크롤 위치에 대한 값 (값이 커질 수록 더 아래에서부터 없어짐)

      if (scrollPosition < threshold) {
        leftArea.classList.remove('aos-animate');
        rightArea.classList.remove('aos-animate');
      } else {
        leftArea.classList.add('aos-animate');
        rightArea.classList.add('aos-animate');
      }
    }
  }
};
</script>

<style scoped>
.home-second-body {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120vh;
  background-color: #080808;
}

.left-area-body{
  width: 30%;
  height: 100%;
}

.right-area-body{
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
