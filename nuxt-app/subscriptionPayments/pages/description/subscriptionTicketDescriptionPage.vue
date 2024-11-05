<template>
    <div class="subscription-page">
        <h1 class="page-title">Choose Your Subscription</h1>
        <div class="subscription-container">
            <v-card v-for="(plan, index) in subscriptionPlans" :key="index"
                :class="['subscription-card', { selected: selectedPlan === index }]" @click="selectPlan(index)">
                <h2 class="plan-title">{{ plan.name }}</h2>
                <p class="plan-price">{{ plan.price }}</p>
                <ul class="plan-features">
                    <li v-for="(feature, i) in plan.features" :key="i">{{ feature }}</li>
                </ul>
            </v-card>
        </div>
        <div>
            <v-btn :class="['purchase-btn', { highlighted: selectedPlan === selectedIndex && selectedIndex != null }]"
                @click.stop="purchasePlan(subscriptionPlans[selectedIndex])" :disabled="selectedPlan == null">
                Purchase
            </v-btn>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const subscriptionPlans = ref([
    {
        name: 'Basic',
        price: '9900원/month',
        features: ['구독권 설명', '구독권 설명', '구독권 설명'],
    },
    {
        name: 'Standard',
        price: '14900원/month',
        features: ['구독권 설명', '구독권 설명', '구독권 설명'],
    },
    {
        name: 'Premium',
        price: '19900원/month',
        features: ['구독권 설명', '구독권 설명', '구독권 설명'],
    },
]);

const selectedPlan = ref(null);
const selectedIndex = ref(null)
const router = useRouter();

function selectPlan(index) {
    selectedPlan.value = index;
    selectedIndex.value = index;
}

function purchasePlan(plan) {
    alert(`You have selected the ${plan.name} plan!`);
    router.push(`/subscription/payment/type${selectedIndex.value + 1}`)
}
</script>

<style scoped>
.subscription-page {
    text-align: center;
    padding: 20px;
    background-color: #000000;
    /* 배경을 검정색으로 설정 */
    color: #ffffff;
    /* 텍스트를 흰색으로 설정 */
    min-height: calc(100vh - 5.3vh);
}

.page-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ffffff;
    /* 페이지 제목을 노란색으로 강조 */
}

.subscription-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.subscription-card {
    width: 250px;
    padding: 20px;
    border: 2px solid #ffffff;
    /* 카드 테두리를 흰색으로 설정 */
    border-radius: 8px;
    background-color: #1c1c1c;
    /* 카드 배경을 검정색으로 설정 */
    color: #ffffff;
    /* 카드 텍스트를 흰색으로 설정 */
    transition: transform 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
    margin-bottom: 30px;
}

.subscription-card.selected {
    border-color: rgb(255, 240, 30);
    /* 선택된 카드는 노란색 테두리 */
    transform: scale(1.05);
}

.plan-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.plan-price {
    font-size: 18px;
    color: rgb(255, 240, 30);
    /* 가격 텍스트를 노란색으로 설정 */
    margin-bottom: 10px;
}

.plan-features {
    text-align: left;
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
    color: #ffffff;
    /* 기능 목록을 흰색으로 설정 */
}

.plan-features li {
    margin: 5px 0;
}

.purchase-btn {
    width: 30%;
    background-color: #ffffff;
    /* 버튼을 흰색으로 설정 */
    color: #000000;
    /* 버튼 텍스트를 검정색으로 설정 */
    font-weight: bold;
}

.purchase-btn.highlighted {
    background-color: rgb(255, 240, 30);
    /* 선택된 버튼을 노란색으로 설정 */
    color: #000000;
    /* 선택된 버튼의 텍스트를 검정색으로 설정 */
}
</style>