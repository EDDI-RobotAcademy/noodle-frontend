<template>
    <div class="recorder">
      <v-btn @click="toggleRecording">{{ isRecording ? '녹음 중지' : '녹음 시작' }}</v-btn>
      <div v-if="audioUrl">
        <a :href="audioUrl" download="recording.mp3">녹음 파일 다운로드</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
        audioUrl: null,
      };
    },
    methods: {
      async toggleRecording() {
        if (this.isRecording) {
          // 녹음 중지
          this.stopRecording();
        } else {
          // 녹음 시작
          await this.startRecording();
        }
      },
      async startRecording() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
  
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
          };
  
          this.mediaRecorder.onstop = this.saveRecording;
          this.audioChunks = [];
          this.mediaRecorder.start();
          this.isRecording = true;
        } catch (error) {
          console.error("마이크 권한을 허용해 주세요.", error);
        }
      },
      stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
          this.mediaRecorder.stop();
          this.isRecording = false;
        }
      },
      saveRecording() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        this.audioUrl = URL.createObjectURL(audioBlob);
      },
    },
  };
  </script>
  
  <style scoped>
  .recorder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  