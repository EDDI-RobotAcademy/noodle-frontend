<template>
  <v-container>
    <h2>Review</h2>

    <!-- 리뷰 목록 테이블 -->
    <v-data-table v-model:items-per-page.sync="perPage" :headers="headerTitle" :items="pagedItems"
      :pagination.sync="pagination" class="elevation-1 review-table" @click:row="readRow" item-value="reviewId"
      :items-per-page-options="perPageOptions" :pageText="prompt" hide-default-footer :loading="isLoading" />

    <!-- 페이지네이션 -->
    <v-pagination v-model="pagination" :length="totalPages" color="primary" @input="updateItems" :total-visible="5"
      class="pagination-bar" />

    <!-- 리뷰 작성 버튼 -->
    <div class="create-review-btn">
      <NuxtLink to="/review/register">
        <v-btn color="primary" dark>
          게시물 작성
        </v-btn>
      </NuxtLink>
    </div>
  </v-container>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useReviewStore } from '../../stores/reviewStore';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const reviewStore = useReviewStore();
    const router = useRouter();
    const route = useRoute();

    const headerTitle = ref([
      { text: '작성자', align: 'start', value: 'writer' },
      { text: '제목', align: 'middle', value: 'title' },
      { text: '작성일자', align: 'end', value: 'regDate' }
    ])
    const perPage = ref(10)
    const pagination = ref(Number(route.params.page))
    const reviewList = ref(0)
    const pagedItems = ref([])
    const perPageOptions = ref([
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' }
    ])
    const isLoading = ref(true)
    const prompt = ref('')
    const totalPages = computed(() => {
      return Math.ceil(reviewList.value / perPage.value)
    })

    async function updateItems() {
      const payload = { pagination: pagination.value, perPage: perPage.value }
      pagedItems.value = await reviewStore.requestReviewListToDjango(payload)
      prompt.value = `${perPage.value * (pagination.value - 1) + 1}- ${perPage.value * (pagination.value - 1) + pagedItems.length} of ${reviewList.value}`
    }
    function readRow(event, item) {
      console.log(pagination)
      router.push(`/review/read/${route.params.page}/${item.item.id}`)
    }

    watch(perPage, (newPerPage) => {
      pagination.value = 1
      updateItems()
    })
    watch(pagination, (index) => {
      router.push(`/review/list/${index}`)
    })

    onMounted(async () => {
      const page = pagination.value
      reviewList.value = await reviewStore.requestEntireReviewListCount()
      const payload = { pagination: page, perPage: perPage.value }
      pagedItems.value = await reviewStore.requestReviewListToDjango(payload)
      prompt.value = `${perPage.value * (page - 1) + 1}- ${perPage.value * (page - 1) + pagedItems.length} of ${reviewList.value}`
      isLoading.value = false
    })

    return {
      headerTitle,
      perPage,
      pagination,
      reviewList,
      pagedItems,
      perPageOptions,
      prompt,
      totalPages,
      isLoading,

      readRow,
    }
  }
})
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