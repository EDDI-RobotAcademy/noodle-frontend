<template>
  <v-container>
    <h2>최근 보고서</h2>
    <v-row justify="center">
      <v-col cols="12">
        <v-card 
          v-for="report in recentReports" 
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
              <p class="function">ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ</p>
            </v-card-text>
            </div>
            <div class="open-button">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RecentReport',
  data() {
    return {
      reports: [
        { id: 1, title: '감자 여행 결과 보고서', author: ['김지민', '김철수', '김영희'], date: '2024-10-14' },
        { id: 2, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 3, title: '세 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 4, title: '네 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 5, title: '다섯 번째 보고서', author: '김철수', date: '2024-10-13' },
        { id: 6, title: '여섯 번째 보고서', author: '김철수', date: '2024-10-13' },
      ]
    }
  },
  computed: {
    recentReports() {
      return this.reports.slice(0, 6)
    }
  },
  methods: {
    goToReport(id) {
      this.$router.push(`/result-report/read/${id}`)
      console.log(`보고서 ${id}로 이동`)
    }
  }
}
</script>

<style scoped>
// ... (이전과 동일한 스타일 코드)
</style>
