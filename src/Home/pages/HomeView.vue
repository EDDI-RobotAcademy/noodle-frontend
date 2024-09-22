<template>
  <div id="app">
    <main class="main">
      <img class="NOODLE_logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="NOODLE_logo">
    </main>
    <div class="Dock">
      <div v-for="icon in icons" 
           :key="icon.name" 
           :data-name="icon.name" 
           class="Icon material-icons">
        {{ icon.icon }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { name: '기능버튼1', icon: 'face' },
        { name: '기능버튼2', icon: 'watch_later' },
        { name: '기능버튼3', icon: 'zoom_in' },
        { name: '기능버튼4', icon: 'wb_sunny' },
        { name: 'Login', icon: 'person' },
      ]
    };
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

/* @import url('https://fonts.googleapis.com/icon?family=Material+Icons'); */ /*google font 임포트 방법2*/

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

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -moz-font-feature-settings: 'liga';
  -moz-osx-font-smoothing: grayscale;
}

/* Dock관련 설정 */
.Dock {
  position: fixed;
  left: 50%;
  bottom: 20px; /* 하단과의 공간 */
  padding: 0px 30px;
  transform: translateX(-50%);
  perspective: 100px;
}

.Dock:before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: -3px;
  width: 100%;
  height: 22px;
  background-color: rgba(133, 133, 133, 0.53);
  z-index: -1;
  transform-style: preserve-3d;
  transform: rotateX(45deg);
}

/* 아이콘 관련 설정 */
.Icon {
  position: relative;
  cursor: pointer;
  display: inline-block;
  /* 아이콘박스 크기 */
  width: 48px;
  height: 48px;
  margin: 0px 5px 5px 0px;
  border-radius: 6px;
  background-color: rgba(204, 159, 1, 0.95);
  color: white;
  transition: all 0.3s;
  text-align: center;
  /* 아이콘 내 그림 크기 */
  font-size: 30px;
  /* line-height: px; */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 아이콘 hover관련 설정 */
.Icon:hover {
  width: 72px;
  height: 72px;
  font-size: 54px;
  background-color: rgba(90, 0, 50, 0.85);
}

.Icon:active {
  width: 70px;
  height: 70px;
  font-size: 50px;
  line-height: 70px;
  background-color: rgba(50, 0, 10, 0.85);
}

.Icon[data-name]:hover:after {
  content: attr(data-name);
  padding: 4px;
  color: rgba(0, 0, 0, 0.888);
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
  font-family: arial;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  border-radius: 5px;
  background: #eeeeee;
}

.Icon:hover:before {
  content: "";
  color: rgba(0, 0, 0, 0.888);
  position: absolute;
  left: 50%;
  top: -50%;
  width: 0px;
  height: 0px;
  transform: translate(-50%, 15px) rotate(-45deg);
  white-space: nowrap;
  font-family: arial;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  width: 10px;
  height: 10px;
  background: #eeeeee;
}
</style>
