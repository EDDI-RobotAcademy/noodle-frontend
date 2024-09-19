<template>
    <v-container>
      <v-row>
        <v-col>
          <h1 align="center">문서 검색 서비스 개발을 위한 설문 조사</h1>
        </v-col>
      </v-row>
  
      <v-row v-for="(question, index) in questions" :key="index" class="mb-4">
        <v-col>
          <v-card outlined>
            <v-card-title>{{ question.text }}</v-card-title>
            
            <v-card-text v-if="question.term">
                <template v-for="(c, index) in splitByEnter" :key="index">
                    {{ c }}<br>
                </template>
            </v-card-text>
  
            <v-radio-group v-model="answers[question.id]" :name="`question-${question.id}`">
              <v-radio
                v-for="option in question.options"
                :key="option"
                :label="option"
                :value="option">
              <template v-slot:label>
                <span :class="{ 'selected-option': answers[question.id] === option }">
                  {{ option }}
                </span>
              </template>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-col>
      </v-row>
  
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
      questions: [],
      answers: {} // 사용자의 답안을 저장하는 객체
    };
  },
  computed: {
    ...mapState(surveyModule, ['survey'])
  },
  methods: {
    async submitSurvey() {
      console.log(this.answers)
      // try {
      //   const response = await 

      //   if (response.ok) {
      //     alert('설문조사가 성공적으로 제출되었습니다.');
      //   } else {
      //     alert('제출에 실패했습니다.');
      //   }
      // } catch (error) {
      //   console.error('Error submitting survey:', error);
      // }
    }
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