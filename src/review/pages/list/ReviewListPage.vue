<template>
    <v-container>
        <h2>Review</h2>

        <!-- 리뷰 목록 테이블 -->
        <v-data-table v-model:items-per-page.sync="perPage" :headers="headerTitle" :items="pagedItems"
            :pagination="pagination" class="elevation-1 review-table" @click:row="readRow" item-value="reviewId"
            :items-per-page-options="perPageOptions" :pageText="prompt" hide-default-footer />

        <!-- 페이지네이션 -->
        <v-pagination v-model="pagination" :length="totalPages" color="primary" @input="updateItems" :total-visible="5"
            class="pagination-bar" />

        <!-- 리뷰 작성 버튼 -->
        <div class="create-review-btn">
            <router-link to="/review/register">
                <v-btn color="primary" dark>
                    게시물 작성
                </v-btn>
            </router-link>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    computed: {
        ...mapState(reviewModule, ['reviewList']),
        totalPages() {
            return Math.ceil(this.reviewList / this.perPage);
        }
    },
    async mounted() {
        this.reviewList = await this.requestEntireReviewListCount();
        const payload = { pagination: this.pagination, perPage: this.perPage };
        this.pagedItems = await this.requestReviewListToDjango(payload);
        this.prompt = `${this.perPage * (this.pagination - 1) + 1}-${this.perPage * (this.pagination - 1) + this.pagedItems.length} of ${this.reviewList}`;
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewListToDjango', 'requestEntireReviewListCount']),
        readRow(event, item) {
            this.$router.push(`/review/read/${item.item.id}`);
        },
        async updateItems() {
            const payload = { pagination: this.pagination, perPage: this.perPage };
            this.pagedItems = await this.requestReviewListToDjango(payload);
            this.prompt = `${this.perPage * (this.pagination - 1) + 1}-${this.perPage * (this.pagination - 1) + this.pagedItems.length} of ${this.reviewList}`;
        }
    },
    watch: {
        perPage() {
            this.pagination = 1;
            this.updateItems();
        },
        pagination(index) {
            this.pagination = index;
            this.updateItems();
        }
    },
    data() {
        return {
            headerTitle: [
                { text: '작성자', align: 'start', value: 'writer' },
                { text: '제목', align: 'middle', value: 'title' },
                { text: '작성일자', align: 'end', value: 'regDate' }
            ],
            perPage: 10,
            pagination: 1,
            reviewList: 0,
            pagedItems: [],
            perPageOptions: [
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' }
            ],
            prompt: ''
        };
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}

.review-table {
    margin-bottom: 20px;
}

.pagination-bar {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.create-review-btn {
    text-align: right;
    margin-top: 20px;
}
</style>
