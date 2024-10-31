<template>
    <div class="review-read-container">
        <div class="review-container" v-if="isSelectionReview">
            <div class="review-header">
                <h2>{{ reviewTitle }}</h2>
                <v-text class="review-meta">[{{ reviewWriter }}] {{ reviewRegDate }}</v-text>
            </div>
            <v-card class="review-card">
                <div class="review-scores">
                    <p><strong>디자인:</strong> <span class="star-rating">{{ '★'.repeat(designScore) }}</span></p>
                    <p><strong>사용성:</strong> <span class="star-rating">{{ '★'.repeat(usabilityScore) }}</span></p>
                    <p><strong>응답성:</strong> <span class="star-rating">{{ '★'.repeat(responsiveScore) }}</span></p>
                    <p><strong>AI 답변 퀄리티:</strong> <span class="star-rating">{{ '★'.repeat(qualityScore) }}</span></p>
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
        <div class="review-button-container">
            <button class="back-button" @click="goToReivewModifyPage()" :disabled="modifyingAllowed == false">
                <v-icon>mdi-pencil</v-icon>
                수정
            </button>
            <button class="back-button" @click="deleteThisReview()" :disabled="modifyingAllowed == false">
                <v-icon>mdi-delete</v-icon>
                삭제
            </button>
            <button class="back-button" @click="goToReviewListPage()">
                <v-icon>mdi-format-list-bulleted</v-icon>
                목록
            </button>
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
    reviewStore.requestDeleteReviewToDjango(id.value, reviewWriter.value)
    router.push(`/review/list/${beforeListPageNumber.value}`)
}

onMounted(async () => {
    await getReviewData();
    const response = await authenticationStore.requestCheckModifyingAllowedUserToDjango(reviewWriter.value, localStorage.getItem('userToken') || 'anonymous')
    console.log(response.data.response)
    modifyingAllowed.value = response.data.response
});
</script>

<style scoped>

.review-read-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1c1c1c;
}

.review-container {
    max-width: 800px;
    min-height: 60%;
    width: 100%;
    height: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
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


.review-button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}


.back-button {
    display: flex;
    padding: 12px 20px;
    background-color: transparent;
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
    border: 3px solid #ffffff;
    border-radius: 20px;
    font-weight: bold;
    gap: 5px;
}

.back-button:hover {
    background-color: rgb(255, 240, 30, 0.9);
}

.back-button:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.6;
}
</style>