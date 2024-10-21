<template>
  <v-container>
    <h2>Review</h2>

    <!-- 리뷰 목록 테이블 -->
    <v-data-table
      v-model:items-per-page.sync="perPage"
      :headers="headerTitle"
      :items="pagedItems"
      :pagination.sync="pagination"
      class="elevation-1 review-table"
      @click:row="readRow"
      item-value="reviewId"
      :items-per-page-options="perPageOptions"
      :pageText="prompt"
      hide-default-footer
    />

    <!-- 페이지네이션 -->
    <v-pagination
      v-model="pagination"
      :length="totalPages"
      color="primary"
      @input="updateItems"
      :total-visible="5"
      class="pagination-bar"
    />

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

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useReviewStore } from '../stores/reviewStore';

const reviewStore = useReviewStore();

const perPage = ref(10);
const pagination = ref(1);
const pagedItems = ref([]);
const perPageOptions = ref([
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
]);
const headerTitle = ref([
  { text: '작성자', align: 'start', value: 'writer' },
  { text: '제목', align: 'middle', value: 'title' },
  { text: '작성일자', align: 'end', value: 'regDate' },
]);
const prompt = ref('');

const totalPages = computed(() => Math.ceil(reviewStore.reviewList.length / perPage.value));

const updateItems = async () => {
  await reviewStore.requestReviewList({ pagination: pagination.value, perPage: perPage.value });
  pagedItems.value = reviewStore.reviewList.slice(
    (pagination.value - 1) * perPage.value,
    pagination.value * perPage.value
  );
  prompt.value = `${perPage.value * (pagination.value - 1) + 1}-${
    perPage.value * (pagination.value - 1) + pagedItems.value.length
  } of ${reviewStore.reviewList.length}`;
};

const readRow = (event, item) => {
  useRouter().push(`/review/read/${item.item.id}`);
};

onMounted(async () => {
  await reviewStore.requestEntireReviewListCount();
  await updateItems();
});

watch(perPage, async () => {
  pagination.value = 1;
  await updateItems();
});

watch(pagination, async () => {
  await updateItems();
});
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