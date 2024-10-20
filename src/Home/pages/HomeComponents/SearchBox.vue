<template>
  <div id="search">
    <form id="search-form" @submit.prevent="handleSubmit">
      <input
        id="search-box"
        type="text"
        v-model="searchQuery"
        required
      />
      <label
        id="search-box-label"
        :alt="labelText"
        :placeholder="labelText"
        :data-info="labelText"
      ></label>
      <button
        type="submit"
        name="submit"
        id="submit"
        class="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#ccc"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: '',
      labelText: '찾으시는 보고서를 입력해주세요.',
    };
  },
  methods: {
    handleSubmit() {
      if (this.searchQuery.trim() === '') return;
      // 부모 컴포넌트로 검색어를 전달합니다.
      this.$emit('search', this.searchQuery);
      // 필요에 따라 검색어 초기화
      // this.searchQuery = '';
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
  resize: none;
  outline: none;
}

#search {
  max-width: 420px;
  text-align: center;
  padding: 1em;
  width: 100%;
}

#search-form {
  position: relative;
  height: 3em;
  margin-bottom: 1em;
  width: 100%;
}

#search-box,
#search-box + #search-box-label:before {
  background: #f9f9f9;
  color: #888;
}

#search-box {
  margin: 0 0 1em;
  padding: 1em 3.4em 1em 1.5em;
  border: 1px solid #ccc;
  border-radius: 2em;
  transition: border-color 0.2s ease-in-out;
  font-size: 0.9em;
  width: 100%;
}

#search-box:focus {
  border-color: #999;
}

#search-box:focus + #search-box-label:before,
#search-box:valid + #search-box-label:before {
  transition-duration: 0.2s;
  transform: translate(0, -1.5em) scale(0.9, 0.9);
}

#search-box:invalid + #search-box-label:before {
  content: attr(alt);
}

#search-box + #search-box-label {
  position: absolute;
  top: 0.7em;
  display: block;
  pointer-events: none;
}

#search-box + #search-box-label:before {
  content: attr(data-info);
  display: inline-block;
  margin: 0 1em;
  padding: 0 2px;
  white-space: nowrap;
  transition: 0.3s ease-in-out;
}

#submit {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  margin-right: 0.4em;
  font-size: 1.5em;
  color: #ccc;
  transition: color 0.2s;
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

#submit svg {
  fill: #ccc;
  transition: fill 0.2s;
}

#submit:hover svg {
  fill: #999;
}

.button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
