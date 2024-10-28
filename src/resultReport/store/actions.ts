import { ActionContext } from "vuex"
import { ResultReport, ResultReportState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_RESULTREPORT_LIST_TO_DJANGO } from "./mutation-types"

export type ResultReportActions = {
    requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<any>
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
    }
}

export default actions