<template>
    <div class="boxbox">
        <div id="info" class="box_section">
            <img src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="Error Icon"
                class="error-icon" />
            <h2 class="error-title">결제를 실패했어요</h2>

            <div class="p-grid typography--p error-info">
                <div class="p-grid-col text--left"><b>에러 메시지</b></div>
                <div class="p-grid-col text--right" id="message">{{ route.query.message }}</div>
            </div>
            <div class="p-grid typography--p error-info">
                <div class="p-grid-col text--left"><b>에러 코드</b></div>
                <div class="p-grid-col text--right" id="code">{{ route.query.code }}</div>
            </div>

            <div class="button-group">
                <button class="doc-button" @click="goToPayment">
                    다시 결제하기
                </button>
                <button class="support-button" onclick="location.href='https://discord.gg/A4fRFXQhRu';">
                    실시간 문의
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        function goToPayment() {
            router.push('/subscriptionTicketDescription')
        }
        return { route, goToPayment };
    }
});
</script>

<style scoped>
.box_section {
    width: 600px;
    padding: 30px;
    border-radius: 8px;
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    border: 1px solid #c1c1c1;
}

.boxbox {
    background-color: #000000;
    display: flex;
    height: 94.7vh;
    align-items: center;
    justify-content: center;
}

.error-icon {
    width: 100px;
    margin-bottom: 20px;
}

.error-title {
    font-size: 24px;
    color: rgb(255, 240, 30);
    font-weight: bold;
    margin-bottom: 30px;
}

.error-info {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin: 10px 0;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.doc-button,
.support-button {
    width: 48%;
    padding: 12px 0;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.doc-button {
    background-color: rgb(255, 240, 30);
    color: #000000;
}

.doc-button:hover {
    background-color: #e5e02c;
}

.support-button {
    background-color: #e8f3ff;
    color: #1b64da;
}

.support-button:hover {
    background-color: #d4e9ff;
}
</style>
