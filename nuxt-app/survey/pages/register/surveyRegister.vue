<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 align="center">설 문 조 사</h1>
            </v-col>
        </v-row>

        <!-- 주차 정보 -->
        <v-row>
            <v-col cols="12">주차 정보</v-col>
            <v-col>
                <v-text-field label="몇주차임?" outlined v-model="week" @input="convertToNumber"></v-text-field>
            </v-col>
        </v-row>

        <!-- 각 질문 추가 -->
        <v-row v-for="(question, index) in qna" :key="index">
            <v-col cols="12">질문 {{ index + 1 }}</v-col>
            <v-col>
                <v-text-field v-model="question.text" label="질문" outlined></v-text-field>

                <v-btn @click="addOption(index)">응답 추가</v-btn>
                <v-col cols="12"></v-col>

                <!-- 옵션 추가 -->
                <v-text-field v-for="(option, optionIndex) in question.options" :key="optionIndex"
                    v-model="question.options[optionIndex]" :label="`응답${optionIndex + 1}`" outlined></v-text-field>

                <v-btn color="red" @click="removeQuestion(index)">질문 제거</v-btn>
            </v-col>
        </v-row>

        <v-col cols="12"></v-col>
        <v-row>
            <v-col>
                <v-btn color="green" @click="addQuestion">질문 추가</v-btn>
            </v-col>
            <v-col class="text-right">
                <v-btn color="primary" @click="submitSurvey">제출</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useSurveyStore } from '../../store/surveyStore';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const surveyStore = useSurveyStore();
        const router = useRouter();

        const week = ref('')
        const qna = ref([
            {
                text: "",
                options: [""]
            }
        ])
        const questions = ref([])
        const answers = ref([])

        function addQuestion() {
            qna.value.push({ text: "", options: [""] })
        }
        function addOption(index) {
            qna.value[index].options.push("")
        }
        function removeQuestion(index) {
            qna.value.splice(index, 1)
        }
        function convertToNumber() {
            week.value = Number(week.value)
        }
        async function submitSurvey() {
            const rawData = ref(toRaw(qna.value))
            for (let i = 0; i < rawData.value.length; i++) {
                questions.value.push(rawData.value[i].text)
                answers.value.push(rawData.value[i].options)
            }

            const rawQ = toRaw(questions.value)
            const rawA = toRaw(answers.value)
            const surveyData = {
                surveyId: week.value,
                questions: rawQ,
                answers: rawA,
            }

            const response = await surveyStore.requestCreateSurveyToDjango(surveyData)
            const surveyId = response.response

            await router.push(`/survey/read/${surveyId.toString()}`)
        }

        return {
            week,
            qna,
            questions,
            answers,

            addQuestion,
            addOption,
            removeQuestion,
            convertToNumber,
            submitSurvey,
        }
    }
})
</script>