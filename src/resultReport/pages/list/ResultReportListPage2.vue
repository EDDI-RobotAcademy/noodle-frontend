<template>
    <v-container>
      <h1>결과 보고서 목록</h1>
      <v-data-table
        :headers="headers"
        :items="reports"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:[`item.title`]="{ item }">
          <a @click="goToReport(item.id)" class="report-link">{{ item.title }}</a>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: '순서', align: 'start', sortable: true, value: 'id' },
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'author' },
          { text: '작성일자', value: 'date' }
        ],
        reports: [
          { id: 1, title: '첫 번째 보고서', author: '홍길동', date: '2024-10-14' },
          { id: 2, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
          // 더 많은 보고서 데이터를 여기에 추가할 수 있습니다.
        ]
      }
    },
    methods: {
        readRow (event, { item }) {
            this.$router.push({
                name: 'ResultReportReadPage',
                params: { resultReportId: item.resultReportId }
            })
        },
      goToReport(id) {
        this.$router.push(`/result-report/read/1`)
        // 예: this.$router.push(`/report/${id}`)
        console.log(`보고서 1로 이동`)
      }
    }
  }
  </script>
  
  <style scoped>
  .report-link {
    color: #1976D2;
    text-decoration: none;
    cursor: pointer;
  }
  .report-link:hover {
    text-decoration: underline;
  }
  </style>
  