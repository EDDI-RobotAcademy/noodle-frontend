<template>
    <div class="app-container">
        <h1 class="header">🎄 <span class="gradient-text">회의록</span> 🎄</h1>
        <div class="meeting-minutes">
            <div v-for="record in meetings" :key="record.id" class="record" @click="readRow($event, { item: record })">
                <span class="id">{{ record.id }}</span>
                <span class="title">{{ record.title }}</span>
                <span class="userName">{{ record.writer }}</span>
                <span class="regDate">{{ record.regDate }}</span>
            </div>
        </div>

        <v-pagination v-model="pagination.page" :length="totalPages" color="primary" class="pagination"
            @input="fetchMeetings"></v-pagination>
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

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeetingStore } from '../../stores/meetingStore';

export default defineComponent({
    setup() {
        const router = useRouter();
        const meetingStore = useMeetingStore();

        const meetings = ref([])
        const totalPages = computed(() => Math.ceil(totalCount.value / perPage.value))
        const perPage = ref(10)
        const pagination = ref({
            page: 1
        })
        const userToken = ref(null)
        const totalCount = ref(1)

        async function fetchMeetings(token) {
            const { page } = pagination.value

            try {
                const response = await meetingStore.requestMeetingListToDjango(page, perPage.value)
                console.log(response)
                meetings.value = toRaw(response.meetingRecordingSummaryList.reverse())
                totalCount.value = response.totalCount
            } catch (error) {
                console.error('데이터 로드 중 오류 발생', error)
            }
        }
        function readRow(event, { item }) {
            router.push(`/meeting/read/${item.id}`)
        }

        watch(pagination.value, (index) => {
            fetchMeetings(userToken.value)
        })

        onMounted(async () => {
            userToken.value = localStorage.getItem('userToken')
            await fetchMeetings(userToken.value)
        })

        return {
            meetings,
            perPage,
            pagination,
            totalPages,

            fetchMeetings,
            readRow
        }
    }
})
</script>