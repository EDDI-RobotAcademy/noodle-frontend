import ResultReportRegisterPage from "@/resultReport/pages/register/ResultReportRegisterPage.vue"
import ResultReportListPage from "@/resultReport/pages/list/ResultReportListPage.vue"
import ResultReportReadPage from "@/resultReport/pages/read/ResultReportReadPage.vue"
import ResultReportListPage2 from "../pages/list/ResultReportListPage2.vue"
import ResultReportModifyPage from "../pages/modify/ResultReportModifyPage.vue"
import ResultReportReadPage12 from "../pages/read/ResultReportReadPage12.vue"

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
        path: "/result-report/list2",
        name: "ResultReportListPage2",
        component: ResultReportListPage2
    },
    {
        path: "/result-report/read/1",
        name: "ResultReportReadPage",
        component: ResultReportReadPage
    },
    {
        path: "/result-report/modify/1",
        name: "ResultReportModifyPage",
        component: ResultReportModifyPage
    },
    {
        path: "/result-report/read/12",
        name: "ResultReportReadPage12",
        component: ResultReportReadPage12
    },
]

export default ResultReportRoutes