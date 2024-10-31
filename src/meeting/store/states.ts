export interface MeetingState{
    meetings: Meeting[]
    meeting: Meeting | null
}

export interface Meeting{
    meetingId: number
    title: string
    writer: string
    content: string
    regDate: string
}

const state: MeetingState = {
    meetings: [],
    meeting: null
}

export default state