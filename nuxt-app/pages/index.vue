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
import HomeTitleSection from './components/HomeMain.vue';
import HomeContentSection1 from './components/HomeSecond.vue';
import HomeContentSection2 from './components/HomeThird.vue';
import HomeContentSection3 from './components/HomeFourth.vue';
import HomeContentSection4 from './components/HomeFifth.vue';

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ThirdHomeView',
    components: {
        HomeTitleSection,
        HomeContentSection1,
        HomeContentSection2,
        HomeContentSection3,
        HomeContentSection4,
    },
    setup() {
        onMounted(() => {
            AOS.init({
                duration: 1000
            })
        })
    }
})
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