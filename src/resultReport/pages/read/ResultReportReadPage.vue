<template>
    <v-container class="pa-0">
      <v-card class="mx-auto" max-width="1000">
        <!-- 프로젝트 제목 섹션 -->
        <v-card-title class="text-h4 font-weight-bold text-center pa-4">
          {{ projectTitle }}
        </v-card-title>

        <!-- 개요 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">개요</h2>
          <v-list dense>
            <v-list-item v-for="(overview, index) in overviews" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ overview }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>
  
        <!-- 팀 구성 섹션 -->
        <v-card-text>
          <h2 class="text-h5 mb-4">팀 구성</h2>
          <v-simple-table class="team-table">
            <template v-slot:default>
              <!-- <thead>
                <tr>
                  <th style="equal-width">부서</th>
                  <th style="equal-width">이름</th>
                  <th style="equal-width">역할</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="(member, index) in teamMembers" :key="index">
                  <td class="equal-width">{{ member.department }}</td>
                  <td class="equal-width">{{ member.name }}</td>
                  <td class="equal-width">{{ member.role }}</td>
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
                  :stroke="item[3]"
                  :stroke-width="strokeWidth"
                  fill="transparent"
                  :r="radius"
                  :cx="center"
                  :cy="center"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="dashOffset(item[1])"
                />
                <text
                  :x="center"
                  :y="center"
                  text-anchor="middle"
                  :fill="item[3]"
                  font-size="20"
                  font-weight="bold"
                  dy=".3em"
                >
                {{ item[1] }}%
                </text>
              </svg>
            </v-col>
            <v-col cols="8">
                <v-card-text class="pa-0">
                    {{ item[2] }}
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

        <v-row justify="end" class="mt-4 mx-0">
            <!-- 수정 버튼 -->
            <v-col cols="auto">
              <router-link :to="{ name: 'ResultReportModifyPage', params: {resultReportId} }">
                <v-btn color="primary">수정</v-btn>
              </router-link>
            </v-col>

            <!-- 삭제 버튼 -->
            <v-col cols="auto">
              <v-btn color="error" @click="onDelete">삭제</v-btn>
            </v-col>

            
            <!-- 목록 버튼 -->
            <v-col cols="auto">
              <router-link :to="{ name: 'ResultReportListPage' }">
                <v-btn color="secondary">목록</v-btn>
              </router-link>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'
const resultReportModule = 'resultReportModule'
export default {
  props: {
    resultReportId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      projectTitle: '',
      overviews: '',
      teamMembers: [],
      techStack: [],
      features: [],
      usagePlans: [],
      improvements: [],
      completionRates: [],
      size: 120,
      strokeWidth: 10
    }
  },
  computed: {
    ...mapState(resultReportModule, ['resultReport']),
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
    dashOffset(rate) {
      return this.circumference - (rate / 100 * this.circumference);
    },
    ...mapActions(resultReportModule, ['requestResultReportToDjango', 'requestDeleteResultReportToDjango']),
    async onDelete() {
      console.log('삭제를 누르셨습니다!')
      await this.requestDeleteResultReportToDjango(this.resultReportId)
      await this.$router.push({name: 'ResultReportListPage'})
    }
  },
  async created () {
    this.resultReport = await this.requestResultReportToDjango(this.resultReportId)
    this.projectTitle = this.resultReport.title
    this.overviews = this.resultReport.overview
    this.teamMembers = this.resultReport.teamMemberList
    this.techStack = this.resultReport.skillList
    this.features = this.resultReport.featureList
    this.usagePlans = this.resultReport.usage
    this.improvements = this.resultReport.improvementList
    this.completionRates = this.resultReport.completionList
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

.team-table {
  width: 100%;
}

.equal-width {
  width: 33.33%;
  padding: 12px;
  text-align: center;
}

.table {
  table-layout: fixed;
}
</style>