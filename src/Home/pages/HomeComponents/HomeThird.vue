<template>
<div class="home-third">
  <div class="home-third-body">

    <div class="content-container" data-aos="fade-left">
      <v-card class="content-image" id="github-image"></v-card>
      <div class="text-container">
        <p class="number-icon">1</p>
        <div class="text-title-container">
          <p class="text-title">편리한 기능을 손쉽게 이용</p>
          <p class="text-subtitle">누구든, 복잡한 회원가입 절차 없이 이용할 수 있도록</p>
        </div>
        <div class="text-content-container">
          <p class="text-content">NOODLE에서는 복잡한 회원가입 절차 없이 누구나 쉽게 서비스를</p>
          <p class="text-content">이용할 수 있도록 GitHub Login만으로 서비스를 이용하실 수 있습니다.</p>
        </div>
      </div>
    </div>


    <div class="content-container" data-aos="fade-right">
      <div class="text-container">
        <p class="number-icon">2</p>
        <div class="text-title-container">
          <p class="text-title">보고서를 간편하게 검색</p>
          <p class="text-subtitle">원하는 보고서를 쉽게 검색할 수 있도록</p>
        </div>
        <div class="text-content-container">
          <p class="text-content">오랜 기간동안 쌓여온 보고서들 중에서 내가 원하는 보고서를 찾는 건</p>
          <p class="text-content">어려운 일이죠. NOODLE에선 검색을 통해 쉽게 찾을 수 있습니다.</p>
        </div>
      </div>
      <v-card class="content-image" id="search-image"></v-card>
    </div>


    <div class="content-container" data-aos="fade-left">
      <v-card class="content-image" id="backlog-image"></v-card>
      <div class="text-container">
        <p class="number-icon">3</p>
        <div class="text-title-container">
          <p class="text-title">혁신적인 Backlog자동 생성</p>
          <p class="text-subtitle">개발자들과 원활한 협업을 할수 있도록</p>
        </div>
        <div class="text-content-container">
          <p class="text-content">개발자와 협업이 필요하거나 개발자들끼리 협업을 할 때</p>
          <p class="text-content">GitHub와의 연동을 통해 Project Code를 분석하여</p>
          <p class="text-content">자동으로 Backlog를 생성해드리는 혁신적인 서비스를 제공합니다.</p>
        </div>
      </div>
    </div>


    <div class="content-container" data-aos="fade-right">
      <div class="text-container">
        <p class="number-icon">4</p>
        <div class="text-title-container">
          <p class="text-title">AI를 통한 보고서 자동 생성</p>
          <p class="text-subtitle">누구든, 업무에만 집중할 수 있도록</p>
        </div>
        <div class="text-content-container">
          <p class="text-content">AI가 GitHub에 저장된 Code와 생성된 Backlog를 바탕으로 </p>
          <p class="text-content">Project의 정량적 보고서를 자동으로 생성해드립니다.</p>
        </div>
      </div>
      <v-card class="content-image" id="report-image"></v-card>
    </div>

    

  </div>
</div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomeTHird',
};
</script>

<style scoped>
.home-third{
  width: 100%;
  height: 350vh;
  background-color: #080808;
  display: flex;
  justify-content: center;
}


.home-third-body {
  width: 70%;
  height: 100%;
  display: flex;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  /* gap: 1%; */

}

.content-container{
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
}

.content-image{
  width: 50%;
  height: 60%;
  border-radius: 25px;
}

#github-image{
  background-image: url('@/assets/images/fixed/github_logo2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#search-image{
  background-image: url('@/assets/images/fixed/search.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#backlog-image{
  background-image: url('@/assets/images/fixed/create_backlog.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#report-image{
  background-image: url('@/assets/images/fixed/create_report.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.text-container{
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
}

.number-icon {
  font-size: 40px;
  font-weight: bold;
  color: #080808;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.text-title{
  font-size: 50px;
  font-weight: bold;
  color: #ffffff;
}

.text-subtitle{
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
}

.text-content{
  font-size: 20px;
  /* font-weight: bold; */
  color: #ffffff;
}
</style>
