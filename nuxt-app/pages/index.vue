<template>
    <!-- header -->
    <v-container class="header" fluid>
        <div class="header-content">
            <div class="search-wrapper" :class="{ active: isSearchActive }">
                <div class="input-holder">
                    <input type="text" class="search-input" placeholder="Use Your NOODLE!" />
                    <button class="search-icon" @click="searchToggle"><span></span></button>
                </div>
                <span class="close" @click="searchToggle"></span>
            </div>
            <h1 class="header-title">What we do?</h1>
            <div class="header-service-btn">
                <v-btn class="backlog-board-btn" :class="{ active: activeButton === 'backlog-board-btn' }"
                    @click="setActive('backlog-board-btn')" style="width: 155px; height: 40px;">
                    Backlog board
                </v-btn>
                <v-btn class="result-report-btn" :class="{ active: activeButton === 'result-report-btn' }"
                    @click="setActive('result-report-btn')" style="width: 155px; height: 40px;">
                    Result Report
                </v-btn>
            </div>
        </div>
    </v-container>

    <v-container class="body" fluid>
        <transition name="fade" mode="out-in">
            <v-container v-if="activeButton === 'backlog-board-btn'" key="backlog-board" class="introduce-card-area">
                <transition-group name="fade" tag="div" class="service-introduce-top">
                    <v-card class="introduce-card-top animated-card" v-if="showCards[0]" key="card1">
                        <div class="card-content">
                            <div class="introduce-card-top-image"
                                :style="{ backgroundImage: `url('/fixed/commit-list-image2.jpg')` }">
                            </div>
                            <div class="introduce-card-text-area-top">
                                <h2 class="introduce-card-title">Commit List up</h2>
                                <span class="introduce-card-content">GitHub와 연동을 통해 Repository / branches 별로 <br>Commit
                                    내역을 List up 해드립니다.</span>
                            </div>
                        </div>
                    </v-card>
                    <v-card class="introduce-card-top animated-card" v-if="showCards[1]" key="card2">
                        <div class="card-content">
                            <div class="introduce-card-top-image"
                                :style="{ backgroundImage: `url('/fixed/create-backlog-image.jpg')` }">
                            </div>
                            <div class="introduce-card-text-area-top">
                                <h2 class="introduce-card-title">Backlog 생성</h2>
                                <p class="introduce-card-content">Commit내역을 바탕으로 Project의 Backlog를 생성해드립니다.</p>
                            </div>
                        </div>
                    </v-card>
                </transition-group>
                <transition-group name="fade" tag="div" class="service-introduce-bottom">
                    <v-card class="introduce-card-bottom animated-card" v-if="showCards[2]" key="card3">
                        <div class="card-content">
                            <div class="introduce-card-bottom-image" :style="{
                                backgroundImage: `url('/fixed/go-to-service-image2.jpg')`,
                                cursor: 'pointer'
                            }">
                            </div>
                            <div class="introduce-card-text-area-bottom" @click="goToProjectManage"
                                :style="{ cursor: 'pointer' }">
                                <h2 class="introduce-card-title">NOODEL Service 이용하러 가기</h2>
                                <p class="introduce-card-content">버튼을 눌러 NOODLE의 Service를 이용해보세요!</p>
                            </div>
                        </div>
                    </v-card>
                </transition-group>
            </v-container>
            <v-container v-else key="result-report" class="introduce-card-area">
                <transition-group name="fade" tag="div" class="service-introduce-top">
                    <v-card class="introduce-card-top animated-card" v-if="showCards[0]" key="card1">
                        <div class="card-content">
                            <div class="introduce-card-top-image"
                                :style="{ backgroundImage: `url('/fixed/create-projectreport-image2.png')` }">
                            </div>
                            <div class="introduce-card-text-area-top">
                                <h2 class="introduce-card-title">Project Report</h2>
                                <span class="introduce-card-content">LLM을 통해 생성된 Backlog를 분석하여 Project Report를 생성해드립니다.
                                </span>
                            </div>
                        </div>
                    </v-card>
                    <v-card class="introduce-card-top animated-card" v-if="showCards[1]" key="card2">
                        <div class="card-content">
                            <div class="introduce-card-top-image"
                                :style="{ backgroundImage: `url('/fixed/level-of-completion-image2.jpg')` }">
                            </div>
                            <div class="introduce-card-text-area-top">
                                <h2 class="introduce-card-title">Project의 완성도 점검</h2>
                                <p class="introduce-card-content">생성된 Project Report를 바탕으로 Project의 완성도를 점검할 수 있습니다.</p>
                            </div>
                        </div>
                    </v-card>
                </transition-group>

                <transition-group name="fade" tag="div" class="service-introduce-bottom">
                    <v-card class="introduce-card-bottom animated-card" v-if="showCards[2]" key="card3">
                        <div class="card-content">
                            <div class="introduce-card-bottom-image" :style="{
                                backgroundImage: `url('/fixed/go-to-service-image2.jpg')`,
                                cursor: 'pointer'
                            }">
                            </div>
                            <div class="introduce-card-text-area-bottom" @click="goToProjectManage"
                                :style="{ cursor: 'pointer' }">
                                <h2 class="introduce-card-title">NOODEL Service 이용하러 가기</h2>
                                <p class="introduce-card-content">버튼을 눌러 NOODLE의 Service를 이용해보세요!</p>
                            </div>
                        </div>
                    </v-card>
                </transition-group>
            </v-container>
        </transition>
    </v-container>

    <!-- footer -->
    <v-container
        style="width:100%; height:10%; display:flex; justify-content: center; padding: 0; margin:0; background-color: rgba(99,99,99,0.993); gap:50px"
        fluid>
        <!-- footer logo area -->
        <div
            style="display:flex; flex-direction: column; width:100px; height:100%; justify-content: center; align-items: center;">
            <img style="height:50%; object-fit: contain;" src="/fixed/NOODLE_logo.png" alt="Noodle Logo">
        </div>
        <!-- footer content -->
        <div
            style="display:flex; flex-direction: column; justify-content: center; align-items: center; font-size: 11px; color:#ffffff">
            <p>서울 금천구 가산디지털1로 25 18층 플레이데이터 (가산동 670)</p>
            <p>한재혁 | 김지민 | 이민재 | 이현석 | 최인헌</p>
            <p>SK-networks Family AI Camp 1st - Final Project 1Team</p>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const router = useRouter()

        const activeButton = ref('backlog-board-btn')
        const isSearchActive = ref(false)
        const showCards = ref([true, true, true])

        function setActive(buttonType) {
            activeButton.value = buttonType
        }

        function searchToggle() {
            isSearchActive.value = !isSearchActive.value
        }

        function goToProjectManage() {
            router.push('/projectManager')
        }

        onMounted(() => {
            // activeButton.value = 'backlog-board-btn'
            // isSearchActive.value = false
        })

        return {
            activeButton,
            isSearchActive,
            showCards,

            setActive,
            searchToggle,
            goToProjectManage,
        }
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Rozha+One&family=Rubik+Mono+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Jua&family=Rozha+One&family=Rubik+Mono+One&display=swap');


.search-wrapper {
    position: absolute;
    top: 20px;
    right: 10px;
    transform: translate(0, 0);
}

.search-wrapper.active {
    background-color: #ffffff00;
}

.search-wrapper .input-holder {
    height: 70px;
    width: 70px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0);
    border-radius: 6px;
    position: relative;
    transition: all 0.3s ease-in-out;
}

.search-wrapper.active .input-holder {
    width: 450px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.85);
    transition: all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570);
}

.search-wrapper .input-holder .search-input {
    width: 100%;
    height: 50px;
    padding: 0px 70px 0 20px;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    background: transparent;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-family: "Open Sans", Arial, Verdana;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #FFF;
    transform: translate(0, 60px);
    transition: all .3s cubic-bezier(0.000, 0.105, 0.035, 1.570);
    transition-delay: 0.3s;
}

.search-wrapper.active .input-holder .search-input {
    opacity: 1;
    transform: translate(0, 10px);
}

.search-wrapper .input-holder .search-icon {
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 6px;
    background: #FFF;
    padding: 0px;
    outline: none;
    position: relative;
    z-index: 2;
    float: right;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.search-wrapper.active .input-holder .search-icon {
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 30px;
}

.search-wrapper .input-holder .search-icon span {
    width: 22px;
    height: 22px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    transform: rotate(45deg);
    transition: all .4s cubic-bezier(0.650, -0.600, 0.240, 1.650);
}

.search-wrapper.active .input-holder .search-icon span {
    transform: rotate(-55deg);
}

.search-wrapper .input-holder .search-icon span::before,
.search-wrapper .input-holder .search-icon span::after {
    position: absolute;
    content: '';
}

.search-wrapper .input-holder .search-icon span::before {
    width: 4px;
    /* 막대기 부분의 두께 */
    height: 11px;
    /* 막대기 부분의 길이 */
    left: 8px;
    /* 막대기 위치 */
    top: 18px;
    /* 막대기 위치 */
    border-radius: 2px;
    background: #f1291b;
    /* 막대기의 색상 */
}

.search-wrapper .input-holder .search-icon span::after {
    width: 20px;
    /* 원의 너비 */
    height: 20px;
    /* 원의 높이 */
    left: 0px;
    /* 원의 위치 */
    top: 0px;
    /* 원의 위치 */
    border-radius: 50%;
    /* 완전한 원으로 만듦 */
    border: 4px solid #f1291b;
    /* 원의 두께 및 색상 */
}

.search-wrapper .close {
    position: absolute;
    z-index: 1;
    top: 24px;
    right: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transform: rotate(-180deg);
    transition: all .3s cubic-bezier(0.285, -0.450, 0.935, 0.110);
    transition-delay: 0.2s;
}

.search-wrapper.active .close {
    right: -35px;
    transform: rotate(45deg);
    transition: all .6s cubic-bezier(0.000, 0.105, 0.035, 1.570);
    transition-delay: 0.5s;
}

.search-wrapper .close::before,
.search-wrapper .close::after {
    position: absolute;
    content: '';
    background: #f1291b;
    border-radius: 2px;
}

.search-wrapper .close::before {
    width: 5px;
    height: 25px;
    left: 10px;
    top: 0px;
}

.search-wrapper .close::after {
    width: 25px;
    height: 5px;
    left: 0px;
    top: 10px;
}

.header,
.body {
    /* background-color: rgb(31, 31, 31); */
    background-color: rgb(36, 36, 36);
}

/* header 영역 */
.header {
    width: 100%;
    height: 20%;
    padding: 0;
    margin: 0;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    /*수평 중앙 정렬*/
}

.header-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40%;
    gap: 20px;
    margin: 50px;
}

.header-title {
    font-family: "Exo 2", sans-serif;
    font-size: 70px;
    color: #ffcc00;
}

.header-service-btn {
    font-family: "Exo 2", sans-serif;
    display: flex;
    gap: 50px;
}

.backlog-board-btn,
.result-report-btn {
    border: 2px solid #ffcc00;
    background-color: rgba(36, 36, 36, 0);
    text-align: center;
    border-radius: 10px 10px;
    cursor: pointer;
    transition: all .25s;
    color: rgb(255, 255, 255);
}

.backlog-board-btn:hover,
.result-report-btn:hover {
    background: #ffcc00;
}

.active {
    background: #ffcc00;
    /* 클릭된 버튼은 hover 상태를 유지 */
    color: #fff;
    /* 클릭된 버튼의 글씨색을 변경하고 싶다면 추가 */
}

.body {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    height: 70%;
    padding: 0;
    margin: 0;
}

.introduce-card-area {
    width: 90%;
    height: 110%;
    margin-top: 0;
}

.service-introduce-top {
    display: flex;
    justify-content: space-between;
    height: 50%;
}

.introduce-card-top,
.introduce-card-bottom {
    position: relative;
    overflow: hidden;
    border-radius: 30px;
}

.introduce-card-top {
    width: 48%;
    height: 100%;
}

.card-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.introduce-card-top-image,
.introduce-card-bottom-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    /* 이미지가 컨테이너를 덮도록 변경 */
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
    z-index: 1;
}

.introduce-card-text-area-top {
    width: 95%;
    height: 90%;
    border: 3px solid #ffcc00;
    border-radius: 25px;
    z-index: 2;
    /* 텍스트 영역의 z-index를 더 높게 설정 */
    position: relative;
    /* position 속성을 추가하여 z-index를 적용 */
    display: flex;
    /* 내부 텍스트 중앙 정렬을 위해 flexbox 사용 */
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.introduce-card-text-area-bottom {
    width: 97%;
    height: 90%;
    border: 3px solid #ffcc00;
    border-radius: 25px;
    z-index: 2;
    /* 텍스트 영역의 z-index를 더 높게 설정 */
    position: relative;
    /* position 속성을 추가하여 z-index를 적용 */
    display: flex;
    /* 내부 텍스트 중앙 정렬을 위해 flexbox 사용 */
    justify-content: center;
    align-items: center;
    flex-direction: column;
}



.introduce-card-title {
    font-family: "Exo 2", sans-serif;
    font-size: 45px;
    text-align: center;
    /* 텍스트 정렬 */
    color: #ffcc00;
    margin: 0;
    /* 추가적인 여백을 없애기 위해 margin 제거 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.introduce-card-content {
    font-family: "Jua", sans-serif;
    font-size: 17px;
    text-align: center;
    color: #ffcc00;
}

.card-content:hover .introduce-card-top-image,
.card-content:hover .introduce-card-bottom-image {
    transform: scale(1.1);
    filter: grayscale(0);
}

.service-introduce-bottom {
    width: 100%;
    height: 50%;
}

.introduce-card-bottom {
    width: 100%;
    height: 90%;
    margin: 20px 0 0 0;
}

/* 카드 애니메이션 효과 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.6s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>