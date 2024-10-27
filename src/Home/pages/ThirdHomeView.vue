<template>
  <div id="Home_main">
    <section id="HomeMain">
      <HomeMain @scroll-to-home-second="goToHomeSecond" />
    </section>
    <section id="HomeSecond">
      <HomeSecond />
    </section>
    <section id="HomeThird">
      <HomeThird/>
    </section>
    <section id="HomeFooter">
      <HomeFooter />
    </section>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeMain from '@/Home/pages/HomeComponents/HomeMain.vue';
import HomeSecond from '@/Home/pages/HomeComponents/HomeSecond.vue';
import HomeThird from '@/Home/pages/HomeComponents/HomeThird.vue';
import HomeFooter from '@/Home/pages/HomeComponents/HomeFifth.vue';
import SearchBox from '@/Home/pages/HomeComponents/SearchBox.vue';

export default {
  name: 'ThirdHomeView',
  components: {
    HomeMain,
    HomeSecond,
    HomeThird,
    HomeFooter,
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
</style>
