<template>
  <v-container class="meeting-list-body" fluid>
    <div class="search-container">
      <v-card class="search-card" max-width="500">
        <v-text-field class="searchbox"
          label="검색어를 입력하세요"
          append-icon="mdi-magnify"
          clearable></v-text-field>
      </v-card>
    </div>
    <v-row justify="center">
      <v-col cols="12" class="meeting-list-area">
        <h1>회의록 목록</h1>
        <v-card
          v-for="meeting in pageItems" 
          :key="meeting.meetingId" 
          class="custom-card-spacing"
          @click="readRow($event, { item: meeting })"
        >
          <div class="meeting-content">
            <div class="section1">
              <v-card-text>
                <p class="member">작성자: {{ meeting.writer }}</p>
                <p class="date">생성일자: {{ meeting.regDate }}</p>
              </v-card-text>
            </div>
            <div class="section2">
              <v-card-title class="meeting-title">
                <p class="meeting-link">{{ meeting.title }}</p>
              </v-card-title>
            </div>
            <div class="open-button">
              <v-btn class="open-btn">Open</v-btn>
            </div>
          </div>
        </v-card>
        
        <v-pagination
          v-model="pagination.page"
          :length="Math.ceil(meetings.length / perPage)"
          class="pagination"
          @input="updateItems"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toRaw } from 'vue';
import {mapActions, mapState} from 'vuex'

const meetingModule = 'meetingModule'

export default{
    computed:{
        ...mapState(meetingModule, ['meetings']),
        pageItems(){
            
            const startIdx = (this.pagination.page - 1)*this.perPage
            const endIdx = startIdx + this.perPage
            return this.meetings.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestMeetingListToDjango()
    },
    methods: {
        ...mapActions(meetingModule, ['requestMeetingListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'MeetingReadPage',
                params: { meetingId: item['meetingId'].toString() }
            })
        }
    },
    data(){
        return{
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'meetingId'
                },
                {title: '제목', align: 'end', key: 'title'},
                {title: '작성자', align: 'end', key: 'writer'},
                {title: '작성일자', align: 'end', key: 'regDate'},
            ],
            perPage: 5,
            pagination: {
                page: 1,
            },
            meetings: [
                {
                    meetingId: 1,
                    title: '2024년 1분기 프로젝트 킥오프 미팅',
                    writer: '김철수',
                    regDate: '2024-03-15'
                },
                {
                    meetingId: 2,
                    title: '신규 서비스 기획 회의',
                    writer: '박영희',
                    regDate: '2024-03-14'
                },
                {
                    meetingId: 3,
                    title: '주간 개발팀 스프린트 회의',
                    writer: '이지훈',
                    regDate: '2024-03-13'
                },
                {
                    meetingId: 4,
                    title: 'UI/UX 개선 프로젝트 미팅',
                    writer: '정미영',
                    regDate: '2024-03-12'
                },
                {
                    meetingId: 5,
                    title: '고객 피드백 검토 회의',
                    writer: '강동원',
                    regDate: '2024-03-11'
                },
                {
                    meetingId: 6,
                    title: '2024년 마케팅 전략 회의',
                    writer: '송지은',
                    regDate: '2024-03-10'
                },
                {
                    meetingId: 7,
                    title: '신입 개발자 온보딩 미팅',
                    writer: '홍길동',
                    regDate: '2024-03-09'
                },
                {
                    meetingId: 8,
                    title: '보안 시스템 업데이트 논의',
                    writer: '임수진',
                    regDate: '2024-03-08'
                },
                {
                    meetingId: 9,
                    title: '데이터베이스 구조 개선 회의',
                    writer: '백승호',
                    regDate: '2024-03-07'
                },
                {
                    meetingId: 10,
                    title: '연간 예산 계획 검토 미팅',
                    writer: '최영준',
                    regDate: '2024-03-06'
                }
            ]
        }
    }
}

</script>

<style scoped>
.meeting-list-body {
  width: 100%;
  background-color: #080808;  
}

.searchbox {
  width: 500px;
  height: 50px;
}

.searchbox :deep(.v-input__append) {
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 8px;
}

.meeting-list-area {
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

.meeting-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.image {
  width: 100px;
  height: 90px;
  background-color: #f0f0f0;
}

.meeting-title {
  font-size: 25px;
  font-weight: bold;
  padding-top: 3px;
  padding-bottom: 0px;
  margin-top: 2px;
  color: #000000;
  /* display: block 제거 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.member {
  font-size: 13px;
  color: #8f8f8f;
  padding-bottom: 0;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}

.date {
  font-size: 20px;
  color: #000000;
  padding-top: 3px;
  padding-bottom: 0;
  margin-top: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}

.open-button {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.section1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section2 {
  width: 60%;
  align-items: center;
  padding-right: 20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meeting-link {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
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
  border-radius: 50px;
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

.pagination{
    color: #ffffff;
}
</style>