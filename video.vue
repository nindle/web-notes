<template>
  <div>
    <video
      :src="url"
      :poster="poster"
      :width="width == undefined ? 750 : width"
      :height="height == undefined ? 422 : height"
      ref="video"
      class="video"
      controls="controls"
      :webkit-playsinline="unplaysinline ? true : undefined"
      :playsinline="unplaysinline ? true : undefined"
      controlsList="nodownload"
      disablePictureInPicture="true"
      @play="play(video)"
    ></video>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
const playVideo = ref(null)

const props = defineProps({
  url: String, //url地址
  poster: String, // 视频封面
  width: [String, Number], // 宽度
  height: [String, Number], // 高度
  unplaysinline: {
    default: true  //false全屏播放
  }, 
})


const video = ref(null)

//当前页面的video只播放一个
const play = e => {
  if (playVideo.value && playVideo.value !== e) {
    playVideo.value.pause()
  }
  // 全屏播放
  if(!props.unplaysinline){
    setTimeout(()=>{
      if (video.value.requestFullscreen) {
        video.value.requestFullscreen();
      } else if (video.value.mozRequestFullScreen) {
        video.value.mozRequestFullScreen();
      } else if (video.value.webkitRequestFullscreen) {
        video.value.webkitRequestFullscreen();
      } else if (video.value.webkitSupportsFullscreen) {
        video.value.webkitEnterFullscreen();
      } else if (video.value.msRequestFullscreen) {
        video.value.msRequestFullscreen();
      }
    },100)
  }
  playVideo.value = e
}

onBeforeUnmount(() => {
  if (playVideo.value && playVideo.value === video.value) {
    playVideo.value = null
  }
})
</script>

<style scoped lang="scss">
.video {
  background-color: #000;
}
:deep(video::-webkit-media-controls-play-button) {
  background-size: 40px;
}
:deep(video::-webkit-media-controls-current-time-display) {
  font-size: 20px;
}
:deep(video::-webkit-media-controls-time-remaining-display) {
  font-size: 20px;
}
:deep(video::-webkit-media-controls-mute-button) {
  background-size: 40px;
}
:deep(video::-webkit-media-controls-fullscreen-button) {
  background-size: 40px;
  margin: 0 20px;
}
:deep(video::-webkit-media-controls-overflow-button) {
  background-size: 40px;
}
</style>
