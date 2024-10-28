<template>
    <div class="review-container" v-if="isSelectionReview">
        <div class="review-header">
            <h2>{{ reviewTitle }}</h2>
            <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
        </div>
        <v-card class="review-card">
            <div class="review-scores">
                <p><strong>디자인:</strong> <span class="star-rating">★{{ designScore }}</span></p>
                <p><strong>사용성:</strong> <span class="star-rating">★{{ usabilityScore }}</span></p>
                <p><strong>응답성:</strong> <span class="star-rating">★{{ responsiveScore }}</span></p>
                <p><strong>AI 답변 퀄리티:</strong> <span class="star-rating">★{{ qualityScore }}</span></p>
            </div>
        </v-card>
        <v-card v-if="reviewContent !== ''" class="review-card">
            <p class="review-content"> {{ reviewContent }}</p>
        </v-card>
    </div>
    <div class="review-container" v-else>
        <div class="review-header">
            <h2>{{ reviewTitle }}</h2>
            <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
        </div>
        <div class="review-card">
            <p class="review-content">{{ reviewContent }}</p>
        </div>
    </div>
    <button class="back-button" @click="goToReivewModifyPage()" :disabled="modifyingAllowed == false">수정</button>
    <button class="back-button" @click="deleteThisReview()" :disabled="modifyingAllowed == false">삭제</button>
    <button class="back-button" @click="goToReviewListPage()">목록으로 돌아가기</button>
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
const id = ref(route.params.id);

const isSelectionReview = ref(true);
const reviewTitle = ref('');
const reviewWriter = ref('');
const reviewRegDate = ref('');
const reviewContent = ref('');
const designScore = ref(0);
const usabilityScore = ref(0);
const qualityScore = ref(0);
const responsiveScore = ref(0);
const modifyingAllowed = ref(false)

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
function goToReivewModifyPage() {
    router.push(`/review/modify/${beforeListPageNumber.value}/${id.value}`)
}
function deleteThisReview() {
    // 삭제 관련 백엔드 로직 연결
}

onMounted(async () => {
    await getReviewData();
    const response = await authenticationStore.requestCheckModifyingAllowedUserToDjango(reviewWriter.value, localStorage.getItem('userToken') || 'anonymous')
    console.log(response.data.response)
    modifyingAllowed.value = response.data.response
});
</script>

<style scoped>
.review-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.back-button:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
}
</style>