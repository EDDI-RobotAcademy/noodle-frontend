<template>
    <v-container>
        <h2 class="center-text">결과 보고서 목록</h2>

        <v-data-table v-model:item-per-page="perPage" :headers="headerTitle" :items="reports"
            v-model:pagination="pagination" class="elevation-1" @click:row="readRow" item-value="resultReportId" />
        <v-pagination v-model="pagination.page" :length="Math.ceil(reports.length / perPage)" color="primary"
            @input="updateItems" />
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useResultReportStore } from '../../stores/resultReportStore';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const resultReportStore = useResultReportStore();
        const router = useRouter();

        const headerTitle = ref(
            [
                { text: '순서', align: 'start', sortable: true, value: 'id' },
                { text: '제목', value: 'title' },
                { text: '작성자', value: 'author' },
                { text: '작성일자', value: 'date' }
            ]
        )
        const perPage = ref(5)
        const pagination = ref(
            {
                page: 1
            }
        )
        // const reports = computed(() => resultReportStore.resultReportList)
        const reports = [
            { id: 1, title: '감자 여행 결과 보고서', author: '김지민', date: '2024-10-14' },
            { id: 2, title: '두 번째 보고서', author: '김철수', date: '2024-10-13' },
        ]
        const pagedItems = computed(() => resultReportStore.resultReportList.slice((pagination.page - 1) * perPage, (pagination.page - 1) * perPage + perPage))
        // 백엔드 접근 방식 완화 필요.

        function readRow(event, { item }) {
            console.log(item.id)
            router.push(`/resultReport/read/${item.id}`)
        }

        // onMounted(() => {
        //     resultReportStore.requestResultReportListToDjango()
        // })

        return {
            headerTitle,
            perPage,
            pagination,
            reports,
            pagedItems,

            readRow
        }
    }
})
</script>