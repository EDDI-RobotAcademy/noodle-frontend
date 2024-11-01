<template>
    <p style="margin-top: 3px; margin-bottom: 3px;">Open Beta Service : python외의 언어는 추후 지원 예정입니다.</p>
    <div class="app-container">
        <div class="container">
            <div class="leftbox">
                <div class="leftbox_title">
                    <span>Backlog Board</span>
                    <div class="leftbox_title_btn-area">
                        <v-btn size="small" class="backlog-btn" @click="createBacklog"
                            :disabled="isAllSelected == false">Backlog 생성</v-btn>
                    </div>
                </div>

                <!-- 생성된 백로그 출력부 -->
                <v-card v-if="isBacklogLoading == true" class="backlog-list-container">
                    <v-progress-circular indeterminate color="primary" size="40"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></v-progress-circular>
                </v-card>
                <v-card v-else class="backlog-list-container">
                    <v-list style="background-color: #2f2f2f;">
                        <v-list-item v-for="(backlog, index) in displayBacklogList" :key="index" class="fade-in">
                            <v-card style="background-color: #3c3c3c;">
                                <v-list-item v-for="(key, item, index) in backlog" :key="index">
                                    <v-card-item>
                                        <v-card-text
                                            style="color: white; font-weight:bold; margin-top:-10px; margin-bottom: -10px;">
                                            {{ item }}
                                        </v-card-text>
                                        <div v-if="item === `Task List`">
                                            <v-list-item v-for="(item, index) in key" :key="index">
                                                <v-card-text
                                                    style="color: white; margin-top: -10px; margin-bottom: -10px;">
                                                    {{ item }}
                                                </v-card-text>
                                            </v-list-item>
                                        </div>
                                        <div v-else>
                                            <v-list-item>
                                                <v-card-text style="color: white; margin-top:-10px;">{{ key
                                                    }}</v-card-text>
                                            </v-list-item>
                                        </div>
                                    </v-card-item>
                                </v-list-item>
                            </v-card>
                        </v-list-item>
                    </v-list>
                </v-card>
            </div>



            <!------------------------------ Switch가 Commit-List일 때 ---------------------->
            <div class="rightbox" v-show="rightboxstate === 'Commit-List'">
                <div class="rightbox_title">
                    <div class="rightbox_title_area">
                        <span>Commit List</span>
                        <v-btn @click="Refresh" icon class="Refresh"><v-icon>mdi-cloud-refresh</v-icon></v-btn>
                    </div>
                    <div class="rightbox_title_btn-area">
                        <v-btn @click="example" class="example_btn">
                            <v-icon left>mdi-cursor-default-click</v-icon>
                            example!
                        </v-btn>
                        <v-btn @click="rightboxstate = 'Report'" class="Report-btn">
                            <v-icon left>mdi-file-document-outline</v-icon>
                            Report
                        </v-btn>
                    </div>
                </div>

                <div class="rightbox-content" v-if="!isExample">
                    <div class="select-container-area">
                        <div class="select-container" v-if="repos">
                            <v-select v-model="selectedRepository" :value="selectedRepository" :items="repos"
                                class="repository" @change="setRepositorySelect($event)">
                                <option v-for="(item, index) in repos" :key="index" :value="item.value">
                                    {{ item.value }}
                                </option>
                            </v-select>
                            <div v-if="branches">
                                <v-select v-model="selectedBranches" :value="selectedBranch" :items="branches"
                                    class="branch" @change="setBranchSelect($event)">
                                    <option v-for="(item, index) in branches" :key="index" :value="item.value">
                                        {{ item.value }}
                                    </option>
                                </v-select>
                            </div>
                            <div v-else>
                                <v-select :value="selectedBranches" class="branches"></v-select>
                            </div>
                        </div>
                        <div class="select-container" v-else>
                            <v-select :value="selectedRepository"></v-select>
                            <v-select :value="selectedBranches"></v-select>
                        </div>
                    </div>

                    <v-card v-if="commits" class="commit-list-container">
                        <v-list style="background-color: #2f2f2f;">
                            <v-list-item v-for="(item, index) in commits" :key="index">
                                <v-card style="background-color: #444444;">
                                    <v-card-item>
                                        <v-card-text style="color: white;">{{ item }}</v-card-text>
                                    </v-card-item>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-card class="commit-list-container" v-else-if="isCommitListLoading == true">
                        <v-progress-circular indeterminate color="primary" size="40"
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></v-progress-circular>
                    </v-card>
                    <v-card v-else class="commit-list-container"></v-card>
                </div>

                <div class="rightbox-content" v-else>
                    <div class="select-container-area">
                        <div class="select-container">
                            <v-select :value="exampleRepository"></v-select>
                            <v-select :value="exampleBranch"></v-select>
                        </div>
                    </div>
                    <v-card v-if="exampleCommits" class="commit-list-container">
                        <v-list style="background-color: #2f2f2f;">
                            <v-list-item v-for="(item, index) in exampleCommits" :key="index">
                                <v-card style="background-color: #444444;">
                                    <v-card-item>
                                        <v-card-text style="color: white;">{{ item }}</v-card-text>
                                    </v-card-item>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-card v-else class="commit-list-container">
                        <!-- <v-progress-circular v-if="isCommitListLoading == true" indeterminate color="primary" size="40"
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></v-progress-circular> -->
                    </v-card>
                </div>
            </div>

            <!-------------------Switch가 Report로 변경됐을 때 (Report)-------------------------->
            <div class="rightbox" v-show="rightboxstate === 'Report'">
                <div class="rightbox_title">
                    <div class="rightbox_title_area">
                        <span>Report</span>
                        <v-btn @click="Refresh" icon class="Refresh"><v-icon>mdi-cloud-refresh</v-icon></v-btn>
                    </div>
                    <div class="rightbox_title_btn-area">
                        <v-btn @click="example" class="example_btn">
                            <v-icon left>mdi-cursor-default-click</v-icon>
                            example!
                        </v-btn>
                        <v-btn @click="rightboxstate = 'Commit-List'" class="commitlist-btn">
                            <v-icon left>mdi-view-list</v-icon>
                            Commit-List
                        </v-btn>
                    </div>
                </div>

                <div class="report-area">
                    <v-container v-if="isReportLoading == true" class="report-container">
                        <v-progress-circular indeterminate color="primary" size="40"
                            style="position: absolute; top: 57%; left: 76%; transform: translate(-50%, -50%);"></v-progress-circular>
                    </v-container>
                    <v-container v-else class="report-container">
                        <v-card class="mx-auto" max-width="1000">
                            <!-- 프로젝트 제목 섹션 -->
                            <v-card-title class="text-h4 font-weight-bold text-center pa-4">
                                <h2 class="text-h5 mb-4">프로젝트 제목</h2>
                                <v-text-field v-model="projectTitle" label="프로젝트 제목" outlined dense></v-text-field>
                            </v-card-title>

                            <v-divider></v-divider>

                            <!-- 개요 섹션 -->
                            <v-card-title class="text-h4 font-weight-bold pa-4">
                                <h2 class="text-h5 mb-4">개요</h2>
                                <v-text-field v-model="overview" label="개요" outlined dense></v-text-field>
                            </v-card-title>


                            <v-divider></v-divider>

                            <!-- 팀 구성 섹션 -->
                            <v-card-text>
                                <h2 class="text-h5 mb-4">팀 구성</h2>
                                <v-row v-for="(member, index) in teamMembers" :key="index" align="center">
                                    <v-col cols="4">
                                        <v-text-field v-model="member.department" label="부서" outlined
                                            dense></v-text-field>
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
                                <v-btn color="primary" block @click="addTeamMember">팀원 추가</v-btn>
                            </v-card-text>

                            <v-divider></v-divider>

                            <!-- 기술 스택 섹션 -->
                            <v-card-text>
                                <h2 class="text-h5 mb-4">기술 스택</h2>
                                <v-row>
                                    <v-col v-for="(tech, index) in techStack" :key="index" cols="4">
                                        <v-card outlined>
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
                                        <v-card outlined class="d-flex justify-center align-center" height="100%">
                                            <v-btn color="primary" @click="addTechStack">
                                                <v-icon>mdi-plus</v-icon> 기술 추가
                                            </v-btn>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-divider></v-divider>

                            <!-- 주요 기능 섹션 -->
                            <v-card-text>
                                <h2 class="text-h5 mb-4">주요 기능</h2>
                                <v-timeline dense>
                                    <v-timeline-item v-for="(feature, index) in features" :key="index" small>
                                        <template v-slot:opposite></template>
                                        <v-card outlined>
                                            <v-card-text>
                                                <v-textarea v-model="features[index]" label="기능 설명" outlined auto-grow
                                                    dense class="auto-expand-textarea"></v-textarea>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn color="error" icon @click="removeFeature(index)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                                <v-btn color="primary" block @click="addFeature">기능 추가</v-btn>
                            </v-card-text>

                            <v-divider></v-divider>

                            <!-- 활용 방안 섹션 -->
                            <v-card-text>
                                <h2 class="text-h5 mb-4">활용 방안</h2>
                                <v-expansion-panels>
                                    <v-expansion-panel v-for="(usage, index) in usagePlans" :key="index">
                                        <v-expansion-panel-header>
                                            <v-text-field v-model="usage.title" label="활용 방안 제목" outlined
                                                dense></v-text-field>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-textarea v-model="usage.description" label="상세 설명" outlined auto-grow
                                                rows="3" hide-details class="auto-expand-textarea"></v-textarea>
                                            <v-btn color="error" @click="removeUsagePlan(index)">삭제</v-btn>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                                <v-btn color="primary" block class="mt-4" @click="addUsagePlan">활용 방안 추가</v-btn>
                            </v-card-text>

                            <v-divider></v-divider>

                            <!-- 보완할 점 섹션 -->
                            <v-card-text>
                                <h2 class="text-h5 mb-4">보완할 점</h2>
                                <v-list>
                                    <v-list-item v-for="(improvement, index) in improvements" :key="index">
                                        <v-list-item-content>
                                            <v-text-field v-model="improvements[index]" label="보완 사항" outlined
                                                dense></v-text-field>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn color="error" icon @click="removeImprovement(index)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                                <v-btn color="primary" block @click="addImprovement">보완 사항 추가</v-btn>
                            </v-card-text>

                            <v-divider></v-divider>

                            <!-- 완성도 섹션 -->
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
                                            <text :x="center" :y="center" text-anchor="middle" :fill="item.color"
                                                font-size="20" font-weight="bold" dy=".3em">
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

                        <v-row justify="end" class="mt-4 mx-0">
                            <v-col cols="auto">
                                <v-btn color="primary" large @click="onSubmit">등록</v-btn>
                            </v-col>

                        </v-row>
                    </v-container>
                </div>
            </div>



        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useProjectManageStore } from '../stores/projectManageStore';
import { useBacklogStore } from '../../backlog/store/backlogStore';
import { useResultReportStore } from '../../resultReport/stores/resultReportStore';


export default defineComponent({
    head() {
        return {
            title: 'AI를 활용한 코드 기반 백로그 생성 및 프로젝트 관리 - NOODLE',
            meta: [
                {
                    name: 'description',
                    content: 'Noodle을 통해 GitHub 코드에서 백로그를 자동 생성하고 프로젝트를 효과적으로 관리하세요. 코드 기반 백로그 생성을 통해 개발 효율성을 극대화하세요.'
                },
                {
                    name: 'keywords',
                    content: 'AI, LLM, 코드 기반 백로그 생성, 프로젝트 관리, NOODLE, GitHub 연동, 백로그 관리, 애자일, 애자일 프로세스, 협업, 협업 관리 도구, AI 협업 도구'
                },
                {
                    property: 'og:title',
                    content: 'AI를 활용한 코드 기반 백로그 생성 및 프로젝트 관리 - NOODLE'
                },
                {
                    property: 'og:description',
                    content: 'NOODLE을 통해 GitHub 코드에서 백로그를 자동 생성하고 프로젝트를 효과적으로 관리하세요.'
                },
                {
                    property: 'og:image',
                    content: '/public/fixed/NOODLE_logo.png'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'twitter:title',
                    content: 'NOODLE | Use Your Noodle!'
                },
                {
                    name: 'twitter:description',
                    content: 'NOODLE을 통해 GitHub 코드에서 백로그를 자동 생성하고 프로젝트를 효과적으로 관리하세요.'
                },
                {
                    name: 'twitter:image',
                    content: '/public/fixed/NOODLE_logo.png'
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: 'https://noo-dle.com/projectManage'
                }
            ]
        };
    },

    setup() {
        const projectManageStore = useProjectManageStore();
        const resultReportStore = useResultReportStore();
        const backlogStore = useBacklogStore();

        const isChecked = ref(true)
        const columns = ref([
            {
                name: 'To Do',
                tasks: [
                    { id: 1, name: '작업 1' },
                    { id: 2, name: '작업 2' },
                ],
            },
            {
                name: 'In Progress',
                tasks: [
                    { id: 3, name: '작업 3' },
                ],
            },
            {
                name: 'Done',
                tasks: [
                    { id: 4, name: '작업 4' },
                    { id: 5, name: '작업 5' }
                ],
            },
        ])
        const selectedRepository = ref("Select a repository")
        const selectedBranches = ref("Select a branch")
        const selectedCommits = ref("")
        const exampleRepository = ref("noodle-frontend")
        const exampleBranch = ref("develop")
        const exampleCommits = ref([])
        const isExample = ref(false)
        const backlogList = ref(null)
        const resultReport = ref(null)
        const repos = computed(() => projectManageStore.repos)
        const branches = computed(() => projectManageStore.branches)
        const commits = computed(() => projectManageStore.commits)
        const userToken = ref(null)
        const rightboxstate = ref('Commit-List')
        const displayBacklogList = ref([])
        const projectTitle = ref('')
        const overview = ref('')
        const teamMembers = ref([])
        const techStack = ref([])
        const features = ref([])
        const usagePlans = ref([])
        const improvements = ref([])
        const completionRates = ref([])
        const completionFeedback = ref([])
        const size = ref(120)
        const strokeWidth = ref(10)
        const isAllSelected = ref(false)
        const isCommitListLoading = ref(false)
        const isBacklogLoading = ref(false)
        const isReportLoading = ref(false)
        const radius = computed(() => {
            return (size.value / 2) - (strokeWidth.value / 2)
        })
        const center = computed(() => {
            return size.value / 2
        })
        const circumference = computed(() => {
            return 2 * Math.PI * radius.value
        })

        watch(selectedRepository, async (newRepository) => {
            if (newRepository !== null) {
                selectedRepository.value = newRepository
                await setRepositorySelect()
            }
        })
        watch(selectedBranches, async (newBranch) => {
            if (newBranch !== null) {
                selectedBranches.value = newBranch
                await setBranchSelect()
            }
        })


        async function setRepositorySelect(newVal) {
            if (newVal !== null) {
                const payload = { "userToken": userToken.value, 'reponame': selectedRepository.value }
                await projectManageStore.requestSaveBranchListToDjango(payload)
                await projectManageStore.requestGetBranchListToDjango(payload)
            }
        }
        async function setBranchSelect(newVal) {
            if (newVal !== null) {
                isCommitListLoading.value = true
                const payload = { 'userToken': userToken.value, 'reponame': selectedRepository.value, 'branchname': selectedBranches.value }
                await projectManageStore.requestSaveCommitListToDjango(payload)
                await projectManageStore.requestGetCommitListToDjango(payload)
                isAllSelected.value = true
                isCommitListLoading.value = false
            }
        }
        async function createBacklog() {
            isAllSelected.value = false
            isBacklogLoading.value = true
            isReportLoading.value = true
            const payload = { 'userToken': userToken.value, 'reponame': selectedRepository.value, 'branchname': selectedBranches.value }
            const response = await resultReportStore.requestGenerateResultReportToFastAPI(payload)
            console.log('FastAPI response:', response)
            if (response == true) {
                backlogList.value = await backlogStore.requestBacklogListToDjango(userToken.value)
                isBacklogLoading.value = false
                displayBacklogList.value = []
                for (let i = 0; i < backlogList.value.length; i++) {
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    displayBacklogList.value.push(backlogList.value[i])
                }
                resultReport.value = await resultReportStore.requestGetResultReportResultToFastAPI(userToken.value)
                isReportLoading.value = true
                projectTitle.value = resultReport.value.title || null
                overview.value = resultReport.value.overview || null
                features.value.push(...(resultReport.value.featureList || []))
                techStack.value.push(...(resultReport.value.skillList || []))
                usagePlans.value.push({
                    title: '',
                    description: resultReport.value.usage || []
                })
                improvements.value = [resultReport.value.improvementList || '']
                completionRates.value.push(
                    { label: '보안', rate: resultReport.value.completionList[0][0], color: 'red' },
                    { label: '유지보수', rate: resultReport.value.completionList[1][0], color: 'green' },
                    { label: '전체', rate: resultReport.value.completionList[2][0], color: 'blue' } || null)
                for (let i = 0; i < resultReport.value.completionList.length; i++) {
                    completionFeedback.value.push((resultReport.value.completionList[i][1] || []))
                }
            } else {
                alert("ai 생성 서버의 응답이 없습니다! 잠시 후 다시 시도해주세요")
            }
            isAllSelected.value = true
        }
        async function Refresh() {
            isExample.value = false
            const payload = { userToken: userToken.value }
            await projectManageStore.requestSaveReposListToDjango(payload)
            await projectManageStore.requestGetReposListToDjango(payload)
        }
        async function example() {
            isExample.value = true

            try {
                const url = `https://api.github.com/repos/EDDI-RobotAcademy/noodle-backend/commits?sha=develop`
                const response = await useFetch(url)
                const data = response.data
                // console.log(data.value[0].commit.message)
                const proxyData = ref([])
                for (let i = 0; i < data.value.length; i++) {
                    proxyData.value.push(data.value[i].commit.message)
                }
                console.log(proxyData.value)
                exampleCommits.value = toRaw(proxyData.value)

                // const payload = { 'username': 'EDDI-RobotAcademy', 'reponame': "noodle-backend", "branchname": "develop" }
                // await backlogStore.requestGenerateBacklogToFastAPI(payload)
                // backlogList.value = await backlogStore.requestBacklogListToFastAPI()

                backlogList.value = [
                    {
                        "Title": "Django Command-Line Utility",
                        "Success Criteria": "The command-line utility should run without errors and set the Django settings module correctly.",
                        "Domain Separation": "Core utility functions.",
                        "Task List": [
                            "Implement error handling for missing Django installation.",
                            "Ensure the environment variable for settings is configurable.",
                        ],
                    },
                    {
                        "Title": "Commits Model Migration",
                        "Success Criteria": "The migration should create the `Commits` table with the specified fields.",
                        "Domain Separation": "Database migrations.",
                        "Task List": [
                            "Verify the migration file is generated correctly.",
                            "Test the migration on a local database.",
                        ],
                    },
                    {
                        "Title": "Commits Repository Implementation",
                        "Success Criteria": "The repository should save commits from GitHub and handle pagination correctly.",
                        "Domain Separation": "Data access layer.",
                        "Task List": [
                            "Implement the `saveCommits` method.",
                            "Handle API response and errors.",
                            "Write unit tests for the repository methods.",
                        ],
                    },
                    {
                        "Title": "Commits Service Implementation",
                        "Success Criteria": "The service should interact with the repository and return commit data correctly.",
                        "Domain Separation": "Business logic layer.",
                        "Task List": [
                            "Implement the `save` and `list` methods.",
                            "Ensure proper error handling and logging.",
                            "Write unit tests for service methods.",
                        ],
                    },
                    {
                        "Title": "Commits View Implementation",
                        "Success Criteria": "The view should handle HTTP requests and return appropriate responses.",
                        "Domain Separation": "API layer.",
                        "Task List": [
                            "Implement the `save` and `list` methods in the view.",
                            "Validate request data and handle errors.",
                            "Write integration tests for the view.",
                        ],
                    },
                    {
                        "Title": "GitHub OAuth Integration",
                        "Success Criteria": "The application should authenticate users via GitHub and store access tokens securely.",
                        "Domain Separation": "Authentication layer.",
                        "Task List": [
                            "Implement OAuth flow in the `OauthView`.",
                            "Store and retrieve access tokens using Redis.",
                            "Write tests for the OAuth functionality.",
                        ],
                    },
                ]
            } catch (error) {
                console.error("Error fetching commits:", error)
            }
            displayBacklogList.value = []
            for (let i = 0; i < backlogList.value.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 2000))
                displayBacklogList.value.push(backlogList.value[i])
            }
        }
        // report 섹션 함수
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
        function submitReport() {
            // TODO
            // backend 저장 로직
            // 선택적 report list 페이지 접근 기능
        }
        function dashOffset(rate) {
            return circumference.value - (rate / 100 * circumference.value)
        }
        function onSubmit() {
            alert('저장 기능 구현 예정! 감사합니다')
        }

        onMounted(async () => {
            userToken.value = localStorage.getItem('userToken')
            isCommitListLoading.value = false
        })

        return {
            isChecked,
            columns,
            selectedRepository,
            selectedBranches,
            selectedCommits,
            exampleRepository,
            exampleBranch,
            exampleCommits,
            isExample,
            backlogList,
            repos,
            branches,
            commits,
            userToken,
            rightboxstate,
            displayBacklogList,
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
            isAllSelected,
            isBacklogLoading,
            isReportLoading,
            isCommitListLoading,

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
            setRepositorySelect,
            setBranchSelect,
            Refresh,
            example,
            submitReport,
            dashOffset,
            onSubmit,
            createBacklog,
        }
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.app-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - var(--navigation-bar-height));
}

.container {
    display: flex;
    height: 100%;
    width: 100%;
}

/* 왼쪽 box */
.leftbox {
    position: relative;
    width: 50%;
    /* 왼쪽 박스의 너비를 75%로 설정 */
    height: 100%;
    /* 왼쪽 박스의 높이를 100%로 설정 (화면 전체 높이) */
    background-color: #1c1c1c;
    /* 왼쪽 박스의 배경색을 파란색으로 설정 */
    border-right: 3px solid rgba(204, 159, 1);
    /* 오른쪽에 두께 3px의 노란색 테두리 추가 */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.leftbox_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 10%;
    font-size: 30px;
    /* 폰트 크기를 30px로 설정 */
    /* color: rgba(204, 159, 1); */
}

.leftbox_title_btn-area {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 3%;
}

.leftbox_title span {
    color: rgb(255, 240, 30);
    font-family: "Playfair Display", serif;
    font-style: normal;
    font-weight: bold;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}

.backlog-list-container {
    overflow: auto;
    width: 99%;
    height: 84.3vh;
    background-color: #2f2f2f;
}

.backlog-list-container::-webkit-scrollbar {
    width: 10px;
}

.backlog-list-container::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
}

.backlog-list-container::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
}

.mb-2 {
    background-color: #c5c5c5;
}

/* 오른쪽 box */
.rightbox {
    width: 50%;
    height: 100%;
    background-color: #1c1c1c;
}

.rightbox_title {
    width: 95%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    font-size: 30px;
}

.rightbox_title_area {
    display: flex;
    gap: 10px;
}

.rightbox_title_btn-area {
    display: flex;
    gap: 20px;
}

.rightbox_title span {
    color: rgb(255, 240, 30);
    font-family: "Playfair Display", serif;
    font-style: normal;
    font-weight: bold;
}


.rightbox-content {
    width: 100%;
    height: 90%;
}

.select-container-area {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10%;
}

.select-container {
    width: 96%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: rgb(255, 255, 255);
}

.select-container .v-select {
    width: 450px;
    max-width: 450px;
    min-width: 450px;
}

/* v-if로 감싸진 div들의 높이 설정 */
/* rightbox_title이 10%이므로 나머지 90% */
/* .rightbox > div:nth-child(2) {
  height: 90%;
} */


/* 커밋리스트 나오는 v-card 설정 */
.commit-list-container {
    background-color: #2F2F2F;
    color: #B4B4B4;
    overflow: auto;
    width: 99%;
    height: 77.4vh;
    margin: 4px;
}

.commit-list-container::-webkit-scrollbar,
.report-container::-webkit-scrollbar {
    width: 10px;
}

.commit-list-container::-webkit-scrollbar-thumb,
.report-container::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
}

.commit-list-container::-webkit-scrollbar-track,
.report-container::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
}

.fade-in {
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.report-area {
    width: 100%;
    height: 90%;
    overflow: auto;
}




/* Report 관련 CSS */

.report-container {
    overflow: auto;
    width: 100%;
    height: 86.5vh;
}

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





/* btn */

.backlog-btn {
    font-weight: bold;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: white;
    border: 1px solid white;
    background-color: transparent;
    margin-top: 20px;
}

:disabled.backlog-btn {
    opacity: 0.5;
    cursor: not-allowed;
}

.Refresh {
    background-color: transparent;
    color: white;
    /* 아이콘 색상을 흰색으로 설정 */
    font-size: 20px;
}

.example_btn {
    background-color: rgb(255, 255, 255);
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font-size: 14 px;
    font-weight: bold;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: white;
    border: 1px solid white;
    background-color: transparent;
}

.Report-btn {
    font-weight: bold;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: white;
    border: 1px solid white;
    background-color: transparent;
}

.commitlist-btn {
    font-weight: bold;
    border-radius: 50px;
    transition: all 0.3s ease;
    color: white;
    border: 1px solid white;
    background-color: transparent;
}




/* btn-hover 관련 */
.Report-btn:hover,
.example_btn:hover,
.commitlist-btn:hover,
.backlog-btn:hover {
    background-color: rgb(238, 222, 0) !important;
    /* 노란색 배경 */
    color: rgb(255, 255, 255) !important;
    /* 흰색 글씨 */
}

.Report-btn:hover .v-icon,
.example_btn:hover .v-icon,
.commitlist-btn:hover .v-icon,
.backlog-btn:hover .v-icon {
    color: rgb(255, 255, 255) !important;
}
</style>
