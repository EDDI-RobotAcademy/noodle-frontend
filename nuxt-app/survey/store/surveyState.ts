export const surveyState = () => ({
	surveyList: [] as SurveyComponent[],
	survey: null as SurveyComponent | null,
});

type SurveyComponent = {
	surveyId: number;
	questions: string[];
	answers: string[][];
};
