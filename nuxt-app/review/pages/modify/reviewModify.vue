<template>
    <div v-if="isLoading == false">
        <div class="review-container">
            <div v-if="isSelectionReview == true" class="review-template status-template">
                <h2>{{ reviewTitle }}</h2>
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

                    <button @click="goToReivewReadPage()">취소</button>
                    <button type="submit">리뷰 제출</button>
                    <button @click="goToReviewListPage()">목록으로 돌아가기</button>
                </form>
            </div>
            <div v-else class="review-template domain-template">
                <form @submit.prevent="submitReview">
                    <v-text class="question-text">리뷰 제목</v-text>
                    <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
                    <div></div>
                    <input type="text" id="domain-title" v-model="reviewTitle" required />
                    <div></div>
                    <v-text class="question-text">리뷰 본문</v-text>
                    <textarea v-model="reviewContent" id="domain-content" class="review-text-field" required></textarea>
                    <button @click="goToReivewReadPage()">취소</button>
                    <button type="submit">수정 완료</button>
                    <button @click="goToReviewListPage()">목록으로 돌아가기</button>
                </form>
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
.inner {
    margin: 5px;
}

.question-text {
    font-size: 20px;
    font-weight: 700;
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

.status-template h3,
.domain-template h3 {
    margin-bottom: 10px;
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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.star-rating .star:hover~.star {
    color: lightgray;
}

.review-text-field {
    margin-bottom: 5px;
    box-sizing: inherit;
}

.review-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.review-text-field {
    margin-bottom: 5px;
    box-sizing: inherit;
}

.review-header {
    margin-bottom: 15px;
}

.review-meta {
    color: #6c757d;
    font-size: 0.9rem;
}

.review-card {
    padding: 20px;
    margin-bottom: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-scores p {
    font-size: 1rem;
    margin-bottom: 8px;
}

.star-rating {
    color: #ffcc00;
    font-size: 1.2rem;
}

.review-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
}

.back-button {
    display: flex;
    padding: 12px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
}

.back-button:hover {
    background-color: #0056b3;
}
</style>