import { defineStore } from 'pinia';
import { reviewActions } from './reviewActions';
import { reviewState } from './reviewState';

export const useReviewStore = defineStore('reviewStore', {
  state: reviewState,
  actions: reviewActions,
});