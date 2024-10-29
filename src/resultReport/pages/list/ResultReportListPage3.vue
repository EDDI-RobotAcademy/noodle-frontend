<template>
  <v-container class="report-list-body" fluid>
    <v-row justify="center">
      <v-col cols="12" class="report-list-area">
        <h1>Report List</h1>
        <!-- v-for를 pageItems로 변경 -->
        <v-card 
          v-for="report in pageItems" 
          :key="report.resultReportId" 
          class="custom-card-spacing"
          @click="readRow($event, { item: report })"
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
              <p class="member">구성원: {{ report.writer }}</p>
              <p class="function">주요 기능에 대한 내용</p>
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
          :length="Math.ceil(resultReports.length / perPage)"
          color="primary"
          class="pagination"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toRaw } from 'vue';
import {mapActions, mapState} from 'vuex'

const resultReportModule = 'resultReportModule'

export default{
    computed:{
        // ...mapState(resultReportModule, ['resultReports']),
        pageItems() {
            const startIdx = (this.pagination.page - 1)*this.perPage
            const endIdx = startIdx + this.perPage
            return this.resultReports.slice(startIdx, endIdx)
        }
    },
    async mounted() {
        this.resultReports = await this.requestResultReportListToDjango()
        const reports = []
        for (let i = 0; i < this.resultReports.length; i++) {
            reports.push(this.resultReports[i])
        }
        console.log("resultReports:", reports)
        this.resultReports = toRaw(reports)
        console.log("resultReports:", this.resultReports)
    },
    methods: {
        ...mapActions(resultReportModule, ['requestResultReportListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'ResultReportReadPage',
                params: { resultReportId: item['resultReportId'].toString() }
            })
        }
    },
    data() {
        return{
            resultReports: [],
            headerTitle: [
                {title: 'No', align: 'start', sortable: true, key: 'resultReportId'},
                {title: '제목', align: 'end', key: 'title'},
                {title: '작성자', align: 'end', key: 'writer'},
                {title: '작성일자', align: 'end', key: 'regDate'},
            ],
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

.report-list-area {
  padding-top: 4%;
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

</style>
