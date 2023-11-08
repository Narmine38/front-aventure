<template>
  <div class="video-container">

    <div class="navbarTop">
      <NavTop/>
    </div>
    <!-- Vidéo en arrière-plan -->
    <video autoplay muted loop id="myVideo">
      <!-- Utilisation d'une vidéo d'exemple de Big Buck Bunny -->
      <source src="https://video-previews.elements.envatousercontent.com/h264-video-previews/fde11520-3fe7-4287-a8a3-e9517b55680d/43525384.mp4" type="video/mp4">
    </video>

    <!-- Navbar en bas -->
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
  z-index: 10; /* Assurez-vous qu'elle est au-dessus de la vidéo */
  padding: 0;
}

.navBottom {
  position: absolute;
  left: 50%; /* Positionner à 50% de la gauche va déplacer le point de départ de NavBottom au milieu */
  bottom: 0;
  transform: translateX(-50%); /* Cela va décaler NavBottom de retour de la moitié de sa propre largeur, la centrant effectivement */
  z-index: 10;
}

</style>