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
        <h3> <a href="/destinations"> Destinations </a> </h3>
        <p>Explorez les endroits les plus étonnants d'Adra</p>
      </div>
      <div class="feature">
        <h3> <a href="/hebergements"> Hébergements </a> </h3>
        <p>Trouvez le lieu de séjour idéal pour votre voyage</p>
      </div>
      <div class="feature">
        <h3> <a href="/activites"> Activités </a> </h3>
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
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
}

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
  .hero-section h1 {
    font-size: 2rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
  .hero-section {
    padding: 2rem 1rem;
  }

  .features-section {
    flex-direction: column;
    padding: 1rem;
  }
  .feature {
    margin-bottom: 1rem;
  }

  .testimonials-section {
    padding: 1rem;
  }

  .explore-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }


  .footer {
    padding: 0.5rem;
  }
}
</style>
