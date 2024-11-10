<template>
    <div class="app-container">
        <h1 class="header">🎄 <span class="gradient-text">{{ title }}</span> 🎄</h1>
        <div class="meeting-detail">
            <div class="meeting-info">
                <p class="meeting-author">작성자: {{ writer }}</p>
                <p class="meeting-date">등록일: {{ regDate }}</p>
            </div>
            <div class="meeting-content">
                <div class="content-box">
                    {{ content }}
                </div>
            </div>
            <router-link to="/meeting/list" class="back-button">목록으로 돌아가기</router-link>
        </div>
    </div>
</template>
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

.meeting-detail {
    background-color: #146b3a;
    padding: 20px;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 800px;
    color: #ffd700;
}

.meeting-info {
    text-align: right;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.meeting-author {
    margin: 0 0 5px 0;
    color: #c41e3a;
    font-weight: bold;
}

.meeting-date {
    margin: 0;
    color: #ffd700;
}

.meeting-content {
    margin: 20px 0;
}

.meeting-content h3 {
    color: #ffd700;
    margin-bottom: 10px;
}

.content-box {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 4px;
    min-height: 200px;
    color: white;
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #c41e3a;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.back-button:hover {
    background-color: #a01830;
}
</style>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMeetingStore } from '../../stores/meetingStore';

export default defineComponent({
    setup() {
        const route = useRoute()
        const meetingStore = useMeetingStore();

        const title = ref('')
        const writer = ref('')
        const regDate = ref('')
        const content = ref('')
        const id = ref(route.params.id)
        const userToken = ref(null)

        async function loadData(token, id) {
            const response = await meetingStore.requestMeetingToDjango(token, Number(id))
            title.value = response.meetingRecordingSummary.title
            writer.value = response.meetingRecordingSummary.writer
            regDate.value = response.meetingRecordingSummary.regDate
            content.value = response.meetingRecordingSummary.content
        }

        onMounted(async () => {
            userToken.value = localStorage.getItem('userToken')
            await loadData(userToken.value, id.value)
        })

        return {
            title,
            writer,
            regDate,
            content,
            id,
        }
    }
})
</script>