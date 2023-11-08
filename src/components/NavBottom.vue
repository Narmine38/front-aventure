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
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  color: #f4e4d3;
  transition: color 0.3s ease;
}

.button-link {
  background-color: rgba(0, 0, 0, 0.81);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.6rem;
  font-weight: bold;
  white-space: nowrap;
  display: inline-block;
  margin: 0;
}


@media (max-width: 768px) {
  .route_link {
    justify-content: space-around;
    flex-wrap: wrap;
  }


  .nav-link:not(.always-visible) {
    display: none;
  }


  .nav-link.always-visible, .button-link {
    display: block;
    margin-bottom: 10px;
  }


  .button-link {
    padding: 10px 20px;
    margin: 0;
  }
}





</style>