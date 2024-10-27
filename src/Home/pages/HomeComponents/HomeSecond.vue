<template>
<div class="home-second">
  <div class="home-second-body">
    <div class="title-container">
        <p class="title">AI를 활용하여 업무의 효율을 높이는 세상.</p>
        <p class="sub-title">NOODLE이 고객에게 경험시켜드리고자 하는 것은 바로 이런 편리함입니다.</p>
    </div>
  <div class="content-area">
    <div class="content-container">
      <div class="content-title" data-aos="fade-up" data-aos-delay="100">
        <p>NOODLE에서는</p>
        <p>이런 서비스를 제공합니다.</p>
      </div>
      <div class="image-container">
        <div class="image-card-container">
        <v-card data-aos="fade-up" data-aos-delay="100">
            <div class="image-card">
              <v-img src="@/assets/images/fixed/github_logo2.png" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-card-title">
                  <p>GitHub 연동</p>
                </div>
                <div class="image-card-text">
                  <p>GitHub와 연동을 통해 별도의 회원가입 없이</p>
                  <p>GitHub 아이디만으로 프로젝트를 관리할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card data-aos="fade-up" data-aos-delay="300">
            <div class="image-card">
              <v-img src="@/assets/images/fixed/search.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-card-title">
                  <p>생성된 보고서 검색</p>
                </div>
                <div class="image-card-text">
                  <p>생성한 프로젝트 보고서를 쉽게 검색하여</p>
                  <p>확인할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card data-aos="fade-up" data-aos-delay="500">
            <div class="image-card">
              <v-img src="@/assets/images/fixed/create_backlog.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-card-title">
                  <p>Backlog 생성</p>
                </div>
                <div class="image-card-text">
                  <p>Github의 Repository와 Branches 별로 Backlog를</p>
                  <p>자동 생성 및 관리할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card data-aos="fade-up" data-aos-delay="700">
            <div class="image-card">
              <v-img src="@/assets/images/fixed/create_report.jpg" cover>
                <div class="gradient-overlay"></div>
              </v-img>
              <div class="text-container">
                <div class="image-card-title">
                  <p>Project Report 생성</p>
                </div>
                <div class="image-card-text">
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
      duration: 1100,
      once: true,
    });
  }
}
</script>

<style scoped>

.home-second{
  width: 100%;
  height: 90vh;
  background-color: #080808;
  display: flex;
    flex-direction: column;
  align-items: center;
  /* justify-content: center; */

}
.home-second-body {
  width: 80%;
  height: 100%;
  background-color: #080808;
}
.title-container{
  width: 100%;
  height: 300px;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 50px;
}

.title-container p{
  color: #ffffff;
  padding-left: 200px;
}

.title{
  font-size: 60px;
  font-weight: bold;
}

.sub-title{
  font-size: 25px;
  font-weight: bold;
}

.content-area{
  width: 100%;
  height: 845px;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* align-items 대신 justify-content 사용 */
  padding-bottom: 150px;
}
.content-container{
  width: 100%;
  height: 590px;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  gap:50px;
}

.content-title{
  width: 100%;
  height: 100px;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 200px;
}

.content-title p{
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
}

.image-container{
  width: 100%;
  height: 490px;
  background-color: #080808;
}

.image-card-container{
  width: 100%;
  height: 490px;
  display: flex;
  align-items: center;
  padding-left: 200px;
  gap: 60px;
}

.v-card {
  width: 500px;
  height: 500px;
  border-radius: 25px;
  background-color: #080808;  
}

.image-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 25px;
}

.gradient-overlay {
  position: absolute;
  /* width: 100%;
  height: 100%; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,
                                          rgba(0, 0, 0,0.5) 50%,
                                          rgb(0, 0, 0,0.7) 60%,
                                          rgb(0, 0, 0,0.8) 70%,
                                          rgb(0, 0, 0,0.9) 80%,
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

.image-card-title {
  color: #fff;
  font-size: 23px;
  font-weight: bold;
}

.image-card-text p {
  color: #fff;
  font-size: 17px;
  margin: 0; /* 문단 사이의 기본 마진 제거 */
  line-height: 1.4; /* 줄 간격 조절 */
}

.v-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  border-radius: 25px;
}

.image-card:hover .v-img {
  transform: scale(1.05);
}
</style>
