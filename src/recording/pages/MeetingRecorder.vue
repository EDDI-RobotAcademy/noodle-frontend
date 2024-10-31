<template>
  <v-container class="text-center" style="background-color: black; color: white;">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-btn :color="isRecording ? 'red' : 'primary'" @click="toggleRecording" class="mb-4">
          {{ isRecording ? '녹음 중지' : '녹음 시작' }}
        </v-btn>

        <!-- 녹음 시간 표시 -->
        <div v-if="isRecording" class="my-2" style="color: red;">
          녹음 시간: {{ formatTime(recordingTime) }}
        </div>

        <v-progress-circular v-if="isRecording" indeterminate color="red" size="40" class="my-3"></v-progress-circular>

        <v-btn v-if="recordingComplete" color="primary" class="mt-3" @click="downloadRecording">
          녹음 파일 다운로드
        </v-btn>

        <v-btn v-if="recordingComplete" color="primary" class="mt-3" @click="analyzeRecording">
          녹음 파일 분석
        </v-btn>

        <v-alert v-if="uploadSuccess" type="success" class="mt-3">
          파일이 S3에 업로드되었습니다!
        </v-alert>
        <v-alert v-if="uploadError" type="error" class="mt-3">
          파일 업로드 중 오류가 발생했습니다.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { s3Client, env } from '@/utility/awsConfig'
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { mapActions } from 'vuex';

const recordingModule = 'recordingModule'

export default {
  name: 'MeetingRecorder',
  data() {
    return {
      isRecording: false,
      recordingComplete: false,
      recordingTime: 0,  // 녹음 시간 (초 단위)
      mediaRecorder: null,
      audioChunks: [],
      uploadSuccess: false,
      uploadError: false,
      audioBlob: null,
      recordingInterval: null,
      MAX_RECORDING_TIME: 300  // 최대 녹음 시간 (5분 = 300초)
    }
  },
  methods: {
    ...mapActions(recordingModule, ["requestGenerateMeetingRecordingSummary", "requestGetMeetingRecordingSummary"]),
    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.recordingComplete = true;
          clearInterval(this.recordingInterval);
          this.recordingTime = 0;
        };

        this.audioChunks = [];
        this.mediaRecorder.start();
        this.isRecording = true;

        // 녹음 시간 업데이트 시작
        this.recordingInterval = setInterval(() => {
          this.recordingTime += 1;

          // 최대 시간 도달 시 자동 녹음 중지
          if (this.recordingTime >= this.MAX_RECORDING_TIME) {
            this.stopRecording();
          }
        }, 1000);

      } catch (error) {
        console.error('녹음 시작 오류:', error);
      }
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
      this.isRecording = false;
    },
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    downloadRecording() {
      if (!this.audioBlob) return;

      const url = URL.createObjectURL(this.audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meeting_recording_${Date.now()}.webm`;
      link.click();
      URL.revokeObjectURL(url);
    },
    async analyzeRecording() {
      console.log("analyzeRecording()")
      if (!this.audioBlob) return;

      const fileName = `meeting_recording_${Date.now()}.webm`;

      const params = {
        Bucket: env.s3.S3_BUCKET_NAME,
        Key: fileName,
        Body: this.audioBlob,
        ContentType: 'audio/webm',
      };

      try {
        console.log('Upload file with params:', params)
        await s3Client.send(new PutObjectCommand(params))
        console.log(`Upload ${fileName} to S3 successfully.`)
      } catch (error) {
        console.error('Error uploading file:', error)
      }

      const userToken = localStorage.getItem('userToken')
      const payload = { userToken: userToken, fileName: fileName }
      const res = await this.requestGenerateMeetingRecordingSummary(payload)
      console.log("requestGenerateMeetingRecordingSummary status:", res)
      const meetingRecordingSummary = await this.requestGetMeetingRecordingSummary({ userToken: userToken })
      console.log("meetingRecordingSummary:", meetingRecordingSummary)
    }
  }
};
</script>

<style scoped>
.v-btn {
  font-size: 1.2em;
}
</style>
