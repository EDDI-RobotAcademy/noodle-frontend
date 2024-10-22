<template>
  <v-container class="pa-0">
    <v-card class="mx-auto" max-width="1000">
      <ProjectTitle :projectTitle="projectTitle" />
      <TeamMember :teamMembers="teamMembers" />
      <v-divider></v-divider>
      <TechStack :techStack="techStack" />
      <v-divider></v-divider>
      <MainFeatures :features="features" />
      <v-divider></v-divider>
      <UsagePlans :usagePlans="usagePlans" />
      <v-divider></v-divider>
      <ReportImprovements :reportImprovements="reportImprovements" />
      <v-divider></v-divider>
      <CompletionRates
        :completionRates="completionRates"
        :completionFeedback="completionFeedback"
        :size="size"
        :strokeWidth="strokeWidth"
      />
    </v-card>

    <v-row justify="space-between" class="mt-4 mx-0">
      <v-col cols="auto">
        <v-btn color="primary" large @click="goToList">목록</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" large @click="editReport">수정</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectTitle from '@/resultReport/pages/read/readPageComponents/ProjectTitle.vue'
import TeamMember from '@/resultReport/pages/read/readPageComponents/TeamMember.vue'
import TechStack from '@/resultReport/pages/read/readPageComponents/TechStack.vue'
import MainFeatures from '@/resultReport/pages/read/readPageComponents/MainFeatures.vue'
import UsagePlans from '@/resultReport/pages/read/readPageComponents/UsagePlans.vue'
import ReportImprovements from '@/resultReport/pages/read/readPageComponents/ReportImprovements.vue'
import CompletionRates from '@/resultReport/pages/read/readPageComponents/CompletionRates.vue'

export default {
  name: 'ProjectReport',
  components: {
    ProjectTitle,
    TeamMember,
    TechStack,
    MainFeatures,
    UsagePlans,
    ReportImprovements,
    CompletionRates
  },
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
      reportImprovements: ['성능 최적화 필요'],
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
  methods: {
    goToList() {
      this.$router.push(`/result-report/list2`)
    },
    editReport() {
      this.$router.push(`/result-report/modify/1`)
      console.log('프로젝트 보고서 수정 페이지로 넘어갑니다.')
    },
  }
}
</script>

<style scoped>
.v-card-title {
  word-break: keep-all;
}

.auto-expand-textarea {
  min-height: 100px;
  transition: height 0.3s ease;
}

.v-container {
  max-width: 1000px;
  margin: 0 auto;
}

.table {
  table-layout: fixed;
}
</style>
