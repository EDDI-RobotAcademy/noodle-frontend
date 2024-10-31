<template>
  <v-container class="review-body" fluid>
    <div class="review-header">
      <h2>REVIEW</h2>
   <!-- 리뷰 작성 버튼 -->
      <div class="create-review-btn">
        <NuxtLink to="/review/register">
          <NuxtButton type="button" class="gotoregister-btn">
            게시물 등록
          </NuxtButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 리뷰 목록 테이블 -->
    <div class="review-table-container">
      <v-data-table v-model:items-per-page.sync="perPage" 
      :headers="headerTitle" 
      :items="pagedItems"
      :pagination.sync="pagination" 
      class="elevation-1 review-table" 
      @click:row="readRow" 
      item-value="reviewId"
      :items-per-page-options="perPageOptions" 
      :pageText="prompt" 
      hide-default-footer 
      :loading="isLoading" />
    </div>

    <!-- 페이지네이션 -->
      <v-pagination v-model="pagination" :length="totalPages" color="white" @input="updateItems" :total-visible="5"
        class="pagination-bar" />
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
      { text: '작성자', align: 'center', value: 'writer', title: '작성자' },
      { text: '제목', align: 'center', value: 'title', title: '제목' },
      { text: '작성일자', align: 'center', value: 'regDate', title: '작성일자' }
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

.review-body {
  width: 100%;
  min-height: 120%;
  height: auto;
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.review-header {
  width: 70%;
  height: 13%;
  display: flex;
  justify-content: space-between;
  padding-top: 3%;
}

h2 {
  width: 15%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
  font-size: 40px;
  color: rgb(255, 255, 255);
}

.create-review-btn {
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
}

.create-review-btn .gotoregister-btn {
  background-color: #1c1c1c;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-review-btn a {
  text-decoration: none;  /* 버튼에 생기는 밑줄 제거 */
}

.create-review-btn .gotoregister-btn:hover {
  background-color: rgb(255, 240, 30);
  /* border: 3px solid #ffffff; */
  color: rgb(100, 100, 100);
}

.review-table-container {
  width: 70%;
  min-height: 70%;
  height: auto;
  border-radius: 10px;
}

.review-table {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}



:deep(.v-table thead th) {
  font-size: 22px !important;
  font-weight: bold !important;
  border-bottom: 3px solid #000000 !important;
}

:deep(.v-table tbody td) {
  height: 80px !important;
  font-size: 16px !important;
}

:deep(.v-data-table-header th:nth-child(1)) {
  width: 20% !important;
}

:deep(.v-data-table-header th:nth-child(2)) {
  width: 60% !important;
}

:deep(.v-data-table-header th:nth-child(3)) {
  width: 20% !important;
}


:deep(.v-data-table-body td:nth-child(1)) {
  width: 20% !important;
}

:deep(.v-data-table-body td:nth-child(2)) {
  width: 60% !important;
}

:deep(.v-data-table-body td:nth-child(3)) {
  width: 20% !important;
}



.pagination-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>