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
  export default {
    data() {
      return {
        surveyTitle: '', // 설문조사 이름
        term: `백로그란 개발 과정에서 구현을 마친 기능이나, 구현해야 하는 기능, 해결해야 하는 기능 등의 목록을 뜻합니다.\n기본적으로 하나의 백로그에 하나의 기능만 작성하는 것이 원칙입니다.`,
        questions: [
          {
            id: 1,
            text: "1. 문서 검색 서비스를 사용해보신 경험이 있습니까?",
            options: ["있다", "없다"],
          },
          {
            id: 2,
            text: "2. 문서 검색 서비스에서 가장 중요하다고 생각하는 부분을 선택해주세요.",
            options: ["사용성이 좋은 UI", "편리한 기능", "업무와의 연동성", "서비스를 이용하는 유저의 수"]
          },
          {
            id: 3,
            text: "3. 백로그를 검색하고 관리하는 서비스가 생긴다면 사용하실 의향이 있습니까?",
            options: ["있다", "없다"],
            term: true
          },
          {
            id: 4,
            text: "4. 백로그를 검색하고 관리하는 서비스에 가장 필요한 기능은 무엇이라고 생각하시나요?",
            options: [
                "GitHub와 연동을 통해 Commit 내역을 분석한 후 백로그 제목 자동 생성 기능",
                "코드의 맥락을 이해하여 잠재적인 문제점 제시", 
                "협업 시 동일한 기능의 코드가 존재하는 경우에 알림 제공",
                "작성한 백로그가 두 개의 백로그로 나누어지는 것이 좋다고 판단되면 두 개의 백로그로 나누어 작성해줌"
            ],
            term: true
          },
          {
            id: 5,
            text: "5. 4번 문항에 선택하신 기능이 있다면 사용하실 의향이 있습니까?",
            options: ["있다", "없다"],
          },
        ],
        answers: {} // 사용자의 답안을 저장하는 객체
      };
    },
    computed: {
        splitByEnter: function () {
            return this.term.split("\n")
        }
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
