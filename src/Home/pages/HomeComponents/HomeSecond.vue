<template>
  <div class="home-second-body">
    <div class="left-area-body">
      <div class="left-area" data-aos="fade-right" ref="leftArea">
        <div class="text-area">
          <p>NOODLE에서는</p>
          <p>이런 서비스를 이용하실 수 있어요.</p>
        </div>
        <div class="left-card-area">
          <v-card>
            <div class="image-container">
              <v-img src="@/assets/images/fixed/github_logo2.png" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-content-title">
                  <p>GitHub 연동</p>
                </div>
                <div class="image-content-text">
                  <p>GitHub와 연동을 통해 별도의 회원가입 없이</p>
                  <p>GitHub 아이디만으로 프로젝트를 관리할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card>
            <div class="image-container">
              <v-img src="@/assets/images/fixed/search.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-content-title">
                  <p>생성된 보고서 검색</p>
                </div>
                <div class="image-content-text">
                  <p>생성한 프로젝트 보고서를 쉽게 검색하여 확인할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
    <div class="right-area-body">
      <div class="right-area" data-aos="fade-left" ref="rightArea">
        <div class="right-card-area">
          <v-card>
            <div class="image-container">
              <v-img src="@/assets/images/fixed/create_backlog.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-content-title">
                  <p>Backlog 생성</p>
                </div>
                <div class="image-content-text">
                  <p>Github의 Repository와 Branches 별로 Backlog를</p>
                  <p>자동 생성 및 관리할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card>
            <div class="image-container">
              <v-img src="@/assets/images/fixed/create_report.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-content-title">
                  <p>Project Report 생성</p>
                </div>
                <div class="image-content-text">
                  <p>개발자들의 업무 생산성을 높이기 위해 Project Report의</p>
                  <p>초안 작성 및 관리를 도와드립니다.</p>
                </div>
              </div>
            </div>
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
  justify-content: flex-end;
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
    margin-right: 10%;
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

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,
                                          rgba(0, 0, 0,0.5) 50%,
                                          rgb(0, 0, 0,0.7) 60%,
                                          rgb(0, 0, 0,0.8) 70%,
                                          rgb(0, 0, 0,1) 80%,
                                          rgb(0, 0, 0,1) 90%,
                                          rgb(0, 0, 0,1) 100%);
}

.text-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 0;
  padding: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 25px; /* 제목과 본문 사이의 간격 */
}

.image-content-title {
  color: #fff;
  font-size: 23px;
  font-weight: bold;
}

.image-content-text p {
  color: #fff;
  font-size: 17px;
  margin: 0; /* 문단 사이의 기본 마진 제거 */
  line-height: 1.4; /* 줄 간격 조절 */
}

.v-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-container:hover .v-img {
  transform: scale(1.05);
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
