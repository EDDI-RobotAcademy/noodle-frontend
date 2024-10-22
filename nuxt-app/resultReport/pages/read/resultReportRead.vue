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
                            <circle :stroke="'#e0e0e0'" :stroke-width="strokeWidth" fill="transparent" :r="radius"
                                :cx="center" :cy="center" />
                            <circle :stroke="item.color" :stroke-width="strokeWidth" fill="transparent" :r="radius"
                                :cx="center" :cy="center" :stroke-dasharray="circumference"
                                :stroke-dashoffset="dashOffset(item.rate)" />
                            <text :x="center" :y="center" text-anchor="middle" :fill="item.color" font-size="20"
                                font-weight="bold" dy=".3em">
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

        <v-row justify="space-between" class="mt-4 mx-0">
            <!-- 목록 버튼 -->
            <v-col cols="auto">
                <v-btn color="primary" large @click="goToList">목록</v-btn>
            </v-col>
            <!-- 수정 버튼 -->

            <v-col cols="auto">
                <v-btn color="secondary" large @click="editReport">수정</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    // TODO:
    // 화면에 출력되는 요소들이 동적으로 선언되어있지 않아 hydration경고 출력되고 있음.
    // 코드 작성 완료 후 재확인 필요
    setup() {
        const router = useRouter();

        const projectTitle = ref("감자 여행 결과 보고서")
        const teamMembers = ref([
            { department: '개발3팀', name: '김지민', role: '팀장' },
            { department: '개발3팀', name: '이호준', role: '팀원' },
            { department: '개발3팀', name: '이현석', role: '팀원' },
            { department: '개발3팀', name: '정원형', role: '팀원' },
        ])
        const techStack = ref(['Vue.js', 'Python', 'Django', 'FastAPI', 'mysql'])
        const features = ref(['여행지 추천', '패키지 상품을 통한 손쉬운 예약과 일정 관리', '리뷰 페이지로 확인 가능한 사용자들의 피드백'])
        const usagePlans = ref([
            {
                title: '서비스 확장',
                description: '현재 서비스를 기반으로 추가 기능을 개발하여 서비스 범위 확대'
            }
        ])
        const improvements = ref(['성능 최적화 필요'])
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
        const radius = computed(() => {
            return (size.value / 2) - (strokeWidth.value / 2)
        })
        const center = computed(() => {
            return size.value / 2
        })
        const circumference = computed(() => {
            return 2 * Math.PI * radius.value
        })

        function submitReport() {
            console.log('프로젝트 보고서가 등록되었습니다.')
        }
        function dashOffset(rate) {
            return circumference.value - (rate / 100 * circumference.value)
        }
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
            improvements,
            completionRates,
            completionFeedback,
            size,
            strokeWidth,
            radius,
            center,
            circumference,

            submitReport,
            dashOffset,
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