<template>
    <v-container class="pa-0">
      <v-card class="mx-auto" max-width="1000">
        <!-- 프로젝트 제목 섹션 -->
        <v-card-title class="text-h4 font-weight-bold text-center pa-4">
          {{ projectTitle }}
        </v-card-title>
  
        <!-- 팀 구성 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">팀 구성</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>부서</th>
                  <th>이름</th>
                  <th>역할</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in teamMembers" :key="index">
                  <td>{{ member.department }}</td>
                  <td>{{ member.name }}</td>
                  <td>{{ member.role }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <!-- 기술 스택 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">기술 스택</h2>
          <v-chip-group>
            <v-chip v-for="(tech, index) in techStack" :key="index" outlined>
              {{ tech }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <!-- 주요 기능 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">주요 기능</h2>
          <v-list dense>
            <v-list-item v-for="(feature, index) in features" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ feature }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <!-- 활용 방안 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">활용 방안</h2>
          <v-list dense>
            <v-list-item v-for="(usage, index) in usagePlans" :key="index">
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{ usage.title }}</v-list-item-title>
                <v-list-item-title class="mt-2">{{ usage.description }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <!-- 보완할 점 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">보완할 점</h2>
          <v-list dense>
            <v-list-item v-for="(improvement, index) in improvements" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ improvement }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <!-- 완성도 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">완성도</h2>
          <v-row v-for="(item, index) in completionRates" :key="index" class="mb-6" align="center">
            <v-col cols="4" class="text-center">
              <h3 class="mb-2">{{ item.label }}</h3>
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
            <v-col cols="8">
                <v-card-text class="pa-0">
                    {{ completionFeedback[index] }}
                </v-card-text>
            </v-col>
          </v-row>
          <!-- <v-row class="mt-4">
            <v-col cols="12">
              <v-list dense>
                <v-list-item v-for="(feedback, index) in completionFeedback" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ feedback }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                        </v-list>
                    </v-col>
                </v-row> -->
            </v-card-text>
        </v-card>

        <!-- 수정 버튼 -->
        <v-row justify="end" class="mt-4 mr-0">
            <v-col cols="auto">
                <v-btn color="secondary" large @click="editReport">수정</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'ProjectReport',
  data() {
    return {
      projectTitle: '',
      teamMembers: [
        { department: '', name: '', role: '' }
      ],
      techStack: ['Vue.js'],
      features: ['사용자 인증 및 권한 관리'],
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
      strokeWidth: 10
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
      console.log('프로젝트 보고서가 등록되었습니다.')
    },
    dashOffset(rate) {
      return this.circumference - (rate / 100 * this.circumference);
    },
    editReport() {
        console.log('프로젝트 보고서 수정 페이지로 넘어갑니다.')
    },
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

.v-container {
    max-width: 1000px;
    margin: 0 auto;
}
</style>