<template>
  <div class="app-container">
    <div class="container">
      <div class="leftbox">
        <div class="leftbox_title">
          <span>Backlog Board</span>
          <ReportSwitch v-model="isChecked" />
        </div>

        <!-- 생성된 백로그 출력부 -->
        <v-card class="backlog-list-container">
          <v-list style="background-color: #2f2f2f;">
            <v-list-item v-for="(backlog, index) in displayBacklogList" :key="index" class="fade-in">
              <v-card style="background-color: #3c3c3c;">
                <v-list-item v-for="(key, item, index) in backlog" :key="index">
                  <v-card-item>
                    <v-card-text style="color: white; font-weight:bold; margin-top:-10px; margin-bottom: -10px;">
                      {{ item }}
                    </v-card-text>
                    <div v-if="item === `Task List`">
                      <v-list-item v-for="(item, index) in key" :key="index">
                        <v-card-text style="color: white; margin-top: -10px; margin-bottom: -10px;">
                          {{ item }}
                        </v-card-text>
                      </v-list-item>
                    </div>
                    <div v-else>
                      <v-list-item>
                        <v-card-text style="color: white; margin-top:-10px;">{{ key }}</v-card-text>
                      </v-list-item>
                    </div>
                  </v-card-item>
                </v-list-item>
              </v-card>
            </v-list-item>
          </v-list>
        </v-card>
      </div>

      <div class="rightbox" v-show="isChecked === 'Commit-List'">
        <div class="rightbox_title">
          <span>Commit List</span>
          <div class="rightbox_title_btn">
            <v-btn @click="example" class="example_btn">클릭해보세요!</v-btn>
            <v-btn @click="Refresh" class="Refresh">Refresh</v-btn>
          </div>
        </div>
        
        <div class="rightbox-content" v-if="!isExample">
          <div class="select-container-area">
            <div class="select-container" v-if="repos">
              <v-select 
                v-model="selectedRepository" 
                :value="selectedRepository" 
                :items="repos" 
                class="repository"
                @change="setRepositorySelect($event)"
              >
                <option v-for="(item, index) in repos" :key="index" :value="item.value">
                  {{ item.value }}
                </option>
              </v-select>
              <div v-if="branches">
                <v-select 
                  v-model="selectedBranches" 
                  :value="selectedBranch" 
                  :items="branches" 
                  class="branch"
                  @change="setBranchSelect($event)"
                >
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
          <v-card v-else class="commit-list-container"></v-card>
        </div>
      </div>

<!-------------------Switch가 Report일 때 (Report)-------------------------->
      <div class="rightbox" v-show="isChecked === 'Report'">
        <div class="rightbox_title">
          <span>Report</span>
        </div>

      </div>



    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import { toRaw } from 'vue';
const productManageModule = 'productManageModule'
const authenticationModule = 'authenticationModule'
const backlogModule = 'backlogModule'
import ReportSwitch from '@/project_manage/pages/ProjectManageComponents/ReportSwitch.vue'
import DragSection from '@/project_manage/pages/ProjectManageComponents/DragSection.vue';

const resultReportModule = 'resultReportModule'

export default {
  name: "App",
  components: {
    ReportSwitch,
    // DragSection,
  },
  setup() {
    const store = useStore()

    const goToGithubLogin = async () => {
      await store.dispatch("authenticationModule/requestGithubOauthRedirectionToDjango")
    }

    return {
      goToGithubLogin
    }
  },
  data() {
    return {
      isChecked: 'Commit-List', // 스위치의 초기 상태
      displayBacklogList: [], // 지연 렌더링 백로그 리스트
      columns: [
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
      ],
      selectedRepository: "Select a repository",
      selectedBranches: "Select a branch",
      selectedCommits: "",
      exampleRepository: "noodle-frontend",
      exampleBranch: "develop",
      exampleCommits: [],
      isExample: false,
      backlogList: null,
    };
  },
  computed: {
    ...mapState(productManageModule, ["repos", "branches", "commits"]),
  },
  watch: {
    async selectedRepository(newVal) {
      console.log('selectedRepository:', newVal)

      if (newVal !== null) {
        await this.setRepositorySelect()
      }
    },
    async selectedBranches(newVal) {
      console.log('selectedBranches:', newVal)

      if (newVal !== null) {
        await this.setBranchSelect()
      }
    },
    isChecked(newVal) {
    console.log('스위치 상태:', newVal)
  }
  },
  methods: {
    ...mapActions(productManageModule, ["requestSaveReposListToDjango", "requestGetReposListToDjango", "requestSaveBranchListToDjango", "requestGetBranchListToDjango", "requestSaveCommitListToDjango", "requestGetCommitListToDjango"]),
    ...mapActions(backlogModule, ["requestGenerateBacklogToFastAPI", "requestBacklogListToFastAPI"]),
    ...mapActions(resultReportModule, ["requestGenerateResultReportToFastAPI", "requestGetResultReportResultToFastAPI"]),
    async setRepositorySelect(event) {
      const selectedValue = event
      // this.selectedBranches = selectedValue
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken, 'reponame': this.selectedRepository }
      await this.requestSaveBranchListToDjango(payload)
      const res = await this.requestGetBranchListToDjango(payload)
      console.log("res:", res)
    },
    async setBranchSelect(event) {
      const selectedValue = event
      // this.selectedBranches = selectedValue
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken, 'reponame': this.selectedRepository, 'branchname': this.selectedBranches }
      await this.requestSaveCommitListToDjango(payload)
      const res = await this.requestGetCommitListToDjango(payload)
      console.log("commits response:", res)
      console.log("commits:", this.commits)
      const response = await this.requestGenerateResultReportToFastAPI(payload)
      console.log("FastAPI response:", response)
      const getResultReportData = await this.requestGetResultReportResultToFastAPI(userToken)
      console.log("getResultReportData:", getResultReportData)
    },
    async Refresh() {
      this.isExample = false
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken }
      await this.requestSaveReposListToDjango(payload)
      const res = await this.requestGetReposListToDjango(payload)
    },
    async example() {
      this.isExample = true;
      try {
        const url = `https://api.github.com/repos/EDDI-RobotAcademy/noodle-backend/commits?sha=develop`
        const response = await axios.get(url)
        const data = response.data
        const proxyData = []
        console.log('data:', data)
        for (let i = 0; i < data.length; i++) {
          proxyData.push(data[i].commit.message)
        }
        this.exampleCommits = toRaw(proxyData)
        console.log(this.exampleCommits)

        const payload = { username: "EDDI-RobotAcademy", reponame: "noodle-backend", branchname: "develop" }
        // await this.requestGenerateBacklogToFastAPI(payload)
        // this.backlogList = await this.requestBacklogListToFastAPI()
        // if (this.backlogList == "아직 데이터를 처리 중이거나 요청한 데이터가 없습니다") {
        //   this.backlogList = ["아직 데이터를 처리 중이거나 요청한 데이터가 없습니다"]
        // }
        this.backlogList = [
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
        console.log("backlogList:", this.backlogList)
        console.log("type:", this.backlogList.type)

      } catch (error) {
        console.error("Error fetching commits:", error)
      }
      this.displayBacklogList = [];
      for (let i = 0; i < this.backlogList.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 딜레이 조정
        this.displayBacklogList.push(this.backlogList[i]);
      }
    }
  },
  mounted() {
    // if (localStorage.getItem('userToken')) {
      // 사용자 인증 과정 추가해야 함
    // } else {
      // alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.")
      // this.goToGithubLogin()
    // }
  }
};
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
  color: rgba(204, 159, 1);
}

.leftbox_title span {
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
}

.backlog-list-container {
  overflow: auto;
  width: 99%;
  height: 88.5%;
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

.rightbox_title span {
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
}

.rightbox_title_btn {
  display: flex;
  gap: 20px;
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


.rightbox-content{
  width: 100%;
  height: 90%;
}

.select-container-area{
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
  color: rgb(248, 235, 54);
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
  height: 87.5%;
  margin: 4px;
}

.commit-list-container::-webkit-scrollbar {
  width: 10px;
}

.commit-list-container::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.commit-list-container::-webkit-scrollbar-track {
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





/* Report 관련 CSS */


</style>
