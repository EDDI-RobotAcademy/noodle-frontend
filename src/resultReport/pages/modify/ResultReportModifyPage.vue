<template>
  <body bgcolor="black">
    <v-container class="myauto pa-0" max-width="900">
      <br/>
      <v-card class="mx-auto my-auto pa-6" outlined elevation="4" rounded :style="mainCardStyle">
        <v-card class="mx-auto mb-6" :style="cardStyle">
        <!-- 프로젝트 제목 섹션 -->
          <v-card-title class="text-h4 font-weight-bold pa-4">
            <h2 class="text-h5 mb-4">프로젝트 제목</h2>
            <v-text-field
              v-model="projectTitle"
              label=""
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
              label=""
              outlined
              dense
            ></v-text-field>
          </v-card-title>
        </v-card>

        <br/>

        <!-- 팀 구성 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
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
        
        <!-- 기술 스택 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
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
                <v-card color="#333333" outlined class="d-flex justify-center align-center" height="100%">
                  <v-btn color="#FFF01E" @click="addTechStack">
                    <v-icon>mdi-plus</v-icon> 기술 추가
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <br/>

        <!-- 주요 기능 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
          <v-card-text>
            <h2 class="text-h5 mb-4">주요 기능</h2>
            <v-timeline dense>
              <v-timeline-item v-for="(feature, index) in features" :key="index" small>
                <template v-slot:opposite></template>
                <v-card color="#333333" outlined>
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

        <!-- 보완할 점 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
          <v-card-text>
            <h2 class="text-h5 mb-4">보완할 점</h2>
            <v-list bg-color="#333333">
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

        <!-- 완성도 섹션 -->
        <v-card class="mx-auto mb-6" :style="cardStyle">
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
                <v-list bg-color="#333333" dense>
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
      </v-card>

        <v-row justify="space-between" class="mt-4 mx-0">
            <!-- 취소 버튼 -->
            <v-col cols="auto">
                <v-btn color="error" large @click="goToRead">취소</v-btn>
            </v-col>
            <!-- 수정 버튼 -->
        
            <v-col cols="auto">
                <v-btn color="#FFF01E" large @click="submitReport">수정</v-btn>
            </v-col>
        </v-row>
    </v-container>
  </body>
</template>

<script>
export default {
  name: 'ProjectReport',
  data() {
    return {
      projectTitle: '감자 여행 결과 보고서',
      teamMembers: [
        { department: '개발3팀', name: '김지민', role: '팀장' },
        { department: '개발3팀', name: '이호준', role: '팀원' },
        { department: '개발3팀', name: '이현석', role: '팀원' },
        { department: '개발3팀', name: '정원형', role: '팀원' },
        { department: '개발3팀', name: '정아람', role: '팀원' },
      ],
      techStack: ['Vue.js', 'Python', 'Django', 'FastAPI'],
      features: ['여행지 추천', '패키지 상품을 통한 손쉬운 예약과 일정 관리', '리뷰 페이지로 확인 가능한 사용자들의 피드백'],
      usagePlans: [
        {
          title: '서비스 확장',
          description: '현재 서비스를 기반으로 추가 기능을 개발하여 서비스 범위 확대'
        }
      ],
      improvements: ['성능 최적화 필요'],
      completionRates: [
        { label: '보안', rate: 85, color: 'red' },
        { label: '유지보수', rate: 70, color: 'green' },
        { label: '전체', rate: 75, color: 'blue' },
      ],
      completionFeedback: [
        '보안 측면에서 추가적인 암호화 적용이 필요합니다.',
        '유지보수성 향상을 위해 코드 리팩토링이 권장됩니다.',
        '전반적으로 양호하나 일부 기능의 개선이 필요합니다.'
      ],
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
    goToRead() {
      this.$router.push(`/result-report/read/1`)
    },
    submitReport() {
      this.$router.push(`/result-report/read/12`)
      console.log('프로젝트 보고서가 등록되었습니다.')
    },
    dashOffset(rate) {
      return this.circumference - (rate / 100 * this.circumference);
    }
  }
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

.custom-button-position {
  margin-right: 100px;
}
</style>