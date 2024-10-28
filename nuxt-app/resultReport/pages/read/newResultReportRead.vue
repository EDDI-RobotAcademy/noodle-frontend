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
            <CompletionRates :completionRates="completionRates" :completionFeedback="completionFeedback" :size="size"
                :strokeWidth="strokeWidth" />
        </v-card>

        <v-row justify="space-between" class="mt-4 mx-0">
            <v-col cols="auto">
                <v-btn color="primary" large @click="goToList">목록</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="secondary" large disabled @click="editReport">수정</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

import ProjectTitle from './components/ProjectTitle.vue'
import TeamMember from './components/TeamMember.vue'
import TechStack from './components/TechStack.vue'
import MainFeatures from './components/MainFeatures.vue'
import UsagePlans from './components/UsagePlans.vue'
import ReportImprovements from './components/ReportImprovements.vue'
import CompletionRates from './components/CompletionRates.vue'


export default defineComponent({
    components: {
        ProjectTitle,
        TeamMember,
        TechStack,
        MainFeatures,
        UsagePlans,
        ReportImprovements,
        CompletionRates
    },
    setup() {
        const router = useRouter();

        const projectTitle = ref('감자 여행 결과 보고서')
        const teamMembers = ref([
            { department: '개발3팀', name: '김지민', role: '팀장' },
            { department: '개발3팀', name: '이호준', role: '팀원' },
            { department: '개발3팀', name: '이현석', role: '팀원' },
            { department: '개발3팀', name: '정원형', role: '팀원' },
            { department: '개발3팀', name: '정아람', role: '팀원' },

        ])
        const techStack = ref(['Vue.js', 'Python', 'Django', 'FastAPI', 'MySQL'])
        const features = ref(['여행지 추천', '패키지 상품을 통한 손쉬운 예약과 일정 관리', '리뷰 페이지로 확인 가능한 사용자들의 피드백'],)
        const usagePlans = ref([
            {
                title: '서비스 확장',
                description: '현재 서비스를 기반으로 추가 기능을 개발하여 서비스 범위 확대'
            }
        ])
        const reportImprovements = ref(['성능 최적화 필요'])
        const completionRates = ref([
            { label: '보안', rate: 85, color: 'red' },
            { label: '유지보수', rate: 70, color: 'green' },
            { label: '전체', rate: 75, color: 'blue' },
        ])
        const completionFeedback = ref([
            '보안 측면에서 추가적인 암호화 적용이 필요합니다.',
            '유지보수성 향상을 위해 코드 리팩토링이 권장됩니다.',
            '전반적으로 양호하나 일부 기능의 개선이 필요합니다.'
        ])
        const size = ref(120)
        const strokeWidth = ref(10)

        function goToList() {
            router.push(`/resultReport/list`)
        }
        function editReport() {
            // router.push(`/resultReport/modify/${id}`)
            router.push(`/resultReport/modify/1`)
        }

        return {
            projectTitle,
            teamMembers,
            techStack,
            features,
            usagePlans,
            reportImprovements,
            completionRates,
            completionFeedback,
            size,
            strokeWidth,

            goToList,
            editReport,
        }
    }
})
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
