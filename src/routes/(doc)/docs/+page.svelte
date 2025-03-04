<script lang="ts">
    import { onMount } from "svelte";
  
    let fadeIn = false;
  
    onMount(() => {
      fadeIn = true;
    });
  </script>
  
  <main class="container">
    <section class="hero">
      <h1 class="title" class:fadeIn>Rekit</h1>
      <p class="subtitle" class:fadeIn>
        An independent project created by <strong>Juste Allou</strong>, an Ivorian-Botswanan developer. 🚀
      </p>
      <p class="description" class:fadeIn>
        Rekit provides ready-to-use tools and pre-built components to help you avoid common mistakes when building SaaS.  
        Customize, integrate, and develop faster. 🔧
      </p>
      <a href="/docs" class="cta" class:fadeIn>Explore the tools</a>
    </section>
  
    <section class="future" class:fadeIn>
      <h2>Towards a community-driven platform</h2>
      <p>
        In the future, Rekit will evolve into a component-sharing and design platform, inspired by UI Verse.  
        Join the journey! 🚀
      </p>
    </section>
  </main>
  
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
     /* min-height: 100vh;*/
     /* text-align: center;*/
     padding: 2rem;
    }
  
    .hero {
      max-width: 700px;
    }
  
    .title {
      font-size: 3rem;
      font-weight: bold;
    }
  
    .subtitle {
      font-size: 1.2rem;
      margin-top: 10px;
    }
  
    .description {
      margin-top: 15px;
      font-size: 1rem;
      opacity: 0.8;
    }
  
    .cta {
      margin-top: 20px;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      background-color: var(--primary);
      color: white;
      transition: 0.3s ease;
    }
  
    .cta:hover {
      opacity: 0.8;
    }
  
    .future {
      margin-top: 50px;
      max-width: 600px;
      opacity: 0.9;
    }
  
    .fadeIn {
      opacity: 0;
      transform: translateY(10px);
      animation: fadeInUp 0.6s ease-in-out forwards;
    }
  
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
  