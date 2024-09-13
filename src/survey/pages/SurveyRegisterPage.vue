<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 align="center">설 문 조 사</h1>
      </v-col>
    </v-row>

    <!-- 각 질문 추가 -->
    <v-row v-for="(question, index) in questions" :key="index">
      <v-col cols="12">질문 {{ index + 1 }}</v-col>
      <v-col>
        <v-text-field v-model="question.text" label="질문" outlined></v-text-field>

        <v-btn @click="addOption(index)">응답 추가</v-btn>
        <v-col cols="12"></v-col>

        <!-- 옵션 추가 -->
        <v-text-field v-for="(idx, value) in question.options" :key="idx" :v-model="value" label="응답"
          outlined></v-text-field>

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
export default {
  data() {
    return {
      questions: [
        {
          text: "",
          options: [""]
        }
      ]
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({ text: "", options: [""] });
    },
    addOption(index) {
      this.questions[index].options.push("");
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    submitSurvey() {
      const surveyData = {
        title: this.surveyTitle,
        questions: this.questions
      };
      console.log(surveyData);

      // Django로 데이터 전송하는 예시
      // fetch("http://localhost:8000/api/surveys/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(surveyData)
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log("Survey Created:", data);
      //   })
      //   .catch(error => {
      //     console.error("Error:", error);
      //   });
    }
  }
};
</script>