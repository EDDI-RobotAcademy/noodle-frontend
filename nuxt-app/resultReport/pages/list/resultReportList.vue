<template>
  <v-container class="report-list-body" fluid>
    <v-row justify="center">
      <v-col cols="12" class="report-list-area">
        <div class="search-container">
          <div>
            <h1>Report List</h1>
          </div>
          <div>
            <v-card class="search-card" max-width="500">
              <v-text-field class="searchbox" v-model="searchQuery" label="검색어를 입력하세요"
                v-on:keyup.enter="fetchResultReports" append-icon="mdi-magnify" @click:append="fetchResultReports"
                clearable></v-text-field>
            </v-card>
          </div>
        </div>
        <v-card v-for="report in resultReports" :key="report.resultReportId" class="custom-card-spacing"
          @click="readRow($event, { item: report })">
          <div class="report-content">
            <div class="section1">
              <v-img class="image" src="/public/fixed/NOODLE_logo.png"></v-img>
            </div>
            <div class="section2">
              <!-- <v-card-title class="department">
                  <p>{{ report.creatorDepartment }}</p>
                </v-card-title> -->
              <v-card-title class="report-title">
                <p class="report-link">{{ report.resultReportTitle }}</p>
                <p class="member">담당자: {{ report.creator }}</p>
                <div v-html="report.resultReportFeature" class="function scrollable-content"
                  style="color: black; font-size:10px;">
                </div>
              </v-card-title>
            </div>
            <div class="section3">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>

        <v-pagination v-model="pagination.page" :length="totalPages" color="primary" class="pagination"
          @input="fetchResultReports"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useResultReportStore } from '../../stores/resultReportStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const resultReportStore = useResultReportStore();
    const router = useRouter();

    const resultReports = ref([]);
    const perPage = ref(5);
    const pagination = ref({
      page: 1
    });
    const searchQuery = ref('');
    const totalPages = ref(null);

    async function fetchResultReports() {
      const page = pagination.value.page;
      searchQuery.value = searchQuery.value.trim();
      const SQ = searchQuery.value;
      const payload = { page, perPage: perPage.value, SQ };
      try {
        const response = await resultReportStore.requestResultReportListToDjango(payload);
        resultReports.value = toRaw(response.resultReports.reverse());
        totalPages.value = Math.ceil(response.totalCount / perPage.value);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      }
    }

    function readRow(event, { item }) {
      router.push(`/resultReport/read/${item.resultReportId}`);
    }

    onMounted(async () => {
      await fetchResultReports();
    });

    return {
      resultReports,
      perPage,
      pagination,
      searchQuery,
      totalPages,
      readRow,
      fetchResultReports
    };
  }
});
</script>

<style scoped>
.report-list-body {
  width: 100%;
  background-color: #080808;
}

.searchbox {
  width: 500px;
  height: 50px;
}

.report-list-area {
  width: 70%;
  margin: 0 auto;
  flex: none !important;
  position: relative;
  min-height: 100vh;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
}

.pagination {
  color: #ffffff;
  position: relative;
  margin-top: 20px;
}

h1 {
  font-size: 40px;
  color: #ffffff;
  text-align: left;
  padding-bottom: 10px;
  padding-left: 0;
  margin-left: 0;
}

.report-link {
  margin: 0;
  color: #000;
  font-size: 18px;
}

.report-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: 150px;
  /* v-card의 고정된 높이 */
}

.image {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: 0.5vw;
}

.department {
  font-size: 13px;
  color: #8f8f8f;
  margin: 0;
}

.report-title {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  width: 100%;
}

.member {
  font-size: 13px;
  color: #8f8f8f;
  margin: 0;
}

.function::-webkit-scrollbar {
  width: 0.4vw;
}

.function::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 1vw;
  background-clip: padding-box;
  border: 0.15vw solid transparent;
}

.function::-webkit-scrollbar-track {
  background-color: grey;
  border-radius: 1vw;
  box-shadow: inset 0px 0px 0.5vw white;
}

.function {
  white-space: normal;
  /* 텍스트가 자동으로 줄 바꿈되게 함 */
  word-wrap: break-word;
  /* 긴 단어가 있을 경우 줄 바꿈 */
  word-break: break-word;
  /* 긴 단어를 강제로 잘라서 줄 바꿈 */
  overflow-wrap: break-word;
  /* 줄 바꿈을 강제함 */
  font-size: 16px;
  color: #000000;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  margin-top: 10px;
}

.scrollable-content {
  max-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
}

.open-btn {
  align-self: center;
  border-radius: 50px;
}

.section1 {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  flex-shrink: 0;
  justify-content: flex-start;
}

.section2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  justify-content: flex-start;
  /* 남은 공간을 채우기 위해 flex-grow 사용 */
}

.section3 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
}

.v-card {
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  cursor: pointer;
}

.v-card:hover .open-btn {
  background-color: rgb(108, 196, 255);
  color: white;
}

.open-btn {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  border-radius: 50px;
}

.custom-card-spacing {
  margin-top: 10px;
}

.search-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1%;
}

.search-card {
  width: 500px;
}

.v-text-field>>>.v-input__append-inner:hover {
  color: #000;
}

.v-text-field>>>.v-input__append-inner .v-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
}

.v-text-field>>>.v-input__append {
  height: 100%;
  width: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
