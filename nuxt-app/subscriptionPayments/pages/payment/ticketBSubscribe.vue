<template>
    <div class="wrapper">
        <div class="box_section">
            <!-- 결제 UI -->
            <div id="payment-method"></div>
            <!-- 이용약관 UI -->
            <div id="agreement"></div>
            <!-- 쿠폰 체크박스 -->
            <div class="coupon-section">
                <div class="checkable">
                    <label for="coupon-box" class="checkable__label">
                        <input :disabled="!inputEnabled" @change="updateAmount" id="coupon-box" class="checkable__input"
                            type="checkbox" aria-checked="true" />
                        <span class="checkable__label-text">{{ discountCouponAmount }}원 쿠폰 적용</span>
                    </label>
                </div>
            </div>
            <!-- 결제하기 버튼 -->
            <v-btn :disabled="!inputEnabled" @click="requestPayment" class="payment-button" id="payment-button">
                {{ amount }}원 결제하기
            </v-btn>
        </div>
    </div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useRuntimeConfig } from "nuxt/app";
import { nanoid } from "nanoid";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    setup() {
        const config = useRuntimeConfig();
        const paymentWidget = ref(null);
        const paymentMethodWidget = ref(null);
        const clientKey = ref(config.public.TOSS_CLIENT_KEY);
        const amount = ref(14900);
        const inputEnabled = ref(false);
        const discountCouponAmount = ref(3000);

        async function requestPayment() {
            try {
                if (paymentWidget.value) {
                    await paymentWidget.value.requestPayment({
                        orderId: nanoid(),
                        orderName: "Noodle",
                        customerName: "Meue-L",
                        customerEmail: "abcdabcd@gmail.com",
                        customerMobilePhone: "01012341234",
                        successUrl: `${window.location.origin}/subscription/payment/${2}/success`,
                        failUrl: `${window.location.origin}/subscription/payment/fail`
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        async function updateAmount() {
            const coupon = document.getElementById("coupon-box");
            if (coupon.checked) {
                amount.value -= discountCouponAmount.value;
            }
            paymentMethodWidget.value.updateAmount(amount.value);
        }

        onMounted(async () => {
            paymentWidget.value = await loadPaymentWidget(clientKey.value, ANONYMOUS);
            paymentMethodWidget.value = paymentWidget.value.renderPaymentMethods("#payment-method", { value: amount.value });
            paymentWidget.value.renderAgreement("#agreement");
            paymentMethodWidget.value.on("ready", () => {
                inputEnabled.value = true;
            });
        });

        return {
            paymentWidget,
            paymentMethodWidget,
            amount,
            inputEnabled,
            discountCouponAmount,
            requestPayment,
            updateAmount,
        };
    },
});
</script>

<style scoped>
.wrapper {
    background-color: #000000;
    color: #ffffff;
    min-height: 94.7vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box_section {
    width: 100%;
    max-width: 1000px;
    padding: 30px;
    border: 1px solid #c1c1c1;
    border-radius: 8px;
    background-color: #1c1c1c;
}

/* 결제 버튼과 쿠폰 체크박스를 수평 정렬 */
.payment-and-coupon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}

.coupon-section {
    padding-left: 25px;
    color: #ffffff;
    align-self: center;
    background-color: #ffffff;
}

.checkable__label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #000000;
    justify-content: right;
    margin-bottom: 30px;
}

.checkable__input {
    margin-right: 10px;
    accent-color: rgb(255, 240, 30);
}

.checkable__input:disabled {
    accent-color: #c1c1c1;
}

.payment-button {
    width: 100%;
    background-color: rgb(255, 240, 30);
    color: #000000;
    font-weight: bold;
    font-size: 18px;
    border: none;
    padding: 15px 0;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.payment-button:disabled {
    background-color: #c1c1c1;
    color: #ffffff;
}
</style>
