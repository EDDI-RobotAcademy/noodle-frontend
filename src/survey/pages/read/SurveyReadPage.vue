<template>
    <v-container>
      <v-row>
        <v-col>
          <h1 align="center">문서 검색 서비스 개발을 위한 설문 조사</h1>
        </v-col>
      </v-row>
      <v-container v-if="survey">
        <v-row v-for="(question, index) in survey.questions" :key="index" class="mb-4">
          <v-col>
            <v-card outlined>
              <v-card-title>{{ question }}</v-card-title>
    
              <v-radio-group v-model="answers[index]" :name="`question-${index}`">
                <v-radio
                  v-for="(option, idx) in survey.answers[index]"
                  :key="option"
                  :label="option"
                  :value="idx">
                <template v-slot:label>
                  <span :class="{ 'selected-option': answers[index] === idx }">
                    {{ option }}
                  </span>
                </template>
                </v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="submitSurvey">제출</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { mapActions, mapState } from 'vuex'
const surveyModule = 'surveyModule'
export default {
  props: {
    surveyId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      surveyTitle: '', // 설문조사 이름
      answers: {}, // 사용자의 답안을 저장하는 객체
    };
  },
  computed: {
    ...mapState(surveyModule, ['survey']),
  },
  methods: {
    ...mapActions(surveyModule, ['requestSurveyToDjango','requestCreateAnswerToDjango']),
    async submitSurvey() {
      let answers = Object.values(this.answers)
      const payload = { "surveyId": this.surveyId, "answers": answers }
      console.log(answers)
      await this.requestCreateAnswerToDjango(payload)
      
    }
  },
  async created () {
    await this.requestSurveyToDjango(this.surveyId)
  }
};
</script>

<style scoped>
.selected-option {
  font-weight: 900;
  color: #000000;
  text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.1);
  font-size: calc(1em + 2px);
}

.v-radio .v-label {
  font-size: 1em;
}
</style>