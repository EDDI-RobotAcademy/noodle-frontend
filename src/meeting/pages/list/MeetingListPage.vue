<template>
  <div class="app-container">
    <h1 class="header">🎄 <span class="gradient-text">회의록</span> 🎄</h1>
    <div class="meeting-minutes">
      <div v-for="record in meetingRecords" :key="record.id" class="record"
        @click="readRow($event, { item: record})">
        <span class="id">{{ record.id }}</span>
        <span class="title">{{ record.title }}</span>
        <span class="userName">{{ record.writer }}</span>
        <span class="regDate">{{ record.regDate }}</span>
      </div>
    </div>

    <v-pagination
      v-model="pagination.page"
      :length="totalPages"
      color="primary"
      class="pagination"
      @input="fetchMeetings"></v-pagination>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { mapActions} from 'vuex'
const meetingModule = 'meetingModule'

export default {
  async mounted() {
    await this.fetchMeetings()
  },
  methods: {
    ...mapActions(meetingModule, ['requestMeetingListToDjango']),
    readRow (event, { item }) {
      this.$router.push({
        name: 'MeetingReadPage',
        params: { meetingId: item['meetingId'].toString() }
      })
    },
    async fetchMeetings() {
      const { page } = this.pagination
      // const searchQuery = this.searchQuery.trim()

      const payload = { page, perPage: this.perPage }
      console.log('payload:', payload)
      try {
        const res = await this.requestMeetingListToDjango(payload)
        console.log('fetchMeetings() res:', res)
        this.meetings = toRaw(res.meetings)
        this.totalPages = Math.ceil(res.totalCount / this.perPage)
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error)
      }
    }
  },
  data() {
    return {
      meetings: [],
      perPage: 5,
      pagination: {
        page: 1
      }
    };
  }
};
</script>

<style scoped>
.app-container {
  background-color: #323131;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.header {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #ffd700;
}

.gradient-text {
  background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.meeting-minutes {
  background-color: #146b3a;
  padding: 15px;
  border-radius: 8px;
  position: relative;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.record {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #1d8a4a;
}

.record:last-child {
  border-bottom: none;
}

.id { 
  width: 10%;
  color: #ffd700;
}

.title { 
  width: 40%;
  color: #ffd700;
}

.userName { 
  width: 25%;
  color: #c41e3a;
  font-weight: bold;
}

.regDate { 
  width: 25%;
  color: #ffd700;
}

.title {
  width: 40%;
  color: #ffd700;
  text-decoration: none;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}
</style>