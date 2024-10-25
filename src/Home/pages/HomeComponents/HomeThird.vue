<template>
  <div class="home-third-body">
    <div class="background-image-container">
      <div class="left-content" 
          data-aos="fade-in">
        <p>NOODLE만이 가능한</p>
        <p>개발자들을 위한 혁신</p>
      </div>
    </div>
    <div class="right-content" 
        data-aos="fade-up" 
        data-aos-delay="600"
        >
      <div class="image-container"></div>
      <div class="text-container">
        <p>NOODLE은 개발자들의 업무 효율을 높이기 위해</p>
        <p>Backlog를 자동으로 생성해드리는 서비스를 제공하여</p>
        <p>개발 업무의 혁신을 꿈꿉니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomeTHird',
  mounted() {
    AOS.init({
      once: false,
      duration: 2000,
      offset: 600,
    });
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

.background-image-container {
  width: 50%;
  height: 100%;
  position: relative;
}

.background-image-container::before {
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

.left-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 100px;
  padding-bottom: 100px;
  position: relative;
  overflow: hidden;
  z-index: 2;
}


.left-content p {
  font-size: 65px;
  font-weight: bold;
  color: #fff;
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
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 50px;
}

</style>
