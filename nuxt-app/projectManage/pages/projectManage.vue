<template>
    <div class="app-container">
        <div class="container">
            <div class="leftbox">
                <div class="leftbox_title">
                    <span>Backlog Board</span>
                    <div class="switch white">
                        <input type="radio" id="switch-off" v-model="isChecked" :value="false" />
                        <input type="radio" id="switch-on" v-model="isChecked" :value="true" />
                        <label for="switch-off">status</label>
                        <label for="switch-on">Domain</label>
                        <span class="toggle" :class="{ 'checked': isChecked }"></span>
                    </div>
                </div>
                <!-- 생성된 백로그 출력부 -->
                <v-card v-if="backlogList" class="backlog-list-container">
                    <v-list style="background-color: #2f2f2f;">
                        <v-list-item v-for="(backlog, index) in backlogList" :key="index">
                            <v-card style="background-color: #3c3c3c;">
                                <v-list-item v-for="(key, item, index) in backlog" :key="index">
                                    <v-card-item>
                                        <v-card-text
                                            style="color: white; font-weight:bold; margin-top:-10px; margin-bottom: -10px;">{{
                                                item
                                            }}</v-card-text>
                                        <div v-if="item === `Task List`">
                                            <v-list-item v-for="(item, index) in key" :key="index">
                                                <v-card-text
                                                    style="color: white; margin-top: -10px; margin-bottom: -10px;">{{
                                                        item
                                                    }}</v-card-text>
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
            <div class="rightbox">
                <div class="rightbox_title">
                    <span>Commit List</span>
                    <v-btn @click="example" class="example_btn">클릭해보세요!</v-btn>
                    <v-btn @click="Refresh" class="Refresh">Refresh</v-btn>
                </div>
                <div v-if="!isExample">
                    <div class="select-container" v-if="repos">
                        <v-select v-model="selectedRepository" :value="selectedRepository" :items="repos"
                            class="repository" @update:modelValue="setRepositorySelect($event)">
                            <option v-for="(item, index) in repos" :key="index" :value="item.value">{{ item.value }}
                            </option>
                        </v-select>
                        <div v-if="branches">
                            <v-select v-model="selectedBranches" :value="selectedBranch" :items="branches"
                                class="branch" @update:modelValue="setBranchSelect($event)">
                                <option v-for="(item, index) in branches" :key="index" :value="item.value">{{ item.value
                                    }}</option>
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
                    <v-card v-else class="commit-list-container">
                    </v-card>
                </div>
                <div v-else>
                    <div class="select-container">
                        <v-select :value="exampleRepository"></v-select>
                        <v-select :value="exampleBranch"></v-select>
                    </div>
                    <v-card v-if="exampleCommits" class="commit-list-container">
                        <v-list style="background-color: #2f2f2f;">
                            <!-- 카드 색상 -->
                            <v-list-item v-for="(item, index) in exampleCommits" :key="index">
                                <v-card style="background-color: #444444;">
                                    <!-- 위는 카드 아래는 글씨 -->
                                    <v-card-item>
                                        <v-card-text style="color: white;">{{ item }}</v-card-text>
                                    </v-card-item>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <v-card v-else class="commit-list-container">
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useProjectManageStore } from '../stores/projectManageStore';
import { useBacklogStore } from '../../backlog/store/backlogStore';


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
        const repos = computed(() => projectManageStore.repos)
        const branches = computed(() => projectManageStore.branches)
        const commits = computed(() => projectManageStore.commits)
        const userToken = ref(null)

        async function setRepositorySelect(newVal) {
            if (newVal !== null) {
                // const userToken = localStorage.getItem('userToken')
                const payload = { "userToken": userToken.value, 'reponame': selectedRepository.value }
                await projectManageStore.requestSaveBranchListToDjango(payload)
                await projectManageStore.requestGetBranchListToDjango(payload)
            }
        }
        async function setBranchSelect(newVal) {
            if (newVal !== null) {
                // const userToken = localStorage.getItem('userToken')
                const payload = { 'userToken': userToken.value, 'reponame': selectedRepository.value, 'branchname': selectedBranches.value }
                await projectManageStore.requestSaveCommitListToDjango(payload)
                await projectManageStore.requestGetCommitListToDjango(payload)
            }
        }
        async function Refresh() {
            isExample.value = false
            // const userToken = localStorage.getItem('userToken')
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
        }

        onMounted(async () => {
            userToken.value = localStorage.getItem('userToken')
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

            setRepositorySelect,
            setBranchSelect,
            Refresh,
            example,
        }
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');


html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
}

.app-container {
    display: flex;
    flex-direction: column;
    height: 100%
}

.container {
    display: flex;
    height: 100%;
}

.leftbox {
    position: relative;
    width: 75%;
    height: 100%;
    background-color: #1c1c1c;
    border-right: 3px solid rgba(204, 159, 1);
}

.leftbox_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 30px;
    color: rgba(204, 159, 1);
}

.leftbox_title span {
    color: rgba(204, 159, 1);
    font-family: "Playfair Display", serif;
    font-style: normal;
    font-weight: bold;
}

.KanbanBoardTitle {
    background-color: rgba(204, 159, 1);
}

.KanbanBoardCard {
    background-color: #444444;
}

.mb-2 {
    background-color: #c5c5c5;
}

.rightbox {
    width: 25%;
    height: 100%;
    background-color: #1c1c1c;
}

.rightbox_title span {
    color: rgba(204, 159, 1);
    font-family: "Playfair Display", serif;
    font-style: normal;
    font-weight: bold;
}

.rightbox_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 30px;
}

.example_btn {
    background-color: rgba(204, 159, 1);
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font-size: 15px;
}

.Refresh {
    background-color: rgba(204, 159, 1);
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.commit-list-container {
    background-color: #2F2F2F;
    color: #B4B4B4;
    overflow: auto;
    width: calc(100% - 10px);
    height: 650px;
    margin-left: 5px;
    margin-top: 15px;
}

.backlog-list-container {
    overflow: auto;
    height: 800px;
}

.switch {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 32px;
    height: var(--switch-height, 20px);
    position: relative;
    width: var(--switch-width, 60px);
    padding: 0 10px;
    transform: translateX(-80px);
}

.switch label {
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    line-height: var(--switch-height, 20px);
    text-transform: uppercase;
    transition: color 0.2s ease;
    width: 35px;
}

.switch label:nth-of-type(1) {
    position: absolute;
    left: -85%;
    text-align: right;
}

.switch label:nth-of-type(2) {
    position: absolute;
    right: -70%;
    text-align: left;
}

.switch input {
    height: var(--switch-height, 20px);
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: var(--switch-width, 100px);
    z-index: 2;
}

.switch input:checked~label:nth-of-type(1) {
    color: #fff;
}

.switch input:checked~label:nth-of-type(2) {
    color: #808080;
}

.switch input~ :checked~label:nth-of-type(1) {
    color: #808080;
}

.switch input~ :checked~label:nth-of-type(2) {
    color: #fff;
}

.switch input:checked~.toggle {
    left: 10px;
}

.switch input~ :checked~.toggle {
    left: 40px;
}

.switch input:checked {
    z-index: 0;
}

.toggle {
    background: #4a4a4a;
    border-radius: 50%;
    height: calc(var(--switch-height, 20px) - 8px);
    left: 0;
    position: absolute;
    top: 4px;
    transition: left 0.2s ease;
    width: calc(var(--switch-height, 20px) - 8px);
    z-index: 1;
}

.toggle.checked {
    left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 20px) - 8px));
}

.chat-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(228, 228, 228);
    padding: 10px;
    width: 50%;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
}

.chat-bar input {
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 5px;
    font-size: 14px;
}

.chat-bar a {
    background-color: rgba(204, 159, 1);
    border-radius: 50%;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}

.chat-bar a svg {
    width: 20px;
    height: 20px;
    fill: white;
}

.select-container {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    margin-top: 20px;
    gap: 20px;
    color: rgb(248, 235, 54);
}

.example_backlog {
    width: 95%;
    height: 50%;
    margin-left: 15px;
}
</style>