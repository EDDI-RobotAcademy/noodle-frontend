<template>
    <v-container>
        <h2> Review </h2>

        <!-- 리뷰 목록 테이블 -->
        <v-data-table v-model:item-per-page="perPage" :headers="headerTitle" :items="pagedItems"
            v-model:pagination="pagination" class="elevation-1" @click:row="readRow" item-value="reviewId" />

        <!-- 페이지네이션 -->
        <v-pagination v-model="pagination.page" :length="totalPages" color="primary" @input="updateItems" />

        <!-- 리뷰 작성 버튼 -->
        <div style="text-align: right; margin: 15px;">
            <router-link to="/review/register" style="align-items: right;">
                게시물 작성
            </router-link>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    components: {},
    computed: {
        // Vuex 상태 매핑
        ...mapState(reviewModule, ['reviewList']),

        // 전체 페이지 수 계산
        totalPages() {
            return Math.ceil(this.reviewList / this.perPage);
        }
    },
    mounted() {
        this.reviewList = this.requestEntireReviewListCount();
        const payload = { 'pagination': this.pagination.page, 'perPage': this.perPage }
        this.reviewList = this.requestReviewListToDjango(payload);
    },
    methods: {
        // Vuex 액션 매핑
        ...mapActions(reviewModule, ['requestReviewListToDjango', 'requestEntireReviewListCount']),

        // 테이블 행 클릭 시 리뷰 읽기 페이지로 이동
        readRow(event, { item }) {
            console.log('item :', item);
            this.$router.push({
                name: 'ReviewReadPage',
                params: { reviewId: item['reviewId'].toString() }
            });
        },

        // 페이지가 변경될 때 아이템 업데이트
        updateItems() {
            // 페이지 변경에 따른 추가 로직 필요시 여기에 작성
            console.log('페이지 변경: ', this.pagination.page);
        }
    },
    data() {
        return {
            // 테이블 헤더 설정
            headerTitle: [
                { text: 'No', align: 'start', sortable: true, value: 'reviewId' },
                { text: '제목', align: 'end', value: 'title' },
                { text: '작성자', align: 'end', value: 'writer' },
                { text: '작성일자', align: 'end', value: 'regDate' }
            ],
            perPage: 5, // 페이지당 항목 수
            pagination: {
                page: 1, // 현재 페이지
            },
            reviewList: [],
        };
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}
</style>
