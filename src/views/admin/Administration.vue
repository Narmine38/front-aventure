<template>
  <div class="admin-container">
    <h1 class="admin-title">Administration</h1>

    <!-- Sous-navigation -->
    <nav class="admin-nav">
      <ul class="admin-nav-list">
        <li class="admin-nav-item">
          <RouterLink class="admin-nav-link" to="/administration/usersmanagement">Gestion des utilisateurs</RouterLink>
        </li>
        <li>
          <RouterLink class="admin-nav-link" to="/administration/placesmanagement">Gestion des lieux</RouterLink>
        </li>
        <li>
          <RouterLink class="admin-nav-link" to="/administration/accommodationsmanagement">Gestion des hébergements</RouterLink>
        </li>
        <li>
          <RouterLink class="admin-nav-link" to="/administration/activitiesmanagement">Gestion des activités</RouterLink>
        </li>
        <li>
          <RouterLink class="admin-nav-link" to="/administration/charactersmanagement">Gestion des personnages</RouterLink>
        </li>
        <li>
          <RouterLink class="admin-nav-link" to="/administration/reservationsmanagement">Gestion des réservations</RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Contenu de la sous-page actuellement active -->
    <div class="admin-content">
      <RouterView/>
    </div>
  </div>
</template>

<script setup>
import {RouterView} from 'vue-router'

</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-title {
  font-size: 2.5rem;
  color: #333;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
  margin-bottom: 2rem;
}

.admin-nav {
  margin-bottom: 2rem;
}

.admin-nav-list {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.admin-nav-item {}

.admin-nav-link {
  text-decoration: none;
  color: #555;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.admin-nav-link:hover,
.admin-nav-link {
  color: #007bff;
}

.admin-content {
  background: #fff;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .admin-nav-list {
    flex-direction: column;
  }

  .admin-nav-link {
    margin-bottom: 0.5rem;
  }
}
</style>
