import { tryUseNuxtApp } from "nuxt/app";
import * as axiosUtility from "../../utility/axiosInstance";
import { useReviewStore } from './reviewStore';

export const reviewActions = {
  async requestReviewList({ pagination, perPage }) {
		const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
    try {
      const res = await djangoAxiosInst.post('/review/list', { pagination, perPage });
      this.reviewList = res.data.list;
    } catch (error) {
      console.error('requestReviewListToDjango():' + error);
      throw error;
    }
  },
  async requestEntireReviewListCount() {
		const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
    try {
      const res = await djangoAxiosInst.post('/review/entire-count');
      this.totalCount = res.data.count;
    } catch (error) {
      console.error('requestEntireReviewListCount():' + error);
      throw error;
    }
  },
};