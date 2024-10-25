<template>
  <div class="home-third-body" ref="homeThird">
    <div class="left-content">
      <p id="first-text" 
        data-aos="fade-in" 
        data-aos-duration="2000">NOODLE만이 가능한</p>
      <p id="second-text" 
        data-aos="fade-in"
        data-aos-delay="1000"
        data-aos-anchor="#first-text"
        data-aos-duration="2000">개발자들을 위한 혁신</p>
    </div>

    <div class="right-content" 
        data-aos="fade-up" 
        data-aos-delay="1500"
        data-aos-anchor="#second-text"
        data-aos-duration="1500">
      <div class="image-container"></div>
      <div class="text-container">
        <p>NOODLE은 개발자들이 개발에만 몰두할 수 있도록</p>
        <p>업무의 Backlog를 자동 생성하여 개발 업무의 혁신을 꿈꿉니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';

export default {
  name: 'HomeThird',

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

</style>
