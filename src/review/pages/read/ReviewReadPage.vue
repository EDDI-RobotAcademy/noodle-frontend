<template>
    <div v-if="isSelectionReview">selectionReview</div>
    <div v-else>writingReview</div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            isSelectionReview: true,
            reviewTitle: '',
            reviewWriter: '',
            reviewContent: '',
            designScore: 0,
            usabilityScore: 0,
            qualityScore: 0,
            responsiveScore: 0,
        }
    }
}
</script>

<style scoped></style>