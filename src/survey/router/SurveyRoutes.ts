import SurveyRegisterPage from "@/survey/pages/SurveyRegisterPage.vue";
import SurveyReadPage from "@/survey/pages/SurveyReadPage.vue";

const SurveyRoutes = [
    {
        path: "/survey/register",
        name: "SurveyRegisterPage",
        component: SurveyRegisterPage
    },
    {
        path: '/survey/read/:surveyId',
        name: 'SurveyReadPage',
        components: {
            default: SurveyReadPage,
        },
        props: {
            default: true
        }
    },
]

export default SurveyRoutes