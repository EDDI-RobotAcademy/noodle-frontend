export const resultReportState = () => ({
	resultReportList: [] as resultReport[],
	resultReportComponent: null as resultReport | null,
});

type resultReport = {
	resultReportId: 0;
	title: "";
	writer: "";
	content: "";
	regDate: "";
	updDate: "";
};
