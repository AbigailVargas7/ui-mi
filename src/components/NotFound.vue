<template>
    <div class="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <router-link to="/" class="home-link">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
    color: #333;
  }
  
  .not-found h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #369870;
  }
  </style>
  