<template>
  <v-container class="report-list-body" fluid>
    <div class="search-container">
      <v-card class="search-card" max-width="500">
        <v-text-field class="searchbox"
          v-model="searchQuery"
          label="검색어를 입력하세요"
          v-on:keyup.enter="fetchResultReports"
          append-icon="mdi-magnify"
          @click:append="fetchResultReports"
          clearable></v-text-field>
      </v-card>
    </div>
    <v-row justify="center">
      <v-col cols="12" class="report-list-area">
        <h1>Report List</h1>
        <!-- v-for를 pageItems로 변경 -->
        <v-card
          v-for="report in resultReports" 
          :key="report.resultReportId" 
          class="custom-card-spacing"
          @click="readRow($event, { item: report })"
        >
          <div class="report-content">
            <div class="image">
              
            </div>
            <div class="section1">
              <v-card-title class="department">
                <p>{{ report.creatorDepartment }}</p>
              </v-card-title>
              <v-card-title class="report-title">
                <p class="report-link">{{ report.resultReportTitle }}</p>
              </v-card-title>
            </div>
            <div class="section2">
            <v-card-text >
              <p class="member">담당자: {{ report.creator }}</p>
              <p class="function">기능: {{ report.resultReportFeature }}</p>
            </v-card-text>
            </div>
            <div class="open-button">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>
        
        <!-- 페이지네이션 업데이트 -->
        <v-pagination
          v-model="pagination.page"
          :length="totalPages"
          color="primary"
          class="pagination"
          @input="fetchResultReports"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SearchBox from '@/resultReport/pages/list/listComponents/SearchBox.vue';
import { toRaw } from 'vue';
import {mapActions, mapState} from 'vuex'

const resultReportModule = 'resultReportModule'

export default{
    name: 'ResultReportList',
    // components: {
    //   SearchBox,
    // },
    computed:{
        // ...mapState(resultReportModule, ['resultReports']),
        // pageItems() {
        //     const startIdx = (this.pagination.page - 1)*this.perPage
        //     const endIdx = startIdx + this.perPage
        //     return this.resultReports.slice(startIdx, endIdx)
        // }
    },
    async mounted() {
        await this.fetchResultReports()
    },
    methods: {
        ...mapActions(resultReportModule, ['requestResultReportListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'ResultReportReadPage',
                params: { resultReportId: item['resultReportId'].toString() }
            })
        },
        async fetchResultReports() {
          const { page } = this.pagination
          const searchQuery = this.searchQuery.trim()

          const payload = { page, perPage: this.perPage, searchQuery }
          console.log('payload:', payload)
          try {
            const res = await this.requestResultReportListToDjango(payload)
            console.log('fetchResultReports() res:', res)
            this.resultReports = toRaw(res.resultReports)
            this.totalPages = Math.ceil(res.totalCount / this.perPage)
          } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error)
          }
        }
    },
    data() {
        return{
            resultReports: [],
            searchQuery: '',
            perPage: 5,
            pagination: {
                page: 1
            }
        }
    }
}

</script>

<style scoped>

.report-list-body{
  width: 100%;
  background-color: #080808;  
}

.searchbox {
  width: 500px;
  height: 50px;
}

.report-list-area {
  padding-top: 2%;
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

.report-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.image {
  width: 100px;
  height: 90px;
  background-color: #f0f0f0;
}

.department {
  font-size: 13px;
  color: #8f8f8f;
  padding-bottom: 0;
}

.report-title {
  font-size: 25px;
  font-weight: bold;
  padding-top: 3px;
  padding-bottom: 0px;
  margin-top: 2px;
  color: #000000;
}

.member{
  font-size: 13px;
  color: #8f8f8f;
  padding-bottom: 0;
  margin-bottom: 5px;
}

.function{
  font-size: 20px;
  color: #000000;
  padding-top: 3px;
  padding-bottom: 0;
  margin-top: 0;
}

.open-button {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.section1{
  width: 25%;
  align-items: center;
}

.section2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.v-card {
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transform: translateY(-5px);
  cursor: pointer;
}

.v-card:hover .open-btn {
  background-color: rgb(108, 196, 255);
  color: white;
}

.open-btn {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  border-radius:50px;
}

.custom-card-spacing {
  margin-bottom: 25px;
}

.search-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 15%;
  padding-top: 1%;
}

.search-card {
  width: 500px;
}

/* .v-text-field >>> .v-input__append-inner {
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80px;
  min-width: 48px;
} */

.v-text-field >>> .v-input__append-inner:hover {
  color: #000;
}

/* 추가: 아이콘 컨테이너 자체의 정렬 */
.v-text-field >>> .v-input__append-inner .v-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
}

/* 추가: append 영역 전체 높이 설정 */
.v-text-field >>> .v-input__append {
  height: 100%;
  width: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
