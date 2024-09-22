<template>
  <div id="app">
    <main class="main">
      <img class="NOODLE_logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="NOODLE_logo">
    </main>
  </div>
</template>


<style scoped>

.main {
  display: flex;
  justify-content: center; /* 좌우 중앙 정렬 */
  align-items: center; /* 상하 중앙 정렬 */
  height: 100vh; /* 뷰포트 전체 비율로 차지하게 설정 */
  background-color: black;
}

.NOODLE_logo {
  display: block;
  margin: 0 auto;
  /* 로고 크기 조절 가능 */
  width: 400px;
  height: 400px;
  /* 상하좌우 미세 조정 가능 */
  position: relative;
  top: -100px;
  left: -20px;
}

</style>
