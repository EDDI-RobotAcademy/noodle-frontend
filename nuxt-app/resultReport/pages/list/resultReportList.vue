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
    head() {
        return {
            title: 'AI를 활용한 코드 기반 결과 보고서 생성 - NOODLE',
            meta: [
                {
                    name: 'description',
                    content: 'Noodle을 통해 GitHub 코드에서 개발 보고서를 자동으로 생성하고 프로젝트를 효과적으로 관리하세요. 코드 기반 보고서 생성을 통해 개발 효율성을 극대화하세요.'
                },
                {
                    name: 'keywords',
                    content: 'AI, LLM, 코드 기반 보고서 생성, 보고서 생성, 프로젝트 관리, NOODLE, GitHub 연동, 보고서 관리, LLM, AI 생성'
                },
                {
                    property: 'og:title',
                    content: 'AI를 활용한 코드 기반 보고서 생성 - NOODLE'
                },
                {
                    property: 'og:description',
                    content: 'NOODLE을 통해 GitHub 코드에서 개발 보고서를 자동으로 생성하고 프로젝트를 효과적으로 관리하세요. 코드 기반 보고서 생성을 통해 개발 효율성을 극대화하세요.'
                },
                {
                    property: 'og:image',
                    content: '/public/fixed/NOODLE_logo.png'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'twitter:title',
                    content: 'NOODLE | Use Your Noodle!'
                },
                {
                    name: 'twitter:description',
                    content: 'NOODLE을 통해 GitHub 코드에서 개발 보고서를 자동으로 생성하고 프로젝트를 효과적으로 관리하세요.'
                },
                {
                    name: 'twitter:image',
                    content: '/public/fixed/NOODLE_logo.png'
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: 'https://noo-dle.com/resultReport/list'
                }
            ]
        };
    },

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