<template>
  <div class="header-container">
    <video autoplay muted loop class="header-video">
      <source src="https://video-previews.elements.envatousercontent.com/h264-video-previews/fde11520-3fe7-4287-a8a3-e9517b55680d/43525384.mp4" type="video/mp4">
    </video>
    <div class="overlay"></div>
    <Nav/>
  </div>
</template>

<script setup>
import Nav from "/src/components/Nav.vue"
</script>

<style scoped>
.header-container {
  position: relative;
  height: 70vh; /* ou la hauteur que vous souhaitez pour votre en-tête */
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-video {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1; /* Pour s'assurer que la vidéo reste en arrière-plan */
}

.overlay {
  /* Un overlay si vous voulez assombrir votre vidéo pour mieux lire le texte */
  position: absolute;
  top: 0;
}
</style>
