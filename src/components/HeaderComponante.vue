<template>
  <div class="video-container">

    <div class="navbarTop">
      <NavTop/>
    </div>
    <!-- Vidéo en arrière-plan -->
    <video autoplay muted loop id="myVideo">
      <source src="https://video-previews.elements.envatousercontent.com/h264-video-previews/fde11520-3fe7-4287-a8a3-e9517b55680d/43525384.mp4" type="video/mp4">
    </video>

    <div class="navBottom">
      <NavBottom/>
    </div>
  </div>
</template>

<script setup>
import NavTop from "@/components/NavTop.vue";
import NavBottom from "@/components/NavBottom.vue";
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

#myVideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navbarTop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 0;
}

.navBottom {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 10;
}

</style>