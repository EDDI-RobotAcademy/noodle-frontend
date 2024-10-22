<template>
    <v-app-bar class="nevigationbar">
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
            <v-btn v-if="this.isAuthenticated == false" @click="goToGithubLogin" text class="custom-btn"
                alt="GO TO GITHUBLOGIN">
                <span class="btn-text">LOGIN</span>
            </v-btn>
            <v-btn v-if="this.isAuthenticated == true" @click="goToGithubLogout" text class="custom-btn"
                alt="GO TO GITHUBLOGIN">
                <span class="btn-text">LOGOUt</span>
            </v-btn>
        </v-container>
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
            sessionStorage.removeItem("userToken")
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
        const token = sessionStorage.getItem('userToken');
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

.nevigationbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(36, 36, 36);
    border-bottom: 3px solid #ffcc00;
    height: var(--navigation-bar-height);
}

.footer-noodle-logo {
    width: 50px;
    height: 50px;
    margin-left: 20px;
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