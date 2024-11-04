<template>
  <body bgcolor="black">
    <v-container class="my-auto pa-0"  max-width="900">
      <br/>
      <br/>
      <v-card class="mx-auto my-auto pa-6" outlined elevation="4" rounded :style="mainCardStyle">
        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 프로젝트 제목 섹션 -->
          <v-card-title class="text-h4 font-weight-bold pa-4">
            <h2 class="text-h5 mb-4">프로젝트 제목</h2>
            <v-text-field
              v-model="projectTitle"
              label="프로젝트 제목을 입력해주세요."
              outlined
              dense
            ></v-text-field>
          </v-card-title>
        </v-card>

        <br/>

        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 개요 섹션 -->
          <v-card-title class="text-h4 font-weight-bold pa-4">
            <h2 class="text-h5 mb-4">개요</h2>
            <v-text-field
              v-model="overview"
              label="프로젝트 개요를 입력해주세요."
              outlined
              dense
            ></v-text-field>
          </v-card-title>
        </v-card>

        <br/>

        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 팀 구성 섹션 -->
          <v-card-text>
            <h2 class="text-h5 mb-4">팀 구성</h2>
            <v-row v-for="(member, index) in teamMembers" :key="index" align="center">
              <v-col cols="4">
                <v-text-field
                  v-model="member.department"
                  label="부서"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="member.name"
                  label="이름"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="member.role"
                  label="역할"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn color="error" icon @click="removeTeamMember(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addTeamMember">
              <v-icon>mdi-plus</v-icon>팀원 추가
            </v-btn>
          </v-card-text>
        </v-card>

        <br/>

        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 기술 스택 섹션 -->
          <v-card-text>
            <h2 class="text-h5 mb-4">기술 스택</h2>
            <v-row>
              <v-col v-for="(tech, index) in techStack" :key="index" cols="4">
                <v-card color="#333333" outlined>
                  <v-card-text>
                    <v-text-field
                      v-model="techStack[index]"
                      label="기술명"
                      outlined
                      dense
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="error" icon @click="removeTechStack(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card color='#333333' outlined class="d-flex justify-center align-center" height="174">
                  <v-btn color="#FFF01e" @click="addTechStack">
                    <v-icon>mdi-plus</v-icon> 기술 추가
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <br/>
        
        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 주요 기능 섹션 -->
          <v-card-text>
            <h2 class="text-h5 mb-4">주요 기능</h2>
            <v-timeline dense>
              <v-timeline-item v-for="(feature, index) in features" :key="index" small>
                <template v-slot:opposite></template>
                <v-card bg-color="#333333" outlined>
                  <v-card-text>
                    <v-textarea
                      v-model="features[index]"
                      label="기능 설명"
                      outlined
                      auto-grow
                      dense
                      class="auto-expand-textarea"
                    ></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="error" icon @click="removeFeature(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addFeature">기능 추가</v-btn>
          </v-card-text>
        </v-card>
        <br/>

          <!-- 활용 방안 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
          <v-card-text>
            <h2 class="text-h5 mb-4">활용 방안</h2>
            <v-expansion-panels bg-color="#333333">
              <v-expansion-panel v-for="(usage, index) in usagePlans" :key="index">
                <v-expansion-panel-header>
                  <v-text-field
                    v-model="usage.title"
                    label="활용 방안 제목"
                    outlined
                    dense
                  ></v-text-field>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea
                    v-model="usage.description"
                    label="상세 설명"
                    outlined
                    auto-grow
                    rows="3"
                    hide-details
                    class="auto-expand-textarea"
                  ></v-textarea>
                  <v-btn color="error" @click="removeUsagePlan(index)">삭제</v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addUsagePlan">활용 방안 추가</v-btn>
          </v-card-text>
        </v-card>

        <br/>

        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 보완할 점 섹션 -->
          <v-card-text>
            <h2 class="text-h5 mb-4">보완할 점</h2>
            <v-list>
              <v-list-item v-for="(improvement, index) in improvements" :key="index">
                <v-list-item-content>
                  <v-text-field
                    v-model="improvements[index]"
                    label="보완 사항"
                    outlined
                    dense
                  ></v-text-field>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="error" icon @click="removeImprovement(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addImprovement">보완 사항 추가</v-btn>
          </v-card-text>
        </v-card>
        
        <br/>

        <v-card class="mx-auto mb-6" :style="cardStyle">
          <!-- 완성도 섹션 -->
          <v-card-text>
            <h2 class="text-h5 mb-4">완성도</h2>
            <v-row justify="space-around">
              <v-col v-for="(item, index) in completionRates" :key="index" cols="auto" class="text-center">
                <h3>{{ item.label }}</h3>
                <svg :width="size" :height="size" class="progress-ring">
                  <circle
                    :stroke="'#e0e0e0'"
                    :stroke-width="strokeWidth"
                    fill="transparent"
                    :r="radius"
                    :cx="center"
                    :cy="center"
                  />
                  <circle
                    :stroke="item.color"
                    :stroke-width="strokeWidth"
                    fill="transparent"
                    :r="radius"
                    :cx="center"
                    :cy="center"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="dashOffset(item.rate)"
                  />
                  <text
                    :x="center"
                    :y="center"
                    text-anchor="middle"
                    :fill="item.color"
                    font-size="20"
                    font-weight="bold"
                    dy=".3em"
                  >
                  {{ item.rate }}%
                  </text>
                </svg>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols="12">
                <v-list dense>
                  <v-list-item v-for="(feedback, index) in completionFeedback" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ feedback }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <!-- 등록/취소 버튼 섹션 -->
        <v-row justify="center" class="mt-6">
          <v-col cols="auto">
            <v-btn color="#ffffff" large @click="onSubmit">등록</v-btn>
          </v-col>
          <v-col cols="auto">
            <router-link :to="{ name: 'ResultReportListPage' }">
              <v-btn class="ml-1" color="error">취소</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card>
      <div style="height: 50px"></div>
    </v-container>
  </body>
</template>

<script>
import { mapActions } from 'vuex';
const resultReportModule = 'resultReportModule'
export default {
  data() {
    return {
      projectTitle: '',
      overview: '',
      teamMembers: [],
      techStack: [],
      features: [],
      usagePlans: [],
      improvements: [],
      completionRates: [],
      completionFeedback: [],
      size: 120,
      strokeWidth: 10,
      mainCardStyle: {
        backgroundColor: '#333333',
        borderRadius: '12px',
        color: '#ffffff'
      },
      cardStyle: {
        backgroundColor: '#444444',
        borderColor: '#555555',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
        color: '#ffffff'
      },
      innerCardStyle: {
        backgroundColor: '#555555',
        borderColor: '#666666',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
        color: '#ffffff'
      }
    }
  },
  computed: {
    radius() {
      return (this.size / 2) - (this.strokeWidth / 2);
    },
    center() {
      return this.size / 2;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    }
  },
  methods: {
    addTeamMember() {
      this.teamMembers.push({ department: '', name: '', role: '' });
    },
    removeTeamMember(index) {
      this.teamMembers.splice(index, 1);
    },
    addTechStack() {
      this.techStack.push('');
    },
    removeTechStack(index) {
      this.techStack.splice(index, 1);
    },
    addFeature() {
      this.features.push('');
    },
    removeFeature(index) {
      this.features.splice(index, 1);
    },
    addUsagePlan() {
      this.usagePlans.push({ title: '', description: '' });
    },
    removeUsagePlan(index) {
      this.usagePlans.splice(index, 1);
    },
    addImprovement() {
      this.improvements.push('');
    },
    removeImprovement(index) {
      this.improvements.splice(index, 1);
    },
    submitReport() {
      this.$router.push(`/`)
      console.log('프로젝트 보고서가 등록되었습니다.')
    },
    dashOffset(rate) {
      return this.circumference - (rate / 100 * this.circumference);
    },
    ...mapActions(resultReportModule, ['requestCreateResultReportToDjango']),
    async onSubmit () {
        console.log('작성 완료 버튼 눌렀지 ?')

        const payload = {
            title: this.title,
            overview: this.overview,
            teamMemberList: this.teamMemberList,
            skillList: this.skillList,
            featureList: this.featureList,
            usage: this.usage,
            imporvementList: this.imporvementList,
            completionList: this.completionList,
            userToken: localStorage.getItem("userToken")
        }

        const resultReport = await this.requestCreateResultReportToDjango(payload)
      
        await this.$router.push({
            name: 'ResultReportReadPage',
            params: {resultReportId: resultReport.resultReportId.toString()}
        })
    },
  },
  // async created () {
  // }
}
</script>

<style scoped>
.v-card-title {
  word-break: keep-all;
}

.progress-ring circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.auto-expand-textarea {
  min-height: 100px;
  transition: height 0.3s ease;
}
</style>