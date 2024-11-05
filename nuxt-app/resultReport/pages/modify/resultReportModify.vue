<template>

    <body bgcolor="black">
        <v-container class="myauto pa-0" max-width="900">
            <br />
            <v-card class="mx-auto my-auto pa-6" outlined elevation="4" rounded :style="mainCardStyle">
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <!-- 프로젝트 제목 섹션 -->
                    <v-card-title class="text-h4 font-weight-bold pa-4">
                        <h2 class="text-h5 mb-4">프로젝트 제목</h2>
                        <v-textarea v-model="projectTitle" label="" outlined dense></v-textarea>
                    </v-card-title>
                </v-card>

                <br />

                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <!-- 개요 섹션 -->
                    <v-card-title class="text-h4 font-weight-bold pa-4">
                        <h2 class="text-h5 mb-4">개요</h2>
                        <v-textarea v-model="overview" label="" outlined dense></v-textarea>
                    </v-card-title>
                </v-card>

                <br />

                <!-- 팀 구성 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">팀 구성</h2>
                        <v-row v-for="(member, index) in teamMembers" :key="index" align="center">
                            <v-col cols="4">
                                <v-text-field v-model="member.department" label="부서" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="member.name" label="이름" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="member.role" label="역할" outlined dense></v-text-field>
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

                <br />

                <!-- 기술 스택 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">기술 스택</h2>
                        <v-row>
                            <v-col v-for="(tech, index) in techStack" :key="index" cols="4">
                                <v-card color="#333333" outlined>
                                    <v-card-text>
                                        <v-text-field v-model="techStack[index]" label="기술명" outlined
                                            dense></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="error" icon @click="removeTechStack(index)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card color="#333333" outlined class="d-flex justify-center align-center"
                                    height="100%">
                                    <v-btn color="#FFF01E" @click="addTechStack">
                                        <v-icon>mdi-plus</v-icon> 기술 추가
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <br />

                <!-- 주요 기능 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">주요 기능</h2>
                        <v-timeline dense side="end" class="left-aligned-timeline">
                            <v-timeline-item v-for="(feature, index) in features" :key="index">
                                <template v-slot:opposite></template>
                                <v-card bg-color="#333333" outlined style="width: 34vw;">
                                    <v-card-text style="background-color: #555555; color: white">
                                        <v-card-text>
                                            <!-- Markdown 입력을 위한 텍스트 영역 -->
                                            <v-textarea v-model="features[index]" label="기능 설명 (Markdown 지원)" outlined
                                                auto-grow dense class="auto-expand-textarea"
                                                @blur="updateMarkdown(index)"></v-textarea>

                                            <!-- Markdown 렌더링 결과 -->
                                            <div v-html="features[index]" class="markdown-preview mt-4">
                                            </div>
                                        </v-card-text>
                                    </v-card-text>
                                    <v-card-actions style="background-color: #555555;">
                                        <v-btn color="error" icon @click="removeFeature(index)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                        <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addFeature">기능
                            추가</v-btn>
                    </v-card-text>
                </v-card>

                <br />

                <!-- 활용 방안 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">활용 방안</h2>
                        <v-expansion-panels bg-color="#444444">
                            <v-expansion-panel v-for="(usage, index) in usagePlans" :key="index">
                                <v-expansion-panel-content>
                                    <v-textarea v-model="usage.description" label="상세 설명" outlined auto-grow rows="3"
                                        hide-details class="auto-expand-textarea"></v-textarea>
                                    <v-btn color="error" @click="removeUsagePlan(index)">삭제</v-btn>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addUsagePlan">활용 방안
                            추가</v-btn>
                    </v-card-text>
                </v-card>

                <br />

                <!-- 보완할 점 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <!-- 보완할 점 섹션 -->
                    <v-card-text>
                        <h2 class="text-h5 mb-4">보완할 점</h2>
                        <v-list style="background-color: #444444;">
                            <v-list-item v-for="(improvement, index) in improvements" :key="index"
                                style="margin-bottom: 10px">
                                <v-list-item-content>
                                    <v-textarea v-model="improvements[index]" label="보완 사항" outlined dense auto-grow
                                        style="color: #ffffff;"></v-textarea>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn color="error" icon @click="removeImprovement(index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <v-btn color="#FFF01E" class="mt-4 mx-auto d-block" @click="addImprovement">보완 사항
                            추가</v-btn>
                    </v-card-text>
                </v-card>

                <br />

                <!-- 완성도 섹션 -->
                <v-card class="mx-auto mb-6" :style="cardStyle">
                    <v-card-text>
                        <h2 class="text-h5 mb-4">완성도</h2>
                        <v-row justify="space-around">
                            <v-col v-for="(item, index) in completionRates" :key="index" cols="auto"
                                class="text-center">
                                <h3>{{ item.label }}</h3>
                                <svg :width="size" :height="size" class="progress-ring">
                                    <circle :stroke="'#e0e0e0'" :stroke-width="strokeWidth" fill="transparent"
                                        :r="radius" :cx="center" :cy="center" />
                                    <circle :stroke="item.color" :stroke-width="strokeWidth" fill="transparent"
                                        :r="radius" :cx="center" :cy="center" :stroke-dasharray="circumference"
                                        :stroke-dashoffset="dashOffset(item.rate)" />
                                    <text :x="center" :y="center" text-anchor="middle" :fill="item.color" font-size="20"
                                        font-weight="bold" dy=".3em">
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
                                            <div v-html="feedback" class="markdown-preview mt-4" style="color: white">
                                            </div>
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
                    <v-btn color="#FFF01E" large @click="submitReport">저장</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </body>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useResultReportStore } from '../../stores/resultReportStore';
import { marked } from 'marked'

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const resultReportStore = useResultReportStore();

        const id = route.params.id
        const projectTitle = ref("")
        const overview = ref("")
        const teamMembers = ref([])
        const techStack = ref([])
        const features = ref([])
        const usagePlans = ref([])
        const improvements = ref([])
        const completionRates = ref([])
        const completionFeedback = ref([])
        const size = ref(120)
        const strokeWidth = ref(10)
        const radius = computed(() => (size.value / 2) - (strokeWidth.value / 2))
        const center = computed(() => size.value / 2)
        const circumference = computed(() => 2 * Math.PI * radius.value)
        const isActive = ref(false)
        const mainCardStyle = ref({
            backgroundColor: '#333333',
            borderRadius: '12px',
            color: '#ffffff'
        })
        const cardStyle = ref({
            backgroundColor: '#444444',
            borderColor: '#555555',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '8px',
            color: '#ffffff'
        })
        const innerCardStyle = ref({
            backgroundColor: '#555555',
            borderColor: '#666666',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '8px',
            color: '#ffffff'
        })

        function addTeamMember() {
            teamMembers.value.push({ department: '', name: '', role: '' })
        }
        function removeTeamMember(index) {
            teamMembers.value.splice(index, 1)
        }
        function addTechStack() {
            techStack.value.push('')
        }
        function removeTechStack(index) {
            techStack.value.splice(index, 1)
        }
        function addFeature() {
            features.value.push('')
        }
        function removeFeature(index) {
            features.value.splice(index, 1)
        }
        function addUsagePlan() {
            usagePlans.value.push({ title: '', description: '' })
        }
        function removeUsagePlan(index) {
            usagePlans.value.splice(index, 1)
        }
        function addImprovement() {
            improvements.value.push('')
        }
        function removeImprovement(index) {
            improvements.value.splice(index, 1)
        }
        function goToRead() {
            router.push(`/result-report/read/${id}`)
        }
        async function submitReport() {
            const payload = {
                title: projectTitle.value,
                overview: overview.value,
                teamMemberList: teamMembers.value,
                skillList: techStack.value,
                featureList: features.value,
                usage: usagePlans.value,
                improvements: improvements.value
            }
            const userToken = localStorage.getItem("userToken")
            await resultReportStore.requestModifyResultReportToDjango(id, payload, userToken)
            router.push(`/resultReport/read/${id}`)
        }
        function dashOffset(rate) {
            return circumference.value - (rate / 100 * circumference.value)
        }

        onMounted(async () => {
            isActive.value = await resultReportStore.requestUserValidationToDjango(Number(route.params.id), localStorage.getItem('userToken'))
            if (isActive.value == false) {
                router.push(`/resultReport/read/${route.params.id}`)
            } else {
                const response = await resultReportStore.requestResultReportToDjango(route.params.id)
                console.log(response)
                projectTitle.value = response.title
                overview.value = response.overview
                for (let i = 0; i < response.teamMemberList.length; i++) {
                    teamMembers.value.push({ department: response.teamMemberList[i][2], name: response.teamMemberList[i][0], role: response.teamMemberList[i][1] })
                }
                techStack.value = response.skillList
                features.value = response.featureList
                usagePlans.value = JSON.parse(response.usage.replace(/'/g, '"'))
                improvements.value = response.improvementList
                completionRates.value = [
                    { label: response.completionList[0][0], rate: response.completionList[0][1], color: response.completionList[0][1] >= 80 ? 'green' : response.completionList[0][1] >= 60 ? 'yellow' : 'red' },
                    { label: response.completionList[1][0], rate: response.completionList[1][1], color: response.completionList[1][1] >= 80 ? 'green' : response.completionList[1][1] >= 60 ? 'yellow' : 'red' },
                    { label: response.completionList[2][0], rate: response.completionList[2][1], color: response.completionList[2][1] >= 80 ? 'green' : response.completionList[2][1] >= 60 ? 'yellow' : 'red' },
                ]
                for (let i = 0; i < response.completionList.length; i++) {
                    completionFeedback.value.push(marked(response.completionList[i][2]))
                }
            }

        })

        return {
            projectTitle,
            overview,
            teamMembers,
            techStack,
            features,
            usagePlans,
            improvements,
            completionRates,
            completionFeedback,
            size,
            strokeWidth,
            radius,
            center,
            circumference,
            mainCardStyle,
            cardStyle,
            innerCardStyle,

            addTeamMember,
            removeTeamMember,
            addTechStack,
            removeTechStack,
            addFeature,
            removeFeature,
            addUsagePlan,
            removeUsagePlan,
            addImprovement,
            removeImprovement,
            goToRead,
            submitReport,
            dashOffset,
        }
    }
})
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