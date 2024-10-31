<template>
    <div class="review-register-page">
        <div style="width: 70%; 
                    height: 100%; 
                    display: flex;
                    flex-direction: column;
                    justify-content: center; 
                    align-items: center;">
            <!-- 토글 스위치 -->
            <div class="title">
                    <h1 style="color: #fff; font-size: 35px;">Review 작성</h1>
                    <div class="switch white">
                        <input type="radio" id="switch-off" v-model="isChecked" :value="false" />
                        <input type="radio" id="switch-on" v-model="isChecked" :value="true" />
                        <label for="switch-off">Selection Form</label>
                        <label for="switch-on">Free Form</label>
                        <span class="toggle" :class="{ 'checked': isChecked }"></span>
                    </div>
            </div>

            <!-- selection Review Template -->
            <div v-if="!isChecked" class="review-template status-template">
                <form class="form" @submit.prevent="submitReview" fluid>
                    <div class="inner">
                        <v-text class="question-text">디자인</v-text>
                        <div class="star-rating">
                            <div class="star" v-for="index in 5" :key="index" @click="check('design', index)">
                                <span v-if="index - 1 < designScore">★</span>
                                <span v-if="index - 1 >= designScore">☆</span>
                            </div>
                        </div>
                    </div>
                    <div class="inner">
                        <v-text class="question-text">사용성</v-text>
                        <div class="star-rating">
                            <div class="star" v-for="index in 5" :key="index" @click="check('usability', index)">
                                <span v-if="index - 1 < usabilityScore">★</span>
                                <span v-if="index - 1 >= usabilityScore">☆</span>
                            </div>
                        </div>
                    </div>
                    <div class="inner">
                        <v-text class="question-text">응답성</v-text>
                        <div class="star-rating">
                            <div class="star" v-for="index in 5" :key="index" @click="check('responsive', index)">
                                <span v-if="index - 1 < responsiveScore">★</span>
                                <span v-if="index - 1 >= responsiveScore">☆</span>
                            </div>
                        </div>
                    </div>
                    <div class="inner">
                        <v-text class="question-text">AI가 생성한 답변의 퀄리티</v-text>
                        <div class="star-rating">
                            <div class="star" v-for="index in 5" :key="index" @click="check('quality', index)">
                                <span v-if="index - 1 < qualityScore">★</span>
                                <span v-if="index - 1 >= qualityScore">☆</span>
                            </div>
                        </div>
                    </div>
                    <v-text class="question-text">기타 리뷰</v-text>
                    <textarea v-model="statusContent" class="review-text-field"></textarea>

                    <button type="submit">리뷰 제출</button>
                </form>
            </div>

            <!-- Free Form Review Template -->
            <div v-else class="review-template domain-template">
                <form class="form" @submit.prevent="submitReview">
                    <v-text class="question-text">리뷰 제목</v-text>
                    <input type="text" id="domain-title" v-model="domainTitle" required />

                    <v-text class="question-text">리뷰 본문</v-text>
                    <textarea v-model="domainContent" id="domain-content" class="review-text-field" required></textarea>
                    <button type="submit">리뷰 제출</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from '#app';
import { useReviewStore } from '../../stores/reviewStore';

const router = useRouter();
const reviewStore = useReviewStore();

const isChecked = ref(false); // false -> Status, true -> Domain
const statusContent = ref('');
const domainTitle = ref('');
const domainContent = ref('');
const designScore = ref(0);
const usabilityScore = ref(0);
const qualityScore = ref(0);
const responsiveScore = ref(0);
const user = ref('');

const submitReview = async () => {
    user.value = localStorage.getItem('userToken') || 'anonymous';
    if (!isChecked.value) {
        if (designScore.value === 0 || usabilityScore.value === 0 || qualityScore.value === 0 || responsiveScore.value === 0) {
            alert('별점은 필수 입력 사항입니다!');
        } else {
            const payload = {
                userToken: user.value,
                ratingList: [designScore.value, usabilityScore.value, responsiveScore.value, qualityScore.value],
                content: statusContent.value,
            };
            await reviewStore.requestRegisterSelectionFormReviewToDjango(payload);
            clearForm();
            router.push('/review/list/1');
        }
    } else {
        const payload = {
            title: domainTitle.value,
            userToken: user.value,
            content: domainContent.value,
        };
        await reviewStore.requestRegisterFreeFormReviewToDjango(payload);
        clearForm();
        router.push('/review/list/1');
    }
};

const clearForm = () => {
    statusContent.value = '';
    domainTitle.value = '';
    domainContent.value = '';
    designScore.value = 0;
    responsiveScore.value = 0;
    usabilityScore.value = 0;
    qualityScore.value = 0;
    user.value = '';
};

const check = (type, index) => {
    if (type === 'design') {
        designScore.value = index;
    } else if (type === 'usability') {
        usabilityScore.value = index;
    } else if (type === 'responsive') {
        responsiveScore.value = index;
    } else if (type === 'quality') {
        qualityScore.value = index;
    }
};
</script>

<style scoped>

.review-register-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1c1c1c;
}

.title {
    width: 70%;
    height: 10%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 20px;
    position: relative;
    justify-content: space-between;
}

.review-template{
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 60px;
}


.inner {
    padding: 14px;
    border-bottom: 1px solid #000000;
    
}

.question-text {
    font-size: 20px;
    font-weight: 700;
    padding: 14px;
    margin-top: 10px;
}


.status-template .review-text-field {
    margin-bottom: 5px;
    box-sizing: inherit;
    padding: 14px;
    max-height: 150px;
}

.domain-template .review-text-field {
    margin-bottom: 5px;
    box-sizing: inherit;
    padding: 14px;
    max-height: 400px;
}

.star-rating {
    align-items: center;
    display: flex;
}

.star {
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    color: gold;
    margin-top: -20px;
    margin-bottom: -15px;
}

.star:hover {
    color: gold;
}

.star-rating .star:hover~.star {
    color: lightgray;
}


.switch {
    display: flex;
    align-items: center;
    background: #dadada;
    border-radius: 32px;
    height: var(--switch-height, 20px);
    width: var(--switch-width, 60px);
    padding: 0 10px;
    transform: translateX(100%);
    position: relative;
    margin-right: 130px;
}

.switch label {
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: var(--switch-height, 20px);
    text-transform: uppercase;
    transition: color 0.2s ease;
    width: 45px;
}

.switch label:nth-of-type(1) {
    position: absolute;
    left: -130%;
    text-align: right;
}

.switch label:nth-of-type(2) {
    position: absolute;
    right: -100%;
    text-align: left;
}

.switch input {
    height: var(--switch-height, 20px);
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: var(--switch-width, 100px);
    z-index: 2;
}

.switch input:checked~label:nth-of-type(1) {
    color: rgb(255, 240, 30);
}

.switch input:checked~label:nth-of-type(2) {
    color: #8f8f8f;
}

.switch input~ :checked~label:nth-of-type(1) {
    color: #8f8f8f;
}

.switch input~ :checked~label:nth-of-type(2) {
    color: rgb(255, 240, 30);
}

.switch input:checked~.toggle {
    left: 10px;
}

.switch input~ :checked~.toggle {
    left: 40px;
}

.switch input:checked {
    z-index: 0;
}

.toggle {
    background: #4a4a4a;
    border-radius: 50%;
    height: calc(var(--switch-height, 20px) - 8px);
    left: 0;
    position: absolute;
    top: 4px;
    transition: left 0.2s ease;
    width: calc(var(--switch-height, 20px) - 8px);
    z-index: 1;
}

.toggle.checked {
    left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 20px) - 8px));
}

.review-template {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

form label {
    display: block;
    margin-bottom: 5px;
}

form input[type="text"],
form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    padding: 10px 15px;
    background-color: #000000;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
}

button:hover {
    background-color: rgb(255, 240, 30);
    color: #6d6d6d;
}
</style>
