<template>
  <nav class="route_link">
    <RouterLink to="/" class="nav-link always-visible">Accueil</RouterLink>
    <RouterLink to="/destinations" class="nav-link">Destinations</RouterLink>
    <RouterLink to="/heberements" class="nav-link">Hébergements</RouterLink>
    <RouterLink to="/activites" class="nav-link">Activities</RouterLink>
    <RouterLink to="/personnages" class="nav-link">Personnages</RouterLink>
    <RouterLink to="/reservation" class="nav-link button-link always-visible">Réservez vos billets</RouterLink>

  </nav>
</template>

<script setup>
</script>

<style scoped>
.route_link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-link {
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel', serif; /* une police qui évoque une esthétique médiévale */
  font-size: 1.2rem;
  color: #f4e4d3; /* Une couleur crème pour le contraste */
  transition: color 0.3s ease;
}

.button-link {
  background-color: rgba(0, 0, 0, 0.81); /* ou toute autre couleur de fond que vous préférez */
  color: #ffffff; /* pour le texte du bouton */
  border: none; /* pas de bordure ou ajustez selon votre besoin */
  border-radius: 4px; /* pour des coins arrondis */
  padding: 0.8rem 1.6rem; /* plus de padding pour un aspect de bouton */
  font-weight: bold; /* texte en gras */
  white-space: nowrap; /* empêche le texte de passer à la ligne */
  display: inline-block; /* s'assure que le padding est pris en compte */
  margin: 0; /* enlève les marges par défaut du bouton si nécessaire */
}


@media (max-width: 768px) {
  .route_link {
    justify-content: space-around; /* Ajuster selon les besoins pour une meilleure apparence */
    flex-wrap: wrap;
  }

  /* Cacher les liens secondaires sur les petits écrans */
  .nav-link:not(.always-visible) {
    display: none;
  }

  /* S'assurer que les liens importants sont toujours visibles */
  .nav-link.always-visible, .button-link {
    display: block; /* ou 'inline-block' selon le comportement souhaité */
    margin-bottom: 10px; /* Ajouter un peu d'espace si les liens sont sur des lignes séparées */
  }

  /* Styler spécifiquement le bouton pour qu'il soit plus facile à cliquer */
  .button-link {
    padding: 10px 20px;
    margin: 0; /* Ajuster si vous avez un design spécifique en tête */
  }
}
/* Change the background color on hover for button-link */




</style>