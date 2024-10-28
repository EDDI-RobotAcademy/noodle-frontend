<template>
  <v-app-bar class="nevigationbar">
    <v-spacer>
      <!-- <img class="footer-noodle-logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="Noodle Logo" /> -->
      <v-btn @click="goToHome" alt="GO TO HOME">
        <v-toolbar-title class="goToHomeButton">
          <span>NOODLE</span>
        </v-toolbar-title>
      </v-btn>

      <!-- 메뉴 이동 버튼 -->
      <v-container class="manuBtn">
        <!-- Service 드롭다운 메뉴 -->
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn text class="custom-btn" v-bind="props">
              <span class="btn-text">Service</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToBacklogBoard">
              <v-list-item-title class="dropdown-item">Backlog Board</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToResultReport">
              <v-list-item-title class="dropdown-item">RESULT REPORT</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToReview">
              <v-list-item-title class="dropdown-item">REVIEW</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <span class="separator">|</span>
        
        <!-- 로그인/로그아웃 버튼 -->
        <v-btn v-if="this.isAuthenticated == false" @click="goToGithubLogin" text class="custom-btn" alt="GO TO GITHUBLOGIN">
          <span class="btn-text">LOGIN</span>
        </v-btn>
        <v-btn v-if="this.isAuthenticated == true" @click="goToGithubLogout" text class="custom-btn" alt="GO TO GITHUBLOGIN">
          <span class="btn-text">LOGOUT</span>
        </v-btn>
      </v-container>
    </v-spacer>
  </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
import { mapActions, mapState } from 'vuex'
import { useStore } from 'vuex';


const authenticationModule = 'authenticationModule'

export default {
    setup() {
        const store = useStore()

        const goToGithubLogin = async () => {
            await store.dispatch("authenticationModule/requestGithubOauthRedirectionToDjango")
        }

        const goToGithubLogout = async () => {
            await store.dispatch("authenticationModule/requestLogoutToDjango")
            localStorage.removeItem("userToken")
        }

        return {
            goToGithubLogin,
            goToGithubLogout
        }
    },
    data() {
        return {
            searchQuery: '',  // Model to hold the search input value

        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),

        flag() {
            return this.isAuthenticated; // Vuex 상태를 직접 참조
        }
    },
    methods: {
        goToHome() {
            router.push('/')
        },
        goToBacklogBoard() {
            router.push('/projectManage')
        },
        goToReview() {
            this.$router.push('/review/list')
        },
        goToResultReport() {
            this.$router.push('/result-report/list2')
        }
    },
    mounted() {
        const token = localStorage.getItem('userToken');
        if (token !== null) {
            this.$store.commit('authenticationModule/REQUEST_IS_AUTHENTICATED_TO_DJANGO', true);
        } else {
            this.$store.commit('authenticationModule/REQUEST_IS_AUTHENTICATED_TO_DJANGO', false);
        }
    }

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

:root {
  --navigation-bar-height: 70px;
}

/* v-app-bar 관련 */
.nevigationbar {
  background-color: rgb(0, 0, 0);
  border-bottom: 3px solid #ffffff;
  height: var(--navigation-bar-height);
}

/* v-spacer 관련 */
.v-spacer {
  width: 70% !important;
  flex: 0 0 70% !important; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* 로고 관련 */
.footer-noodle-logo {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}

.goToHomeButton {
  color: #ffffff;
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
}

/* 메뉴 버튼 관련 */
.manuBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  gap: 5px;
  margin-right: 20px;
}

.custom-btn {
  height: auto !important;
  padding: 6px 8px !important;
}

.btn-text {
  color: #ffffff !important;
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  transition: all 0.1s ease;
}

.btn-text::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.custom-btn:hover .btn-text::after {
  width: 100%;
  left: 0;
}

/* 구분선 관련 */
.separator {
  color: #ffffff;
  font-size: 20px;
  margin: 0 10px;
}

/* 드롭다운 메뉴 관련 */
.dropdown-item {
  color: #ffffff !important;
  font-family: "Playfair Display", serif;
  font-size: 16px;
  padding: 8px 16px;
}

:deep(.v-list) {
  background-color: rgb(36, 36, 36) !important;
  border: 1px solid #ffffff;
}

:deep(.v-list-item:hover) {
  background-color: rgba(255, 204, 0, 0.1) !important;
}

/* 기타 */
.temporarily {
  display: flex;
  justify-content: flex-end;
  color: rgb(0, 0, 0);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  padding-right: 70px;
}
</style>
