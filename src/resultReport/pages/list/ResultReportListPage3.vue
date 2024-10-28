<template>
  <v-container class="report-list-body" fluid>
    <v-row justify="center">
      <v-col cols="12" class="report-list-area">
        <h1>Report List</h1>
        <!-- 실제 보고서 카드 -->
        <v-card 
          v-for="report in paginatedReports" 
          :key="report.id" 
          class="custom-card-spacing"
          @click="goToReport(report.id)"
        >
          <div class="report-content">
            <div class="image">
              
            </div>
            <div class="section1">
              <v-card-title class="department">
                <p>개발3팀</p>
              </v-card-title>
              <v-card-title class="report-title">
                <p class="report-link">{{ report.title }}</p>
              </v-card-title>
            </div>
            <div class="section2">
            <v-card-text >
              <p class="member">구성원: {{ report.author }}</p>
              <p class="function">주요 기능에 대한 내용</p>
            </v-card-text>
            </div>
            <div class="open-button">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>
        
        <!-- 빈 카드 슬롯 -->
        <v-card 
          v-for="n in remainingSlots" 
          :key="`empty-${n}`" 
          class="custom-card-spacing empty-card"
        >
          <div class="report-content invisible">
            <!-- 기존 카드와 동일한 구조를 유지하되 보이지 않게 처리 -->
            <div class="image"></div>
            <div class="section1">
              <v-card-title class="department">
                <p>개발3팀</p>
              </v-card-title>
              <v-card-title class="report-title">
                <p class="report-link">빈 슬롯</p>
              </v-card-title>
            </div>
            <div class="section2">
              <v-card-text>
                <p class="member">구성원: -</p>
                <p class="function">주요 기능에 대한 내용</p>
              </v-card-text>
            </div>
            <div class="open-button">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="updatePage"
          class="pagination"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      reports: [
        { id: 1, title: '감자 여행 결과 보고서', author: ['김지민', '김철수', '김영희'], date: '2024-10-14' },
        { id: 2, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 3, title: '세 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 4, title: '네 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 5, title: '다섯 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 6, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 7, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 8, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 9, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 10, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 11, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 12, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 13, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 14, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 15, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 16, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 17, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        // 더 많은 보고서 데이터를 여기에 추가할 수 있습니다.
      ],
      page: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.reports.length / this.itemsPerPage)
    },
    paginatedReports() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.reports.slice(start, end)
    },
    remainingSlots() {
      const currentPageItems = this.paginatedReports.length
      return this.itemsPerPage - currentPageItems
    }
  },
  methods: {
    goToReport(id) {
      this.$router.push(`/result-report/read/${id}`)
      console.log(`보고서 ${id}로 이동`)
    },
    updatePage(page) {
      this.page = page
    }
  }
}
</script>

<style scoped>

.report-list-body{
  width: 100%;
  background-color: #080808;  
}

.report-list-area{
  padding-top: 4%;
  width: 70%;
  margin: 0 auto;
  flex: none !important;
}

.pagination{
  color: #ffffff;
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

.empty-card {
  visibility: hidden;
  pointer-events: none;
}

.invisible {
  opacity: 0;
}
</style>
