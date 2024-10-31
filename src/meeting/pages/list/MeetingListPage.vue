<template lang="">
    <v-container>
        <h2 class="center-text">회의록</h2>
        
        <v-data-table
                v-model:item-per-page="perPage"
                :headers="headerTitle"
                :items="pageItems"
                v-model:pagination="pagination"
                class="elevation-1"
                @click:row="readRow"
                item-value="meetingId"/> 
            <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(meetings.length / perPage)"
                color="primary"
                @input="updateItems"/>
    </v-container>
</template>

<script>
import { toRaw } from 'vue';
import {mapActions, mapState} from 'vuex'

const meetingModule = 'meetingModule'

export default{
    computed:{
        ...mapState(meetingModule, ['meetings']),
        pageItems(){
            
            const startIdx = (this.pagination.page - 1)*this.perPage
            const endIdx = startIdx + this.perPage
            return this.meetings.slice(startIdx, endIdx)
        }
    },
    mounted () {
        this.requestMeetingListToDjango()
    },
    methods: {
        ...mapActions(meetingModule, ['requestMeetingListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'MeetingReadPage',
                params: { meetingId: item['meetingId'].toString() }
            })
        }
    },
    data(){
        return{
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'meetingId'
                },
                {title: '제목', align: 'end', key: 'title'},
                {title: '작성자', align: 'end', key: 'writer'},
                {title: '작성일자', align: 'end', key: 'regDate'},
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    }
}

</script>