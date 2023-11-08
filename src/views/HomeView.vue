<template>
  <div class="home-container">
    <!-- Section d'introduction avec image de fond -->
    <section class="hero-section">
      <h1>Découvrez Adra</h1>
      <p>Votre prochaine aventure commence ici</p>
      <button class="explore-button">Explorez maintenant</button>
    </section>


    <!-- Section des fonctionnalités -->
    <section class="features-section">
      <div class="feature">
        <h3>Destinations</h3>
        <p>Explorez les endroits les plus étonnants d'Adra</p>
      </div>
      <div class="feature">
        <h3>Hébergements</h3>
        <p>Trouvez le lieu de séjour idéal pour votre voyage</p>
      </div>
      <div class="feature">
        <h3>Activités</h3>
        <p>Découvrez des activités passionnantes pour enrichir votre séjour</p>
      </div>
    </section>

    <!-- Section des témoignages -->
    <section class="testimonials-section">
      <blockquote>
        "Adra a changé notre manière de voyager ! Des expériences inoubliables et un service exceptionnel."
      </blockquote>
      <p>- Nom du voyageur</p>
    </section>

    <!-- Pied de page -->
    <footer class="footer">
      <p>© 2023 Adra Voyages. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script setup>
// Ajoutez ici votre logique de script Vue
</script>

<style scoped>
.home-container {
  font-family: 'Open Sans', sans-serif;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  color: #000000;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hero-section p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.search-section input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-section button {
  padding: 0.6rem 1rem;
  background-color: #007bff;
  border: none;
  color: #000000;
  cursor: pointer;
  border-radius: 4px;
}

.features-section {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
}

.testimonials-section {
  background-color: #f8f8f8;
  text-align: center;
  padding: 2rem;
}

.testimonials-section blockquote {
  font-style: italic;
  color: #555;
}

.footer {
  text-align: center;
  padding: 1rem 0;
  color: #000000;
}

.explore-button {
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
</style>
