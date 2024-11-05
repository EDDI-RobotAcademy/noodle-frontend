<template>
    <div class="boxbox">
        <!-- 결제 성공 시 -->
        <section v-if="confirmed">
            <div class="box_section success-section">
                <img class="success-icon" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                    alt="Success Icon" />
                <h2 class="success-title">결제를 완료했어요</h2>

                <div class="info-grid">
                    <div class="info-row">
                        <div class="info-label">결제금액</div>
                        <div class="info-value">{{ jsonData.totalAmount }}원</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">주문번호</div>
                        <div class="info-value">{{ jsonData.orderId }}</div>
                    </div>
                    <!-- <div class="info-row">
                            <div class="info-label">paymentKey</div>
                            <div class="info-value" style="white-space: initial">{{ jsonData.paymentKey }}</div>
                        </div> -->
                </div>

                <div class="action-buttons">
                    <button class="action-button" @click="goToHome">홈으로 돌아가기</button>
                    <button class="action-button secondary" @click="redirectToSupport">실시간 문의</button>
                </div>
            </div>
            <!-- <div class="box_section response-section">
                    <b>Response Data :</b>
                    <div id="response" class="response-data">
                        <pre>{{ jsonData }}</pre>
                    </div>
                </div> -->
        </section>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from "nuxt/app";
import { useSubscriptionPaymentsStore } from '../../stores/subscriptionPaymentsStore';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const config = useRuntimeConfig();
        const subscriptionPaymentsStore = useSubscriptionPaymentsStore();

        const confirmed = ref(false);
        const jsonData = ref(null);
        const secretKey = ref(config.public.TOSS_SECRET_KEY);

        async function confirmPayment(requestData) {
            const encryptedSecretKey = btoa(secretKey.value + ":");
            const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${encryptedSecretKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();
            return { response, json };
        }

        async function confirm(requestData) {
            try {
                const { response, json } = await confirmPayment(requestData);
                if (!response.ok) {
                    router.push(`fail?message=${json.message}&code=${json.code}`);
                } else {
                    confirmed.value = true;
                    jsonData.value = json;
                }

                subscriptionPaymentsStore.requestRegisterSubscriptionToDjango(localStorage.getItem('userToken'), route.params.type, jsonData.value.orderId)
            } catch (error) {
                console.log(error);
            }
        }

        function goToHome() {
            router.push('/')
        }

        function redirectToSupport() {
            window.location.href = 'https://discord.gg/A4fRFXQhRu';
        }

        onMounted(async () => {
            const requestData = {
                orderId: route.query.orderId,
                amount: route.query.amount,
                paymentKey: route.query.paymentKey,
            };
            confirm(requestData);
        });

        return {
            confirmed,
            jsonData,
            goToHome,
            redirectToSupport,
        };
    },
});
</script>

<style scoped>
.boxbox {
    background-color: #000000;
    display: flex;
    height: 94.7vh;
    align-items: center;
    justify-content: center;
}

.wrapper {
    background-color: #000000;
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box_section {
    width: 120%;
    max-width: 600px;
    padding: 30px;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    background-color: #000000;
    color: #ffffff;
    margin: 15px 0;
}

.success-section {
    text-align: center;
}

.success-icon {
    width: 100px;
    margin: 0 auto 20px;
}

.success-title {
    font-size: 24px;
    color: rgb(255, 240, 30);
}

.info-grid {
    margin-top: 50px;
    border-top: 1px solid #c1c1c1;
    padding-top: 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.info-label {
    font-weight: bold;
    color: #c1c1c1;
}

.info-value {
    color: #ffffff;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.action-button {
    width: 48%;
    padding: 10px 0;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    background-color: rgb(255, 240, 30);
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.home-button {
    width: 48%;
    padding: 10px 0;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    background-color: rgb(255, 240, 30);
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.action-button.secondary {
    background-color: #e8f3ff;
    color: #1b64da;
}

.response-section {
    text-align: left;
}

.response-data {
    white-space: initial;
    background-color: #1a1a1a;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    color: #c1c1c1;
    overflow-x: auto;
}
</style>
