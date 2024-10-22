<template>
  <div id="Home_main">
    <section id="Home_title_section">
      <HomeTitleSection />
    </section>
    <section id="Home_content_section1">
      <HomeContentSection1 />
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
import HomeTitleSection from '@/Home/pages/HomeComponents/HomeMain.vue';
import HomeContentSection1 from '@/Home/pages/HomeComponents/HomeSecond.vue';
import HomeContentSection2 from '@/Home/pages/HomeComponents/HomeThird.vue';
import HomeContentSection3 from '@/Home/pages/HomeComponents/HomeFourth.vue';
import HomeContentSection4 from '@/Home/pages/HomeComponents/HomeFifth.vue';

export default {
  name: 'ThirdHomeView',
  components: {
    HomeTitleSection,
    HomeContentSection1,
    HomeContentSection2,
    HomeContentSection3,
    HomeContentSection4,
  },
  mounted() {
    AOS.init({
      duration: 1000, // 애니메이션 발동 총 시간
    });
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  padding: 0 0 0 0;
  min-height: 100vh;
}
</style>
