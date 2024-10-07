<template>
    <v-container>
        <h2> Review </h2>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ name:'ReviewRegisterPage'}">
                게시물 작성
            </router-link>
        </div>
        <v-data-table
                v-model:item-per-page="perPage"
                :headers="headerTitle"
                :items="pageItems"
                v-model:pagination="pagination"
                class="elevation-1"
                @click:row="readRow"
                item-value="reviewId"/>
            <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(reviewList.length / perPage)"
                color="primary"
                @input="updateItems"/>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    components: {

    },
    computed: {
        ...mapState(reviewModule, ['reviewList']),
        pagedItems () {
            const startIdx = (this.pagination.page -1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.reviewList.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestReviewListToDjango()
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewListToDjango']),
        readRow (event, { item }) {
            console.log('item :', item)
            this.$router.push({
                name: 'ReviewReadPage',
                params: { reviewId: item['reviewId'].toString() }
            })
        }
    },
    data () {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'reviewId'
                },
                {title: '제목', align: 'end', key: 'title'},
                {title: '작성자', align: 'end', key: 'writer'},
                {title: '작성일자', align: 'end', key: 'regDate'},
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    }
}

</script>