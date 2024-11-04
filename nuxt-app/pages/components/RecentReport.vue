<template>
  <v-container class="half-width">
    <div style="color: #ffffff" class="active-title">최근 보고서</div>
    <v-row>
      <v-col v-for="report in recentReports" :key="report.id" cols="12" sm="6">
        <v-card style="border-radius: 15px 15px 15px 15px;" @click="goToReport(report.id)" color="#1f1f1f">
          <v-img 
              src="/public/fixed/python_logo.png"
              style="position: absolute; top: 50%; left: 0; transform: translateY(-50%);"
          />
          <v-card-text class="report-content">
            <div class="report-info">
              <v-card-subtitle class="department" style="color: rgb(255, 240, 30)">개발3팀</v-card-subtitle>
              <v-card-title class="report-title" style="color: #ffffff">{{ report.title }}</v-card-title>
              <v-card-subtitle class="member" style="color: rgb(255, 240, 30)">구성원: {{ report.author }}</v-card-subtitle>
              <v-card-text class="function" style="color: #ffffff">보고서 내용 출력</v-card-text>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RecentReport',
  setup() {
    const router = useRouter();

    const reports = ref([
      { id: 1, title: '감자 여행 결과 보고서', author: ['김지민', '김철수', '김영희'], date: '2024-10-14' },
      { id: 2, title: '없는 보고서', author: '김철수', date: '2024-10-13' },
      { id: 3, title: '없는 보고서', author: '김철수', date: '2024-10-13' },
      { id: 4, title: '없는 보고서', author: '김철수', date: '2024-10-13' },
      { id: 5, title: '없는 보고서', author: '김철수', date: '2024-10-13' },
      { id: 6, title: '없는 보고서', author: '김철수', date: '2024-10-13' },
    ])
    const recentReports = computed(() => reports.value.slice(0, 4))

    function goToReport(id) {
      router.push(`/resultReport/read/${id}`)
    }

    return {
      reports,
      recentReports,

      goToReport,
    }
  }
})
</script>

<style scoped>
.title-area {
  display: none;
}

.active-title {
  display: inline-block;
  background-color: #1f1f1f;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 15px 15px 0px 0px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

}

.inactive-title {
  width: 100px;
  height: 30px;
  background-color: #f0d0d0;
  margin-right: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

h2 {
  display: none;
}

.report-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.image-container {
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.image {
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
}

.report-info {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.report-info>* {
  padding: 0 !important;
  margin: 0;
}

.department,
.member,
.report-title,
.function {
  text-align: left;
  width: 100%;
}

.report-title {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.function {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card {
  height: 100%;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.open-btn {
  display: none;
}

.section1,
.section2 {
  width: auto;
}

.v-card {
  height: auto;
  height: 180px;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.v-card:hover .open-btn {
  background-color: rgb(108, 196, 255);
  color: white;
}

.open-btn {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  border-radius: 50px;
}

.half-width {
  width: 40%;
  height: auto;
  overflow-y: visible;
}

.report-title,
.function {
  font-size: 25px;
  font-weight: bold;
  padding-top: 3px;
  padding-bottom: 0;
  margin-top: 2px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.section1 {
  width: 25%;
  align-items: center;
}

.section2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
