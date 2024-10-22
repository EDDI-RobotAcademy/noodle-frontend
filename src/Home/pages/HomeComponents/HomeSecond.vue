<template>
  <div class="home-second-body">
    <div class="left-area-body">
      <div class="left-area">
        <div class="text-area">
          <p>NOODLE은</p>
          <p>이런 서비스를 제공합니다.</p>
        </div>
        <div class="left-card-area">
          <v-card>
            <v-img src="@/assets/images/fixed/main.png" cover>된당 히히</v-img>
          </v-card>
          <v-card>
            <v-img src="@/assets/images/fixed/main.png" cover>된당 히히</v-img>
          </v-card>
        </div>
      </div>
    </div>
    <div class="right-area-body">
      <div class="right-area">
        <div class="right-card-area">
          <v-card>
            <v-img src="@/assets/images/fixed/main.png" cover>된당 히히</v-img>
          </v-card>
          <v-card>
            <v-img src="@/assets/images/fixed/main.png" cover>된당 히히</v-img>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSecond',
};
</script>

<style scoped>
.home-second-body {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #252525;
}

.left-area-body{
  width: 30%;
  height: 100%;
}

.right-area-body{
  width: 30%;
  height: 100%;
}

.left-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-end;
  background-color: #252525;
}

.text-area {
    width: 70%;
    color: #fff;
    /* font-size: bold; */
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 30px;
    }

.left-card-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 30px;
  gap: 30px;
}
.right-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #252525;
} 

.right-card-area {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
  gap: 30px;
}

.v-card {
  width: 70%;
  height: 40%;
}

.v-img {
  width: 100%;
  height: 100%;
  color: #fff;
}
/* .content-area{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  gap: 20px;

} */

/* .left-area{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
} */

/* .text-area-area{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

} */

/* .text-area{
  width: 100%;
  height: 7%;
  margin-left: 5%;
  text-align: left;
} */

/* .left-card{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding-top: 0;
  gap: 20px;
} */

/* .right-card-area{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  gap: 20px;
} */

/* .v-card{
  width: 70%;
  height: 100%;
  border-radius: 20px;
} */

</style>