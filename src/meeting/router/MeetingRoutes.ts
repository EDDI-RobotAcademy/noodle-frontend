import MeetingListPage from "../pages/list/MeetingListPage.vue"
import MeetingReadPage from "../pages/read/MeetingReadPage.vue"

const MeetingRoutes = [
    {
        path: "/meeting/list",
        name: "MeetingListPage",
        component: MeetingListPage
    },
    {
        path: "/meeting/read/:meetingId",
        name: "MeetingReadPage",
        components: {
            default: MeetingReadPage
        },
        props: {
            default: true
        }
    },
]

export default MeetingRoutes