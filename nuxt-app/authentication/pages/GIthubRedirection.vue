<template>
    <div style="background-color: #1c1c1c" class="full-sized-container">
        <v-card class="margin-container"></v-card>
        <img :src="'/fixed/NOODLE_logo.png'" class="NOODLE_logo">
        <v-card class="margin-container"></v-card>
        <img :src="'/fixed/github_logo.png'" class="github_logo">
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '../stores/authenticationStore';

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const authenticationStore = useAuthenticationStore()

        const code = ref(route.query.code)

        async function setRedirectData() {
            const response = await authenticationStore.requestAccessTokenToDjangoRedirection({ "code": code.value })
            await localStorage.setItem('userToken', response.userToken)
            router.push('/')
        }

        onMounted(async () => {
            await setRedirectData()
        })

        return {

        }
    }
})
</script>

<style scoped>
.full-sized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.margin-container {
    width: 75px;
}

.NOODLE_logo,
.github_logo {
    margin: 0 50px;
}

.NOODLE_logo {
    width: 225px;
    height: 225px;
}

.github_logo {
    width: 300px;
    height: 300px;
}
</style>