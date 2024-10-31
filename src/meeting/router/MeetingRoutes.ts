import MeetingListPage from "../pages/list/MeetingListPage.vue"

const MeetingRoutes = [
    {
        path: "/meeting/list",
        name: "MeetingListPage",
        component: MeetingListPage
    },
    // {
    //     path: "/meeting/read/:meetingId",
    //     name: "MeetingReadPage",
    //     components: {
    //         default: ResultReportReadPage
    //     },
    //     props: {
    //         default: true
    //     }
    // },
]

export default MeetingRoutes