<template>
  <v-app-bar 
    class="nevigationbar" 
    :class="{ 'scrolled': isScrolled }"
    :height="isScrolled ? 50 : 70"
  >
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
          <template v-slot:activator="{ props, isActive }">
            <v-btn text class="custom-btn" v-bind="props" :class="{ 'active': isActive }">
              <span class="btn-text">Service</span>
            </v-btn>
          </template>
          <v-list :class="menuClass">
            <v-list-item @click="goToBacklogBoard">
              <v-list-item-title :class="menuItemClass">Backlog Board</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToResultReport">
              <v-list-item-title :class="menuItemClass">RESULT REPORT</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToReview">
              <v-list-item-title :class="menuItemClass">REVIEW</v-list-item-title>
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
            isScrolled: false  // 스크롤 상태를 추적하는 변수 추가
        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),

        flag() {
            return this.isAuthenticated; // Vuex 상태를 직접 참조
        },
        menuClass() {
            return {
                'menu-default': !this.isScrolled,
                'menu-scrolled': this.isScrolled
            }
        },
        menuItemClass() {
            return {
                'menu-item-default': !this.isScrolled,
                'menu-item-scrolled': this.isScrolled
            }
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
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50; // 스크롤이 50px 이상이면 true
        },
    },
    mounted() {
        const token = localStorage.getItem('userToken');
        if (token !== null) {
            this.$store.commit('authenticationModule/REQUEST_IS_AUTHENTICATED_TO_DJANGO', true);
        } else {
            this.$store.commit('authenticationModule/REQUEST_IS_AUTHENTICATED_TO_DJANGO', false);
        }

        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        // 컴포넌트가 제거될 때 이벤트 리스너 제거
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

/* 전역 변수 */
:root {
  --navigation-bar-height: 70px;
  --navigation-bar-scrolled-height: 50px;
}

/* 1. v-app-bar 기본 스타일 */
.nevigationbar {
  background-color: rgb(0, 0, 0);
  border-bottom: 3px solid #ffffff;
  height: var(--navigation-bar-height) !important;
  min-height: var(--navigation-bar-height) !important;
  max-height: var(--navigation-bar-height) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 2. v-spacer 스타일 */
.v-spacer {
  width: 70% !important;
  flex: 0 0 70% !important; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* 3. 홈 버튼/로고 관련 */
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
}

/* 4. 메뉴 버튼 컨테이너 */
.manuBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  gap: 5px;
  margin-right: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 5. 공통 버튼 스타일 */
.custom-btn {
  height: auto !important;
  padding: 6px 8px !important;
}

.btn-text {
  color: #ffffff !important;
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 버튼 호버 효과 */
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

.custom-btn:hover .btn-text::after,
.custom-btn.active .btn-text::after {
  width: 100%;
  left: 0;
}

/* 6. 드롭다운 메뉴 스타일 */
:deep(.menu-default) {
  background-color: rgb(36, 36, 36) !important;
  border: 1px solid #ffffff;
}

:deep(.menu-item-default) {
  color: #ffffff !important;
  font-family: "Playfair Display", serif !important;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
}

:deep(.menu-default .v-list-item:hover) {
  background-color: rgba(206, 206, 206, 0.199) !important;
}

/* 7. 구분선 */
.separator {
  color: #ffffff;
  font-size: 20px;
  margin: 0 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 8. 스크롤 시 적용되는 스타일 */
/* 네비게이션 바 */
.nevigationbar.scrolled {
  background-color: rgb(250, 250, 250);
  border-bottom: 3px solid rgb(31, 31, 31);
  height: var(--navigation-bar-scrolled-height) !important;
  min-height: var(--navigation-bar-scrolled-height) !important;
  max-height: var(--navigation-bar-scrolled-height) !important;
}

/* 홈 버튼 */
.nevigationbar.scrolled .goToHomeButton {
  color: rgba(0, 0, 0, 0.9) !important;
  font-size: 25px;
}

/* 메뉴 버튼 */
.nevigationbar.scrolled .btn-text {
  color: rgba(0, 0, 0, 0.9) !important;
  font-size: 20px;
}

/* 구분선 */
.nevigationbar.scrolled .separator {
  color: rgba(0, 0, 0, 0.9) !important;
  font-size: 16px;
}

/* 스크롤 시 드롭다운 메뉴 */
:deep(.menu-scrolled) {
  background-color: rgb(255, 255, 255) !important;
  border: 1px solid rgba(0, 0, 0, 0.9) !important;
}

:deep(.menu-item-scrolled) {
  color: rgba(0, 0, 0, 0.9) !important;
  font-family: "Playfair Display", serif !important;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
}

:deep(.menu-scrolled .v-list-item:hover) {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

/* 스크롤 시 밑줄 효과 */
.nevigationbar.scrolled .custom-btn:hover .btn-text::after,
.nevigationbar.scrolled .custom-btn.active .btn-text::after {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>

