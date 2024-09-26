import { MutationTree } from 'vuex'
import { ProductManageState } from './states'
import {
    REQUEST_GET_REPOS_LIST_TO_DJANGO,
} from './mutation-types'

export interface ProductManageMutations extends MutationTree<ProductManageState> {
    [REQUEST_GET_REPOS_LIST_TO_DJANGO](state: ProductManageState, settingValue: string[]): void 
}

const mutations: MutationTree<ProductManageState> = {
    [REQUEST_GET_REPOS_LIST_TO_DJANGO](state: ProductManageState, settingValue: string[]): void {
        state.repos = settingValue
    }
}

export default mutations as ProductManageMutations