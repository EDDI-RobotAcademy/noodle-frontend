<template>
  <v-container class="recoder-container" fluid>
    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 70%; height: 100%;">
      <h1 style="font-size: 2.8vw; width: 100%; min-width: 100%; text-align: center;">고객님의 회의 내용을 <span
          style="color: rgb(255, 240, 30); font-size: 3.8vw;">NOODLE</span>이 정리해드릴게요.</h1>
      <v-icon class="recoder-icon" size="15vw">mdi-text-box-check-outline</v-icon>
      <div class="recoder-button-container">
        <div style="width: 20%; height: 70%; position: relative;">
          <!-- 녹음 시간 표시 -->
          <div v-if="isRecording == true" class="recording-time" style="color: red;">
            녹음 시간: {{ formatTime(recordingTime) }}
            <v-progress-circular v-if="isRecording == true" indeterminate color="red" size="40"
              class="my-3"></v-progress-circular>
          </div>
          <div :class="['recording-button', isRecording ? 'red' : 'primary']" @click="toggleRecording" role="button"
            tabindex="0">
            <div class="recording-button-icon">
              <v-icon size="9vw" :color="isRecording ? 'white' : 'red'">
                {{ isRecording ? 'mdi-stop' : 'mdi-microphone-outline' }}
              </v-icon>
            </div>
            <p class="recording-button-text">{{ isRecording ? '녹음 중지' : '녹음 시작' }}</p>
          </div>
        </div>


        <div class="download-button" v-if="recordingComplete == true" role="button" tabindex="0"
          @click="downloadRecording">
          <div class="download-button-icon">
            <v-icon size="9vw">
              mdi-download
            </v-icon>
          </div>
          <p class="download-button-text">녹음 파일 다운로드</p>
        </div>

        <div class="analysis-button" v-if="recordingComplete == true" role="button" tabindex="0"
          @click="analyzeRecording">
          <div class="analysis-button-icon">
            <v-icon size="9vw">
              mdi-robot
            </v-icon>
          </div>
          <p class="analysis-button-text">녹음 파일 분석</p>
        </div>

        <v-alert v-if="uploadSuccess == true" type="success" class="mt-3">
          파일이 S3에 업로드되었습니다!
        </v-alert>
        <v-alert v-if="uploadError == true" type="error" class="mt-3">
          파일 업로드 중 오류가 발생했습니다.
        </v-alert>
      </div>
    </div>
  </v-container>
</template>

<script>
import { createS3Client } from '@/utility/awsConfig.ts'
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { useRuntimeConfig } from 'nuxt/app';
import { defineComponent } from 'vue';
import { useMeetingRecorderStore } from '../stores/meetingRecorderStore';

export default defineComponent({
  setup() {
    const config = useRuntimeConfig();
    const meetingRecordeStore = useMeetingRecorderStore();
    const s3Client = createS3Client();

    const isRecording = ref(false)
    const recordingComplete = ref(false)
    const recordingTime = ref(0)
    const mediaRecorder = ref(null)
    const audioChunks = ref([])
    const uploadSuccess = ref(false)
    const uploadError = ref(false)
    const audioBlob = ref(null)
    const recordingInterval = ref(null)
    const MAX_RECORDING_TIME = ref(300)
    const meetingRecordingSummary = ref(null)
    const s3Name = ref(config.public.AWS_S3_BUCKET_NAME)

    async function startRecording() {
      try {
        recordingComplete.value = false
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorder.value = new MediaRecorder(stream)

        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data)
        }

        mediaRecorder.value.onstop = () => {
          audioBlob.value = new Blob(audioChunks.value, { type: 'audio/webm' })
          recordingComplete.value = true
          clearInterval(recordingInterval.value)
          recordingTime.value = 0
        }

        audioChunks.value = []
        mediaRecorder.value.start()
        isRecording.value = true

        recordingInterval.value = setInterval(() => {
          recordingTime.value += 1

          if (recordingTime.value >= MAX_RECORDING_TIME.value) {
            stopRecording()
          }
        }, 1000)
      } catch (error) {
        console.error('녹음 시작 오류! : ', error)
      }
    }
    function stopRecording() {
      if (mediaRecorder.value != null) {
        mediaRecorder.value.stop()
      }
      isRecording.value = false
      recordingComplete.value = true
    }
    function toggleRecording() {
      if (isRecording.value == true) {
        stopRecording()
      } else {
        startRecording()
      }
    }
    function formatTime(time) {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0')
      const seconds = (time % 60).toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    }
    function downloadRecording() {
      if (audioBlob.value == null) {
        return
      }

      const url = URL.createObjectURL(audioBlob.value)
      const link = document.createElement('a')
      link.href = url
      link.download = `meeting_recording_${Date.now()}.webm`
      link.click()
      URL.revokeObjectURL(url)
    }
    async function analyzeRecording() {
      if (audioBlob.value == null) return

      const fileName = `meeting_recording_${Date.now()}.webm`
      console.log(s3Name)

      const params = {
        Bucket: s3Name.value,
        Key: fileName,
        Body: audioBlob.value,
        ContentType: 'audio/webm'
      }
      console.log(params)

      try {
        await s3Client.send(new PutObjectCommand(params))
      } catch (error) {
        console.error('Error uploading file:', error)
      }

      const userToken = localStorage.getItem('userToken')
      const payload = { userToken: userToken, fileName: fileName }
      const response = await meetingRecordeStore.requestGenerateMeetingRecordingSummary(payload)
      console.log(response)
      meetingRecordingSummary.value = await meetingRecordeStore.requestGetMeetingRecordingSummary({ userToken: userToken })
    }

    return {
      isRecording,
      recordingComplete,
      recordingTime,
      mediaRecorder,
      audioChunks,
      uploadSuccess,
      uploadError,
      audioBlob,
      recordingInterval,
      MAX_RECORDING_TIME,
      meetingRecordingSummary,

      startRecording,
      stopRecording,
      toggleRecording,
      formatTime,
      downloadRecording,
      analyzeRecording,
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

.recoder-container {
  background-color: #1c1c1c;
  color: white;
  width: 100vw;
  height: 92.6vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.recoder-icon {
  padding-top: 8%;
}

.recoder-button-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
}


/* recording button 관련*/
.recording-time {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: nowrap;
}

.recording-button {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.recording-button:hover {
  opacity: 0.9;
}

.recording-button.red {
  background-color: #ff5252;
  color: white;
}


.recording-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recording-button-icon .v-icon {
  color: white !important;
}

.recording-button-text,
.download-button-text,
.analysis-button-text {
  font-size: 1.4vw;
  font-weight: bold;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
}

/* .recording-button-text {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: black;
  font-family: 'Noto Sans KR', sans-serif
} */

/* download-button 관련 */
.download-button {
  width: 20%;
  height: 70%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.download-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-button-icon .v-icon {
  color: white !important;
}



/* analysis-button 관련 */
.analysis-button {
  width: 20%;
  height: 70%;
  background-color: #ffffff;
  color: black;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  user-select: none;
}

.analysis-button-icon {
  width: 100%;
  height: 70%;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analysis-button-icon .v-icon {
  color: white !important;
}
</style>
