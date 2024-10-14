import ResultReportRegisterPage from "@/resultReport/pages/register/ResultReportRegisterPage.vue"
import ResultReportListPage from "@/resultReport/pages/list/ResultReportListPage.vue"
import ResultReportReadPage from "@/resultReport/pages/read/ResultReportReadPage.vue"

const ResultReportRoutes = [
    {
        path: "/result-report/register",
        name: "ResultReportRegisterPage",
        component: ResultReportRegisterPage,
    },

    {
        path: "/result-report/list",
        name: "ResultReportListPage",
        component: ResultReportListPage
    },
    {
        path: "/result-report/read",
        name: "ResultReportReadPage",
        component: ResultReportReadPage
    }
]

export default ResultReportRoutes