<template>
    <div></div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(authenticationModule,
            ['requestAccessTokenToDjangoRedirection', 'requestUserInfoToDjango']
        ),
        async setRedirectData() {
            const code = this.$route.query.code
            console.log('code:', code)
            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = await this.requestUserInfoToDjango()
            console.log('userInfo:', userInfo)
            localStorage.setItem('nickname', userInfo.login)
            this.$router.push('/')
        }
    },
    async created() {
        await this.setRedirectData()
    }
}

</script>