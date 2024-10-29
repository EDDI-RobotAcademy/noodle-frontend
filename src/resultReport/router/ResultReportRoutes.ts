import ResultReportRegisterPage from "@/resultReport/pages/register/ResultReportRegisterPage.vue"
import ResultReportListPage from "@/resultReport/pages/list/ResultReportListPage.vue"
import ResultReportReadPage from "@/resultReport/pages/read/ResultReportReadPage.vue"
import ResultReportListPage2 from "../pages/list/ResultReportListPage2.vue"
import ResultReportModifyPage from "../pages/modify/ResultReportModifyPage.vue"
import ResultReportReadPage12 from "../pages/read/ResultReportReadPage12.vue"
import ResultReportListPage3 from "@/resultReport/pages/list/ResultReportListPage3.vue"

const ResultReportRoutes = [
    {
        path: "/report/register",
        name: "ResultReportRegisterPage",
        component: ResultReportRegisterPage,
    },
    {
        path: "/report/list",
        name: "ResultReportListPage",
        component: ResultReportListPage
    },
    {
        path: "/report/list3",
        name: "ResultReportListPage3",
        component: ResultReportListPage3
    },
    {
        path: "/report/read/:resultReportId",
        name: "ResultReportReadPage",
        components: {
            default: ResultReportReadPage
        },
        props: {
            default: true
        }
    },
    {
        path: "/result-report/modify/1",
        name: "ResultReportModifyPage",
        component: ResultReportModifyPage
    },
]

export default ResultReportRoutes