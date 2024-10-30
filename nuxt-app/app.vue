<template>
  <v-app>
    <v-main>
      <v-app-bar class="navigationbar" :class="{ 'scrolled': isScrolled }" :height="isScrolled ? 50 : 70">
        <v-spacer>
          <v-btn @click="goToHome" alt="GO TO HOME">
            <v-toolbar-title class="goToHomeButton">
              <span>NOODLE</span>
            </v-toolbar-title>
          </v-btn>

          <v-container class="manuBtn">
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

            <v-btn v-if="isAuthenticated == false" @click="goToGithubLogin" text class="custom-btn"
              alt="GO TO GITHUBLOGIN">
              <span class="btn-text">LOGIN</span>
            </v-btn>
            <v-btn v-if="isAuthenticated == true" @click="goToGithubLogout" text class="custom-btn"
              alt="GO TO GITHUBLOGIN">
              <span class="btn-text">LOGOUT</span>
            </v-btn>
          </v-container>
        </v-spacer>
      </v-app-bar>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from './authentication/stores/authenticationStore';

export default defineComponent({
  setup() {
    const router = useRouter();
    const authenticationStore = useAuthenticationStore();

    const searchQuery = ref('')
    const isScrolled = ref(false)
    const isAuthenticated = computed(() => authenticationStore.isAuthenticated)

    const menuClass = computed(() => {
      return {
        'menu-default': !isScrolled.value,
        'menu-scrolled': isScrolled.value
      }
    })
    const menuItemClass = computed(() => {
      {
        return {
          'menu-item-default': !isScrolled.value,
          'menu-item-scrolled': isScrolled.value
        }
      }
    }
    )

    async function goToGithubLogin() {
      await authenticationStore.requestGithubOauthRedirectionToDjango()
    }
    async function goToGithubLogout() {
      await authenticationStore.requestLogoutToDjango()
      alert('로그아웃 되었습니다. 홈페이지로 이동합니다.')
      goToHome()
    }
    function goToBacklogBoard() {
      router.push('/projectManage')
    }
    function goToResultReport() {
      router.push('/resultReport/list')
    }
    function goToReview() {
      router.push('/review/list/1')
    }
    function goToHome() {
      router.push('/')
    }
    function handleScroll() {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(async () => {
      if (authenticationStore.isAuthenticated != undefined) {
        await authenticationStore.requestUserTokenValidationToDjango()
        if (authenticationStore.isAuthenticated == false) {
          localStorage.removeItem('userToken')
        }
      }
      window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      searchQuery,
      isAuthenticated,
      isScrolled,
      menuClass,
      menuItemClass,
      isAuthenticated,

      goToGithubLogin,
      goToGithubLogout,
      goToBacklogBoard,
      goToResultReport,
      goToReview,
      goToHome,
      handleScroll,
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

/* 전역 변수 */
:root {
  --navigation-bar-height: 70px;
  --navigation-bar-scrolled-height: 50px;
}

/* 1. v-app-bar 기본 스타일 */
.navigationbar {
  background-color: #000000 !important;
  border-bottom: 3px solid #ffffff;
  transition: all 0.3s ease;
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
.navigationbar.scrolled {
  /* background-color: rgb(240, 240, 240); */
  border-bottom: 2px solid rgb(255, 240, 30);
  height: var(--navigation-bar-scrolled-height) !important;
  min-height: var(--navigation-bar-scrolled-height) !important;
  max-height: var(--navigation-bar-scrolled-height) !important;
}

/* 홈 버튼 */
.navigationbar.scrolled .goToHomeButton {
  color: rgb(255, 240, 30) !important;
  font-size: 25px;
}

/* 메뉴 버튼 */
.navigationbar.scrolled .btn-text {
  /* color: rgba(0, 0, 0, 0.9) !important; */
  font-size: 20px;
}

/* 구분선 */
.navigationbar.scrolled .separator {
  /* color: rgba(0, 0, 0, 0.9) !important; */
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
.navigationbar.scrolled .custom-btn:hover .btn-text::after,
.navigationbar.scrolled .custom-btn.active .btn-text::after {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
