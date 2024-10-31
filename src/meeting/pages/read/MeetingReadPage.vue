<template>
    <v-container>
        <v-card v-if="meeting">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="meeting.title" readonly label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="meeting.writer" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="meeting.content" readonly label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">삭제</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'MeetingListPage' }">
                                <v-btn color="secondary">돌아가기</v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const meetingModule = 'meetingModule'
export default {
    props: {
        meetingId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(meetingModule, ['meeting'])
    },
    methods: {
        ...mapActions(meetingModule, ['requestMeetingToDjango','requestDeleteMeetingToDjango']),
        async onDelete () {
            console.log('삭제를 누르셨습니다!')
            await this.requestDeleteMeetingToDjango(this.meetingId) 
            await this.$router.push({name: 'MeetingListPage'})
        },
    },
    created () {
        this.requestMeetingToDjango(this.meetingId)
    },
    
}
</script>