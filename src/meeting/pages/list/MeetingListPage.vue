<template>
  <div class="app-container">
    <h1 class="header">🎄 <span class="gradient-text">회의록</span> 🎄</h1>
    <div class="meeting-minutes">
      <div v-for="record in meetingRecords" :key="record.id" class="record">
        <span class="id">{{ record.id }}</span>
        <span class="title">{{ record.title }}</span>
        <span class="userName">{{ record.userName }}</span>
        <span class="regDate">{{ record.regDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meetingRecords: [
        { id: 1, title: '3주차 스크럼', userName: '한재혁', regDate: '2024-10-08' },
        { id: 2, title: '집에 가고 싶다', userName: '박윤서', regDate: '2024-11-01' },
      ],
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
</style>