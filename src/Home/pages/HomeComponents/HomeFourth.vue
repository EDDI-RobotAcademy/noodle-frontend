<template>
  <div class="home-fourth-body">

    <div class="left-container"
          data-aos="fade-up"
          data-aos-delay="600">
      <div class="image-container"></div>
      <div class="text-container">
        <p>초기 구성</p>
        <p>초기 구성</p>
      </div>
    </div>


    <div class="right-container">
      <div class="background-image-container">
        <div class="right-content"
              data-aos="fade-in">
          <p>초기 구성</p>
          <p>초기 구성</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomeFourth',
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
.home-fourth-body {
  display: flex;
  background-color: #040202;
  width: 100%;
  height: 100vh;
}

.left-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 100%;
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
.right-container {
  width: 50%;
  height: 100%;
}

.background-image-container {
  width: 100%;
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
  background-image: url('@/assets/images/fixed/homethird_image_right.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
}

.right-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 100px;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.right-content p {
  font-size: 65px;
  font-weight: bold;
  color: #fff;
}
</style>