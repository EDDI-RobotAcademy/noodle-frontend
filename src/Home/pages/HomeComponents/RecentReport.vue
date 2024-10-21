<template>
  <v-container class="half-width">
    <div class="title-area">
      <div class="active-title">최근보고서</div>
    </div>
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
.title-area {
  display: flex;
  align-items: center;
  background-color: #b4b4b4;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 20px;
}

.active-title {
  background-color: white;
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
  margin-right: 5px;
}

.inactive-title {
  width: 100px;
  height: 30px;
  background-color: #f0d0d0;
  margin-right: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.add-button {
  margin-left: auto;
  background-color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
}

h2 {
  display: none; /* 기존 h2 제목 숨기기 */
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

.half-width {
  max-width: 40%;
  margin-left: auto;
  margin-right: auto;
  height: 72vh; /* 뷰포트 높이의 72%로 설정 (기존 80vh에서 10% 감소) */
  overflow-y: auto;
}

.report-title p,
.function {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.section1,
.section2 {
  width: 30%;
  overflow: hidden;
}
</style>
