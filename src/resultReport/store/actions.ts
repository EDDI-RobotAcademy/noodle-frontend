import { ActionContext } from "vuex"
import { ResultReport, ResultReportState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_RESULTREPORT_LIST_TO_DJANGO } from "./mutation-types"

export type ResultReportActions = {
    requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<any>
    requestResultReportToDjango(context: ActionContext<ResultReportState, any>, resultReportId: number): Promise<any>
    requestDeleteResultReportToDjango(context: ActionContext<ResultReportState, unknown>, resultReportId: number): Promise<void>
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
    }
}

export default actions