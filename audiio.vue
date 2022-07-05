<template>
  <div class="msg-audio">
    <audio :src="audio" ref="audioNode" @loadedmetadata="loadeddata" @ended="ended"></audio>

    <div class="msg" @click="play">
      <!-- 播放图片 -->
      <div class="img">
        <img :src="audioPlay" alt="" />
      </div>
      <div>{{ Math.round(duration) + '″' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import audio_img from '../../assets/images/livetext-audio.png'
import audio_gif from '../../assets/images/livetext-audiogif.gif'
  const props = defineProps({
    audio: String
  })
  const loading = ref(true) //加载状态
  const duration = ref(0) //音频时长
  const audioPlay = ref(null) //播放图片
  const audioNode = ref(null) //audio ref
  //数据加载完毕

  const loadeddata = () => {
    audioPlay.value = audio_img
    loading.value = false
    duration.value = audioNode.value.duration
  }

  //播放结束
  const ended = () => {
    audioPlay.value = audio_img
  }

  //切换播放状态
  const play = () => {
    if (loading.value) return

    if (audioNode.value.paused) {
      audioNode.value.currentTime = 0
      audioNode.value.play()
      audioPlay.value = audio_gif
    } else {
      audioNode.value.pause()
      audioPlay.value = audio_img
    }
  }

  onBeforeUnmount(() => {
    audioNode.value.pause()
  })
</script>

<style scoped lang="scss">
.msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 328px;
  height: 54px;
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #333333;
  font-weight: 400;
  padding-left: 16px;
}
</style>
