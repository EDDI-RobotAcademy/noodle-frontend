import MeetingRecorder from "@/recording/pages/MeetingRecorder.vue"
import recordingTestPage from "@/recording/pages/recordingTestPage.vue"

const recordingRoutes = [
    {
      path: '/recording',
      name: 'recording',
      component: recordingTestPage,
    },
    {
      path: '/meeting-recorder',
      name: 'meeting-recorder',
      component: MeetingRecorder
    }
]

export default recordingRoutes