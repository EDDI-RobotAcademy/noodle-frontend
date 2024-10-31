<template>
    <div class="review-modify-page">
        <div v-if="isLoading == false"
            style="width: 70%; 
                height: 100%; 
                display: flex;
                flex-direction: column;
                justify-content: center; 
                align-items: center;">
            <div class="review-container">
                <div v-if="isSelectionReview == true" class="review-template status-template">
                    <h2 style="padding: 14px 14px 0px 14px;">{{ reviewTitle }}</h2>
                    <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
                    <form @submit.prevent="submitReview">
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
                        <textarea v-model="reviewContent" class="review-text-field"></textarea>

                        <div class="button-container">
                            <button @click="goToReivewReadPage()">
                                <v-icon>mdi-close</v-icon>
                                취소</button>
                            <button type="submit">
                                <v-icon>mdi-check</v-icon>
                                수정 완료</button>
                            <button @click="goToReviewListPage()">
                                <v-icon>mdi-format-list-bulleted</v-icon>
                                목록</button>
                        </div>
                    </form>
                </div>
                <div v-else class="review-template domain-template">
                    <form @submit.prevent="submitReview">
                        <v-text class="domain-template-question-text">리뷰 제목</v-text>
                        <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
                        <div></div>
                        <input type="text" id="domain-title" v-model="reviewTitle" required />
                        <div></div>
                        <v-text class="domain-template-question-text">리뷰 본문</v-text>
                        <textarea v-model="reviewContent" id="domain-content" class="review-text-field" required></textarea>
                        <div class="button-container">
                            <button @click="goToReivewReadPage()">
                                <v-icon>mdi-close</v-icon>
                                취소</button>
                            <button type="submit">
                                <v-icon>mdi-check</v-icon>
                                수정 완료</button>
                            <button @click="goToReviewListPage()">
                                <v-icon>mdi-format-list-bulleted</v-icon>
                                목록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useReviewStore } from '../../stores/reviewStore';
import { useRouter, useRoute } from '#imports';
import { useAuthenticationStore } from '../../../authentication/stores/authenticationStore';

const reviewStore = useReviewStore();
const authenticationStore = useAuthenticationStore();
const route = useRoute();
const router = useRouter();

const beforeListPageNumber = ref(Number(route.params.page))
const id = ref(null);

const isSelectionReview = ref(true);
const reviewTitle = ref('');
const reviewWriter = ref('');
const reviewRegDate = ref('');
const reviewContent = ref('');
const designScore = ref(0);
const usabilityScore = ref(0);
const qualityScore = ref(0);
const responsiveScore = ref(0);
const user = ref('');
const isLoading = ref(true)

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
}
const submitReview = async () => {
    if (isSelectionReview.value == true) {
        if (designScore.value === 0 || usabilityScore.value === 0 || qualityScore.value === 0 || responsiveScore.value === 0) {
            alert('별점은 필수 입력 사항입니다!');
        } else {
            const payload = {
                reviewID: Number(id.value),
                ratingList: [designScore.value, usabilityScore.value, responsiveScore.value, qualityScore.value],
                content: reviewContent.value,
                writer: reviewWriter.value,
                userToken: localStorage.getItem('userToken')
            };
            await reviewStore.requestModifyReviewToDjango(payload)
            goToReivewReadPage()
        }
    } else {
        const payload = {
            reviewID: Number(id.value),
            title: reviewTitle.value,
            content: reviewContent.value,
            writer: reviewWriter.value,
            userToken: localStorage.getItem('userToken')
        };
        await reviewStore.requestModifyReviewToDjango(payload)
        goToReivewReadPage()
    }
};

async function getReviewData() {
    const res = await reviewStore.requestReviewDetailsToDjango({ "reviewID": id.value });
    if (res.type == "WRITING") {
        isSelectionReview.value = false;
        reviewTitle.value = res.title;
        reviewRegDate.value = res.regDate;
        reviewWriter.value = res.writer;
        reviewContent.value = res.content;
    } else {
        isSelectionReview.value = true;
        reviewTitle.value = res.title;
        reviewRegDate.value = res.regDate;
        reviewWriter.value = res.writer;
        designScore.value = res.design;
        usabilityScore.value = res.using;
        responsiveScore.value = res.speed;
        qualityScore.value = res.quality;
        reviewContent.value = res.content;
    }
}
function goToReviewListPage() {
    router.push(`/review/list/${beforeListPageNumber.value}`);
}
function goToReivewReadPage() {
    router.push(`/review/read/${beforeListPageNumber.value}/${id.value}`);
}

onMounted(async () => {
    id.value = Number(route.params.id)
    await getReviewData();
    isLoading.value = false
    user.value = localStorage.getItem('userToken') || 'anonymous';
    const response = await authenticationStore.requestCheckModifyingAllowedUserToDjango(reviewWriter.value, user.value)
    if (response.data.response == false) {
        alert('작성자만 수정이 가능합니다!')
        router.push(`/review/read/${beforeListPageNumber.value}/${id.value}`)
    }
});
</script>

<style scoped>
/* 최상위 컨테이너 */
.review-modify-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1c1c1c;
}

.review-container {
    padding: 20px;
    width: 70%;
    height: 80%;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 리뷰 템플릿 공통 */
.review-template {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* status-template 관련 */
.status-template form {
    height: 92%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 60px;
}

.inner {
    padding: 14px;
    border-bottom: 1px solid #000000;
}

.status-template .question-text {
    font-size: 25px;
    font-weight: bold;
}

.star-rating {
    align-items: center;
    display: flex;
    color: #ffcc00;
    font-size: 1.2rem;
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

.status-template .review-text-field {
    margin-bottom: 5px;
    box-sizing: border-box;
    height: 25%;
    max-height: 40%;
}

/* domain-template 관련 */
.domain-template {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.domain-template form {
    height: 100%;
    position: relative;
}

.domain-template-question-text {
    font-size: 25px;
    font-weight: bold;
    width: 50%;
}

.domain-template .review-text-field {
    margin-bottom: 5px;
    box-sizing: border-box;
    height: 65%;
    flex-grow: 1;
    max-height: 75%;
}

/* 폼 요소 공통 */
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

.review-meta {
    color: #6c757d;
    font-size: 0.9rem;
    padding: 0px 14px 0px 14px;
}

/* 버튼 관련 */
.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
}

button {
    padding: 10px 15px;
    background-color: #1c1c1c;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

button:hover {
    background-color: rgb(255, 240, 30, 0.9);
    color: #686868;
}

</style>