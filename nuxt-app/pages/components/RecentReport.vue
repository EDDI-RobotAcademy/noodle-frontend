<template>
  <v-container class="half-width">
    <div style="color: #ffffff" class="active-title">최근 보고서</div>
    <v-row>
      <v-col v-for="report in recentReports" :key="report.id" cols="12" sm="6">
        <v-card style="border-radius: 15px;" @click="goToReport(report.id)" color="#1f1f1f">
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
.half-width {
  width: 40%;
  height: 80vh;
  overflow-y: auto;
  max-width: 800px;
  min-width: 300px;
}

.active-title {
  display: inline-block;
  background-color: #1f1f1f;
  color: #333;
  font-size: 2vh;
  font-weight: 600;
  padding: 1vh 1.5vh;
  border-radius: 2vh 2vh 0 0;
  margin-bottom: 2vh;
  box-shadow: 0 0.1vh 0.3vh rgba(0, 0, 0, 0.1);
}

.inactive-title {
  width: 12vh;
  height: 4vh;
  background-color: #f0d0d0;
  margin-right: 1.5vh;
  border-top-left-radius: 1.5vh;
  border-top-right-radius: 1.5vh;
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
  width: 10vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2vh;
  flex-shrink: 0;
}

.image {
  width: 10vh;
  height: 10vh;
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
  font-size: 2.5vh;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.4vh;
  margin-top: 0.3vh;
}

.function {
  font-size: 1.8vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card {
  height: 20vh;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  border-radius: 2vh;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-0.7vh);
}

.open-btn {
  display: none;
  border-radius: 6vh;
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
  max-width: 800px;
  min-width: 300px;
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



@media (max-width: 1200px) {
  .half-width {
    width: 50%;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .half-width {
    width: 100%;
    height: 60vh;
    max-width: 500px;
    margin: 0 auto;
  }

  .report-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .v-col {
    sm: 12;
  }

  .report-image {
    position: static;
    transform: none;
    margin-bottom: 1.5vh;
  }

  .v-card {
    height: 15vh;
  }

  .report-title {
    font-size: 2.2vh;
  }

  .function {
    font-size: 1.6vh;
  }
}

@media (max-width: 480px) {
  .active-title {
    font-size: 1.8vh;
    padding: 0.6vh 1.2vh;
  }

  .report-title {
    font-size: 2vh;
  }

  .function {
    font-size: 1.4vh;
  }

  .half-width {
    height: 50vh;
  }

  .v-card {
    height: 12vh;
  }
}
</style>
