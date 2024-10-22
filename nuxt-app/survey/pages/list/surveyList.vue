<template lang="">
    <v-container>
        <h2 class="center-text">설문조사 주차별 리스트</h2>
        <div style="text-align: left; margin: 15px;">
            <v-btn @click="goToRegisterPage">
                게시물 작성
            </v-btn>
            
        </div>
        <v-data-table
                v-model:item-per-page="perPage"
                :headers="headerTitle"
                :items="pageItems"
                v-model:pagination="pagination"
                class="elevation-1"
                @click:row="readRow"
                item-value="surveyId"/> 
            <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(numberList.length / perPage)"
                color="primary"
                @input="updateItems"/>
    </v-container>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useSurveyStore } from '../../store/surveyStore';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const surveyStore = useSurveyStore();
        const router = useRouter();

        const headerTitle = ref([
            {
                title: 'No',
                align: 'start',
                sortable: true,
                key: 'index'
            },
            {
                title: 'Survey ID',
                align: 'start',
                sortable: true,
                key: 'surveyId'
            },
        ])
        const perPage = ref(5)
        const pagination = ref({
            page: 1
        })
        const numberList = ref([])
        const pageItems = computed(() => {
            return numberList.value.slice((pagination.value.page - 1) * perPage.value, pagination.value.page * perPage.value).map((id, index) => ({
                index: (pagination.value.page - 1) * perPage.value + index + 1,
                surveyId: id
            }))
        })

        function readRow(event, { item }) {
            router.push(`/survey/read/${item.surveyId}`)
        }
        function goToRegisterPage() {
            router.push(`/survey/register`)
        }

        onMounted(async () => {
            const response = await surveyStore.requestSurveyListToDjango()
            numberList.value = toRaw(response.surveyIdList)
        })

        return {
            headerTitle,
            perPage,
            pagination,
            numberList,
            pageItems,

            readRow,
            goToRegisterPage,
        }
    }
})
</script>

<style>
.center-text {
    text-align: center;
}
</style>