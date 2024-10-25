<template>
  <div class="home-fourth-body">

    <div class="left-container">
      <div class="image-container"></div>
      <div class="text-container">
        <p>초기 구성</p>
        <p>초기 구성</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeFourth',
};
</script>

<style scoped>
.home-fourth-body {
  display: flex;
  background-color: #040202;
  width: 100%;
  height: 100vh;
}

.left-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 100%;
}


.image-container {
  width: 80%;
  height: 50%;
  background-image: url('@/assets/images/fixed/1212.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
}

.text-container {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 50px;
}

</style>