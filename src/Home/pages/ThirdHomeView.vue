<template>
  <div id="Home_main">
    <section id="HomeMain">
      <HomeMain @scroll-to-home-second="goToHomeSecond" />
    </section>
    <section id="HomeSecond">
      <HomeSecond />
    </section>
    <section id="Home_content_section2">
      <HomeContentSection2 />
    </section>
    <section id="Home_content_section3">
      <HomeContentSection3 />
    </section>
    <section id="Home_content_section4">
      <HomeContentSection4 />
    </section>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeMain from '@/Home/pages/HomeComponents/HomeMain.vue';
import HomeSecond from '@/Home/pages/HomeComponents/HomeSecond.vue';
import HomeContentSection2 from '@/Home/pages/HomeComponents/HomeThird.vue';
import HomeContentSection3 from '@/Home/pages/HomeComponents/HomeFourth.vue';
import HomeContentSection4 from '@/Home/pages/HomeComponents/HomeFifth.vue';
import SearchBox from '@/Home/pages/HomeComponents/SearchBox.vue';

export default {
  name: 'ThirdHomeView',
  components: {
    HomeMain,
    HomeSecond,
    HomeContentSection2,
    HomeContentSection3,
    HomeContentSection4,
  },
  mounted() {
    AOS.init({
      duration: 1000, // 애니메이션 발동 총 시간
    });
  },
  methods: {
    goToHomeSecond() {
      const element = document.getElementById('HomeSecond');
      if (element) {
        const offset = 50; // 원하는 오프셋 값 (픽셀 단위)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* section {
  padding: 0 0 0 0;
  min-height: 100vh;
} */
</style>
