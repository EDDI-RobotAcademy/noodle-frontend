<template>
  <v-app>
    <v-main>
      <v-app-bar class="navigationbar" style="background-color: rgb(36,36,36);">
        <!-- <img class="footer-noodle-logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="Noodle Logo" /> -->
        <v-btn @click="goToHome" alt="GO TO HOME">
          <v-toolbar-title class="goToHomeButton">
            <span>NOODLE</span>
          </v-toolbar-title>
        </v-btn>

        <!-- 메뉴 이동 버튼 -->
        <v-container class="manuBtn">
          <v-btn @click="goToBacklogBoard" text class="custom-btn" alt="GO TO BACKLOGBOARD">
            <span class="btn-text">Backlog Board</span>
          </v-btn>
          <span class="separator">|</span>
          <v-btn @click="goToResultReport" text class="custom-btn" alt="GO TO RESULTREPORT">
            <span class="btn-text">RESULT REPORT</span>
          </v-btn>
          <span class="separator">|</span>
          <v-btn @click="goToReview" text class="custom-btn" alt="GO TO REVIEW">
            <span class="btn-text">REVIEW</span>
          </v-btn>
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
      </v-app-bar>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthenticationStore } from './authentication/stores/authenticationStore';

export default defineComponent({
  setup() {
    const router = useRouter()
    const authenticationStore = useAuthenticationStore()

    const searchQuery = ref('')
    const isAuthenticated = ref(false)

    async function goToGithubLogin() {
      await authenticationStore.requestGithubOauthRedirectionToDjango()
    }
    function goToGithubLogout() {
      // action 호출 예정
    }
    function goToBacklogBoard() {
      router.push('/projectManager')
    }
    function goToResultReport() {
      router.push('/result-report/list2')
    }
    function goToReview() {
      router.push('/review/list')
    }
    function goToHome() {
      router.push('/')
    }
    function flag() {
      isAuthenticated.value = authenticationStore.isAuthenticated
    }

    onMounted(async () => {
      flag()
    })

    return {
      searchQuery,
      isAuthenticated,

      goToGithubLogin,
      goToGithubLogout,
      goToBacklogBoard,
      goToResultReport,
      goToReview,
      goToHome,
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.navigationbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #ffcc00;
  height: 70px;
}

.goToHomeButton {
  color: #ffcc00;
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  /* margin-left: -10px; */
}

.custom-btn {
  height: auto !important;
  padding: 6px 8px !important;
}

.btn-text {
  color: #ffcc00 !important;
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  transition: all 0.3s ease;
}

.btn-text::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: #ffcc00;
  transition: all 0.3s ease;
}

.custom-btn:hover .btn-text::after {
  width: 100%;
  left: 0;
}

.manuBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  gap: 5px;
  margin-right: 20px;
}

.separator {
  color: #ffcc00;
  font-size: 20px;
  margin: 0 10px;
}

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