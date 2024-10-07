import { ActionContext } from "vuex"
import { Review, ReviewState } from "./states"
import { AxiosResponse } from "axios"
import { REQUEST_REVIEW_LIST_TO_DJANGO } from "./mutation-types"
import axiosInst from '@/utility/axiosInstance'

export type ReviewActions = {
    requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void>
}

const actions: ReviewActions = {
    async requestReviewListToDjango(context: ActionContext<ReviewState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/review/list')
            const data: Review[]= res.data
            context.commit(REQUEST_REVIEW_LIST_TO_DJANGO, data)
        }
        catch (error) {
            console.error('requestReviewListToDjango():'+ error)
            throw error
        }
    }
}

export default actions