<template>
    <div class="meeting-report-body">
        <v-container class="meeting-report-container" fluid>
            <v-card v-if="meeting">
                <v-card-text class="text-body">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="meeting.title" 
                                    readonly 
                                    label="제목"
                                    hide-details
                                    class="custom-text-field"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="meeting.writer" 
                                    readonly 
                                    label="생성자"
                                    hide-details
                                    class="custom-text-field"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea v-model="meeting.content" readonly label="회의 내용" auto-grow/>
                            </v-col>
                        </v-row>
                        <v-row justify="end">
                            <v-col cols="auto">
                                <v-btn class="btn" @click="onDelete">삭제</v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <router-link :to="{ name: 'MeetingListPage' }">
                                    <v-btn class="btn">돌아가기</v-btn>
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
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

<style scoped>
.meeting-report-body{
    background-color: #1c1c1c;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.meeting-report-container{
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.btn{
    background-color: #000000;
    color: #ffffff;
    font-weight: bold;
    border-radius: 10px;
    border: 2px solid #000000;
    font-size: 1.0rem;
}

.btn:hover{
    background-color: #ffffff;
    color: #000000;
}

.v-card{
    margin-top: 3%;
}

.custom-text-field >>> input {
    font-size: 1.3rem;
}

</style>
