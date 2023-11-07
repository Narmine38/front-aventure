<template>
  <div class="header-container">
    <video autoplay muted loop class="header-video">
      <source src="https://video-previews.elements.envatousercontent.com/e0793d02-be7e-4cfc-b230-1681c2bf5988/watermarked_preview/watermarked_preview.mp4" type="video/mp4">
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
  height: 50vh; /* ou la hauteur que vous souhaitez pour votre en-tête */
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
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
