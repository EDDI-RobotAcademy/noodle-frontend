<template>

    <body bgcolor="black" style="height:95vh">
        <v-container class="my-auto pa-0" max-width="900">
            <br />
            <v-card class="main-card mx-auto my-auto pa-6" outlined elevation="4" rounded>
                <ProjectTitle :projectTitle="projectTitle" />
                <v-divider></v-divider>
                <OverView :overview="overview" />
                <v-divider></v-divider>
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
                <CompletionRates :completionRates="completionRates" :completionFeedback="completionFeedback"
                    :size="size" :strokeWidth="strokeWidth" />
            </v-card>

            <v-row justify="space-between" class="mt-4 mx-0">
                <v-col cols="auto">
                    <v-btn color="#ffffff" large @click="goToList">목록</v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn color="#FFF01E" large @click="editReport">수정</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </body>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

import ProjectTitle from './components/ProjectTitle.vue'
import TeamMember from './components/TeamMember.vue'
import TechStack from './components/TechStack.vue'
import MainFeatures from './components/MainFeatures.vue'
import UsagePlans from './components/UsagePlans.vue'
import ReportImprovements from './components/ReportImprovements.vue'
import CompletionRates from './components/CompletionRates.vue'
import OverView from './components/OverView.vue'
import { useResultReportStore } from '../../stores/resultReportStore';
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
    components: {
        ProjectTitle,
        TeamMember,
        TechStack,
        MainFeatures,
        UsagePlans,
        ReportImprovements,
        CompletionRates,
        OverView,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const resultReportStore = useResultReportStore();

        const projectTitle = ref('')
        const teamMembers = ref([])
        const techStack = ref([])
        const features = ref([])
        const usagePlans = ref([])
        const overview = ref("")
        const reportImprovements = ref([])
        const completionRates = ref([])
        const completionFeedback = ref([])
        const size = ref(120)
        const strokeWidth = ref(10)

        function goToList() {
            router.push(`/resultReport/list`)
        }
        function editReport() {
            router.push(`/resultReport/modify/${route.params.id}`)
        }

        onMounted(async () => {
            const response = await resultReportStore.requestResultReportToDjango(Number(route.params.id));
            projectTitle.value = response.title
            // overview.value = response.overview
            for (let i = 0; i < response.teamMemberList.length; i++) {
                teamMembers.value.push({ department: response.teamMemberList[i][2], name: response.teamMemberList[i][0], role: response.teamMemberList[i][1] })
            }
            techStack.value = response.skillList
            features.value = response.featureList
            usagePlans.value = JSON.parse(response.usage.replace(/'/g, '"'))
            reportImprovements.value = response.improvementList
            completionRates.value = [
                { label: response.completionList[0][0], rate: response.completionList[0][1], color: response.completionList[0][3] },
                { label: response.completionList[1][0], rate: response.completionList[1][1], color: response.completionList[1][3] },
                { label: response.completionList[2][0], rate: response.completionList[2][1], color: response.completionList[2][3] },
            ]
            for (let i = 0; i < response.completionList.length; i++) {
                completionFeedback.value.push(response.completionList[i][2])
            }
        })

        return {
            projectTitle,
            overview,
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

.main-card {
    background-color: #333333;
    border-radius: 12px;
    color: #ffffff;
}
</style>