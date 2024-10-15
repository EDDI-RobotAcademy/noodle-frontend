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
        <v-card v-if="this.reviewContent !== ''" class="review-card">
            <p class="review-content"> {{ this.reviewContent }}</p>
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
    <button class="back-button" @click="goToReviewListPage()">목록으로 돌아가기</button>
</template>


<script>
import { mapActions } from 'vuex';

const reviewModule = 'reviewModule'

export default {
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            isSelectionReview: true,
            reviewTitle: '',
            reviewWriter: '',
            reviewRegDate: '',
            reviewContent: '',
            designScore: 0,
            usabilityScore: 0,
            qualityScore: 0,
            responsiveScore: 0,
        }
    },
    async mounted() {
        await this.getReviewData()
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewDetailsToDjango']),
        async getReviewData() {
            const res = await this.requestReviewDetailsToDjango({ "reviewID": this.id })
            if (res.type == "WRITING") {
                this.isSelectionReview = false
                this.reviewTitle = res.title
                this.reviewRegDate = res.regDate
                this.reviewWriter = res.writer
                this.reviewContent = res.content
            } else {
                this.isSelectionReview = true
                this.reviewTitle = res.title
                this.reviewRegDate = res.regDate
                this.reviewWriter = res.writer
                this.designScore = res.design
                this.usabilityScore = res.using
                this.responsiveScore = res.speed
                this.qualityScore = res.quality
                this.reviewContent = res.content
            }
        },
        goToReviewListPage() {
            this.$router.push("/review/list")
        }
    },
}
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
</style>