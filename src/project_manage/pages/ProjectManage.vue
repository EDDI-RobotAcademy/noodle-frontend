<template> 
  <div class="menubar">
    네비gay션바 자리
  </div>
  <div class="container">
    <div class="leftbox">
      <div class="leftbox_title">
        <span>Backlog 보드</span>
        <!-- Switch 추가 -->
        <div class="switch white">
          <input
            type="radio"
            id="switch-off"
            v-model="isChecked"
            :value="false"
          />
          <input
            type="radio"
            id="switch-on"
            v-model="isChecked"
            :value="true"
            checked
          />
          <label for="switch-off">status</label>
          <label for="switch-on">Domain</label>
          <span class="toggle" :class="{ 'checked': isChecked }"></span>
        </div>
      </div>
    </div>
    <div class="rightbox">
      <div class="rightbox_title">
        <span>커밋 리스트</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isChecked: true, // 스위치의 초기 상태
    };
  },
};
</script>


<style scoped>

html, body {
  height: 100%; /* HTML과 Body의 높이를 100%로 설정 (화면 전체) */
  width: 100%; /* HTML과 Body의 너비를 100%로 설정 */
  margin: 0; /* 기본 margin 제거 */
}

.container {
  display: flex; /* Flexbox로 레이아웃 설정 */
  height: 100vh; /* Viewport height를 100%로 설정 (화면 전체 높이) */
  align-items: flex-end; /* 자식 요소들을 수직 정렬하여 아래로 정렬 */
}

.menubar {
  width: 100%; /* 메뉴바의 너비를 100%로 설정 */
  height: 7%; /* 메뉴바의 높이를 전체 화면의 7%로 설정 */
  border-bottom: 8px solid #e1f531; /* 아래쪽에 두께 8px의 노란색 테두리 추가 */
}

/* 왼쪽 box */
.leftbox {
  width: 75%; /* 왼쪽 박스의 너비를 75%로 설정 */
  height: 100%; /* 왼쪽 박스의 높이를 100%로 설정 (화면 전체 높이) */
  background-color: #3498db; /* 왼쪽 박스의 배경색을 파란색으로 설정 */
  border-right: 3px solid #e1f531; /* 오른쪽에 두께 3px의 노란색 테두리 추가 */
}

.leftbox_title {
  display: flex; /* Flexbox로 레이아웃 설정 (내부 콘텐츠 정렬) */
  justify-content: flex-start; /* 왼쪽과 오른쪽에 콘텐츠를 배치 */
  align-items: center; /* 수직 중앙에 콘텐츠 정렬 */
  margin-top: 20px; /* 위쪽 여백을 20px 추가 */
  margin-left: 20px; /* 왼쪽 여백을 20px 추가 */
  margin-right: 20px; /* 오른쪽 여백을 20px 추가 */
  font-size: 30px; /* 폰트 크기를 30px로 설정 */
}

.leftbox_title span {
  margin-right: 75%; /* 텍스트와 스위치 사이에 공간 추가(텍스트를 기준으로 스위치 위치 조정) */
}


/* 오른쪽 box */
.rightbox {
  width: 25%; /* 오른쪽 박스의 너비를 25%로 설정 */
  height: 100%; /* 오른쪽 박스의 높이를 100%로 설정 (화면 전체 높이) */
  background-color: #2ecc71; /* 오른쪽 박스의 배경색을 초록색으로 설정 */
}


.rightbox_title {
  margin-top: 20px; /* 위쪽 여백을 20px 추가 */
  margin-left: 20px; /* 왼쪽 여백을 20px 추가 */
  font-size: 30px; /* 폰트 크기를 30px로 설정 */
}

/* ---------- SWITCH ---------- */

/* 스위치에 관한 설정 */
.switch {
  background: #fff; /* 스위치의 배경색을 흰색으로 설정 */
  border-radius: 32px; /* 스위치의 테두리를 둥글게 설정 (32px의 반경) */
  display: block; /* 블록 요소로 설정 */
  height: var(--switch-height, 20px); /* 스위치의 높이 설정 (변경 가능하도록 변수 사용) */
  position: relative; /* 자식 요소의 위치를 기준으로 상대적으로 위치 설정 */
  width: var(--switch-width, 60px); /* 스위치의 너비 설정 (변경 가능하도록 변수 사용) */
  margin-left: 0%; /* 스위치를 오른쪽으로 정렬 */
}

/* 스위치 글자 관련 설정 */
.switch label {
  color: #fff; /* 라벨의 텍스트 색상을 흰색으로 설정 */
  font-size: 12px; /* 라벨의 폰트 크기를 20px로 설정 */
  font-weight: 500; /* 라벨의 폰트 두께를 300으로 설정 (얇은 텍스트) */
  line-height: var(--switch-height, 20px); /* 글의 세로 정렬을 위해 line-height를 스위치 높이에 맞춤 */
  text-transform: uppercase; /* 라벨 텍스트를 대문자로 변환 */
  transition: color 0.2s ease; /* 라벨의 색상 변화에 0.2초의 전환 효과 적용 */
  width: 35px; /* 라벨의 너비 설정(값이 커질 수록 좁아짐) */
}

.switch label:nth-of-type(1) {
  left: -85%; /* 첫 번째 라벨을 스위치 왼쪽에 위치시키기 위해 왼쪽으로 85% 이동(다른 요소 위치의 기준이 됨) */
  position: absolute; /* 라벨의 위치를 절대 위치로 설정 */
  text-align: right; /* 첫 번째 라벨의 텍스트를 오른쪽 정렬 */
}

.switch label:nth-of-type(2) {
  position: absolute; /* 두 번째 라벨의 위치를 절대 위치로 설정 */
  right: -70%; /* 두 번째 라벨을 스위치 오른쪽에 위치시키기 위해 오른쪽으로 70% 이동 */
  text-align: left; /* 두 번째 라벨의 텍스트를 왼쪽 정렬 */
}

.switch input {
  height: var(--switch-height, 20px); /* 스위치 입력의 높이 설정 */
  left: 0; /* 입력 요소를 왼쪽에 위치 */
  opacity: 0; /* 입력 요소를 보이지 않도록 투명도 0으로 설정 */
  position: absolute; /* 입력 요소의 위치를 절대 위치로 설정 */
  top: 0; /* 입력 요소를 상단에 위치 */
  width: var(--switch-width, 100px); /* 스위치 입력의 너비를 120px로 설정 */
  z-index: 2; /* 입력 요소를 다른 요소보다 앞에 표시 (레이어 순서 설정) */
}

.switch input:checked ~ label:nth-of-type(1) {
  color: #fff; /* 첫 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되었을 때) */
}

.switch input:checked ~ label:nth-of-type(2) {
  color: #808080; /* 두 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되었을 때) */
}

.switch input ~ :checked ~ label:nth-of-type(1) {
  color: #808080; /* 첫 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input ~ :checked ~ label:nth-of-type(2) {
  color: #fff; /* 두 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input:checked ~ .toggle {
  left: 10px; /* 스위치가 선택되었을 때 토글이 왼쪽에 위치 */
}

.switch input ~ :checked ~ .toggle {
  left: 40px; /* 스위치가 선택되지 않았을 때 토글이 오른쪽에 위치 */
}

.switch input:checked {
  z-index: 0; /* 입력 요소의 z-index를 0으로 설정하여 다른 요소보다 뒤로 감 */
}

.toggle {
  background: #4a4a4a; /* 토글의 배경색을 어두운 회색으로 설정 */
  border-radius: 50%; /* 토글의 모양을 원형으로 설정 (50% 반경) */
  height: calc(var(--switch-height, 20px) - 8px); /* 토글의 높이를 스위치 높이보다 약간 작게 설정 */
  left: 0; /* 토글을 왼쪽에 위치 */
  position: absolute; /* 토글의 위치를 절대 위치로 설정 */
  top: 4px; /* 토글을 위에서 4px 내려서 위치 */
  transition: left 0.2s ease; /* 토글이 이동할 때 0.2초의 전환 효과 적용 */
  width: calc(var(--switch-height, 20px) - 8px); /* 토글의 너비를 스위치 높이와 비슷하게 설정 */
  z-index: 1; /* 토글을 다른 요소보다 앞에 표시 */
}

.toggle.checked {
  left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 50px) -8px)); /* 스위치가 선택되었을 때 토글이 오른쪽에 위치 */
}

</style>