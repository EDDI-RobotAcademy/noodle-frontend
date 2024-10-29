import { ActionContext } from "vuex"
import { ResultReport, ResultReportState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_RESULTREPORT_LIST_TO_DJANGO } from "./mutation-types"

export type ResultReportActions = {
    requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<any>
    requestResultReportToDjango(context: ActionContext<ResultReportState, any>, resultReportId: number): Promise<any>
    requestDeleteResultReportToDjango(context: ActionContext<ResultReportState, unknown>, resultReportId: number): Promise<void>
    requestCreateResultReportToDjango(context: ActionContext<ResultReportState, any>, payload: {
        title: string, overview: string, teamMemberList: [[string]], skillList: [string], featureList: [string], usage: string, improvementList: [string], completionList: [[string]], userToken: string
    }): Promise<AxiosResponse>
    requestGenerateResultReportToFastAPI(context: ActionContext<any, any>, payload: { userToken: string, reponame: string, branchname: string }): Promise<boolean>
    requestGetResultReportResultToFastAPI(context: ActionContext<any, any>, userToken: string): Promise<any>
}

const actions: ResultReportActions = {
    async requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<any> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.post('/report/list')
            // const data: ResultReport[] = res.data
            const data: any[] = res.data
            // context.commit(REQUEST_RESULTREPORT_LIST_TO_DJANGO, data)
            console.log(data)
            return data
        }catch(error){
            console.error('requestResultReportListToDjango():'+ error)
            throw error
        }
    },
    async requestResultReportToDjango(context: ActionContext<ResultReportState, any>, resultReportId: number): Promise<any> {
        try {
            const res: AxiosResponse<ResultReport> = await axiosInst.djangoAxiosInst.get(`/report/read/${resultReportId}`)
            console.log('data:', res.data)
            return res.data
        } catch (error) {
            console.error('requestResultReportToDjango() 문제 발생:', error)
            throw error
        }
    },
    async requestDeleteResultReportToDjango(context: ActionContext<ResultReportState, unknown>, resultReportId: number): Promise<void> {
        try {
            console.log('requestDeleteResultReportToDjango()')
            await axiosInst.djangoAxiosInst.delete(`/report/delete/${resultReportId}`)
        } catch (error) {
            console.log('requestDeleteResultReportToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestCreateResultReportToDjango(context: ActionContext<ResultReportState, any>, payload: {
        title: string, overview: string, teamMemberList: [[string]], skillList: [string], featureList: [string], usage: string, improvementList: [string], completionList: [[string]], userToken: string
    }): Promise<AxiosResponse> {
        const {title, overview, teamMemberList, skillList, featureList, usage, improvementList, completionList, userToken} = payload
        console.log('전송할 데이터:', {title, overview, teamMemberList, skillList, featureList, usage, improvementList, completionList, userToken})

        try {
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/report/create', {title, overview, teamMemberList, skillList, featureList, usage, improvementList, completionList, userToken})

            console.log('res:', res.data)
            return res.data
        } catch (error) {
            alert('requestCreateResultReportToDjango() 문제 발생')
            throw error
        }
    },
    async requestGenerateResultReportToFastAPI(context: ActionContext<any, any>, payload: { userToken: string, reponame: string, branchname: string }): Promise<boolean> {
        console.log("requestGenerateResultReportToFastAPI")
        const { userToken, reponame, branchname } = payload
        console.log("userToken:", userToken)
        console.log("reponame:", reponame)
        console.log("branchname:", branchname)

        try {
            const res = await axiosInst.djangoAxiosInst.post('/ai-request/send', { userToken: userToken, command: 31, data: [userToken, reponame, branchname] })
            return res.data
        } catch (error) {
            console.error('requestGenerateResultReportToFastAPI() 문제 발생')
            throw error
        }
    },
    async requestGetResultReportResultToFastAPI(context: ActionContext<any, any>, userToken: string): Promise<any> {
        try {
            let response: AxiosResponse<any>

            const maxAttempts = 50
            const delay = 5000

            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                response = await axiosInst.fastapiAxiosInst.get('/generate-result-report-result')

                if (response.data && response.data.userToken === userToken && response.data.message) {
                    console.log("response.data:", response.data)
                    return response.data
                }

                console.log(`Attempt ${attempt} failed.`)
                await new Promise(resolve => setTimeout(resolve, delay))
            }

            throw new Error('결과를 가져오는 데 실패했습니다.')
        } catch (error) {
            console.log('requestGetResultReportResultToFastAPI() 중 문제 발생:', error)
            throw error
        }
    }
}

export default actions