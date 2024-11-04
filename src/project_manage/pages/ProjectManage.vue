<template>
  <div class="app-container">
    <div class="container">
      <div class="leftbox">
        <div class="leftbox_title">
          <span>Backlog Board</span>
          <div class="leftbox_title_btn-area">
            <v-btn size="small" class="backlog-btn">Backlog 생성</v-btn>
          </div>
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
              클릭해보세요!
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
              클릭해보세요!
            </v-btn>
            <v-btn @click="rightboxstate = 'Commit-List'" class="commitlist-btn">
              <v-icon left>mdi-view-list</v-icon>
              Commit-List
            </v-btn>
          </div>
        </div>

        <div class="report-area">
          <v-container class="report-container">
            <v-card class="mx-auto" max-width="1000">
              <!-- 프로젝트 제목 섹션 -->
              <v-card-title class="text-h4 font-weight-bold text-center pa-4">
                <h2 class="text-h5 mb-4">프로젝트 제목</h2>
                <v-text-field
                  v-model="projectTitle"
                  label="프로젝트 제목"
                  outlined
                  dense
                ></v-text-field>
              </v-card-title>

              <v-divider></v-divider>

              <!-- 개요 섹션 -->
              <v-card-title class="text-h4 font-weight-bold pa-4">
                <h2 class="text-h5 mb-4">개요</h2>
                <v-text-field
                  v-model="overview"
                  label="개요"
                  outlined
                  dense
                ></v-text-field>
              </v-card-title>


              <v-divider></v-divider>
        
              <!-- 팀 구성 섹션 -->
              <v-card-text>
                <h2 class="text-h5 mb-4">팀 구성</h2>
                <v-row v-for="(member, index) in teamMembers" :key="index" align="center">
                  <v-col cols="4">
                    <v-text-field
                      v-model="member.department"
                      label="부서"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="member.name"
                      label="이름"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="member.role"
                      label="역할"
                      outlined
                      dense
                    ></v-text-field>
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
                        <v-text-field
                          v-model="techStack[index]"
                          label="기술명"
                          outlined
                          dense
                        ></v-text-field>
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
                        <v-textarea
                          v-model="features[index]"
                          label="기능 설명"
                          outlined
                          auto-grow
                          dense
                          class="auto-expand-textarea"
                        ></v-textarea>
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
                      <v-text-field
                        v-model="usage.title"
                        label="활용 방안 제목"
                        outlined
                        dense
                      ></v-text-field>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-textarea
                        v-model="usage.description"
                        label="상세 설명"
                        outlined
                        auto-grow
                        rows="3"
                        hide-details
                        class="auto-expand-textarea"
                      ></v-textarea>
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
                      <v-text-field
                        v-model="improvements[index]"
                        label="보완 사항"
                        outlined
                        dense
                      ></v-text-field>
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
                  <v-col v-for="(item, index) in completionRates" :key="index" cols="auto" class="text-center">
                    <h3>{{ item.label }}</h3>
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
import { useStore } from 'vuex';
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import { toRaw } from 'vue';
const productManageModule = 'productManageModule'
const authenticationModule = 'authenticationModule'
const backlogModule = 'backlogModule'
const resultReportModule = 'resultReportModule'
import DragSection from '@/project_manage/pages/ProjectManageComponents/DragSection.vue';


export default {
  name: "App",
  components: {
    // DragSection,
  },

  // Report 관련
  props: {
    resultReportId: {
      type: String,
      required: true,
    }
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
      rightboxstate: 'Commit-List',
      displayBacklogList: [], // 지연 렌더링 백로그 리스트

      // Report 관련 데이터
      projectTitle: '',
      overview: '',
      teamMembers: [],
      techStack: [],
      features: [],
      usagePlans: [],
      improvements: [],
      completionRates: [],
      completionFeedback: [],
      size: 120,
      strokeWidth: 10,
      
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

    // Report 관련
    
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
    ...mapActions(resultReportModule, ["requestGenerateResultReportToFastAPI", "requestGetResultReportResultToFastAPI", "requestCreateResultReportToDjango"]),
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
    },

    // Report 관련
    dashOffset(rate) {
      return this.circumference - (rate / 100 * this.circumference);
    },
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
      this.usagePlans.push('');
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
    async onSubmit () {
        console.log('작성 완료 버튼 눌렀지 ?')

        const payload = {
            title: this.title,
            overview: this.overview,
            teamMemberList: this.teamMemberList,
            skillList: this.skillList,
            featureList: this.featureList,
            usage: this.usage,
            imporvementList: this.imporvementList,
            completionList: this.completionList,
            userToken: localStorage.getItem("userToken")
        }

        const resultReportId = await this.requestCreateResultReportToDjango(payload)
      
        await this.$router.push({
            name: 'ResultReportReadPage',
            params: {resultReportId: resultReportId.toString()}
        })
    },
  },
  mounted() {
   if (localStorage.getItem('userToken')) {
      // 사용자 인증 과정 추가해야 함
   } else {
     alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.")
     this.goToGithubLogin()
   }
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
  border-right: 3px solid rgb(255, 255, 255);
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
  color: rgb(255, 255, 255);
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

.commit-list-container::-webkit-scrollbar,
.report-area::-webkit-scrollbar {
  width: 10px;
}

.commit-list-container::-webkit-scrollbar-thumb,
.report-area::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.commit-list-container::-webkit-scrollbar-track,
.report-area::-webkit-scrollbar-track {
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

.report-area{
  width: 100%;
  height: 90%;
  overflow: auto;
}




/* Report 관련 CSS */

.report-container {
  width: 100%;
  height: 100%;
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
}

.Refresh {
  background-color: transparent;
  color: white;  /* 아이콘 색상을 흰색으로 설정 */
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

.Report-btn{
  font-weight: bold;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: white;
  border: 1px solid white;
  background-color: transparent;
}

.commitlist-btn{
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
  background-color: rgb(238, 222, 0) !important; /* 노란색 배경 */
  color: rgb(255, 255, 255) !important; /* 흰색 글씨 */
}

.Report-btn:hover .v-icon,
.example_btn:hover .v-icon,
.commitlist-btn:hover .v-icon,
.backlog-btn:hover .v-icon {
  color: rgb(255, 255, 255) !important;
}
</style>
