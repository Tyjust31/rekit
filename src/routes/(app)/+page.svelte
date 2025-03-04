<script>
    import { onMount, tick } from 'svelte';
  
    let showTitle = false;
    let showDescription = false;
    let showCtaButton = false;
    let showComponentsSection = false;
  
    onMount(async () => {
      await tick();
      setTimeout(() => showTitle = true, 200);
      setTimeout(() => showDescription = true, 400);
      setTimeout(() => showCtaButton = true, 600);
      setTimeout(() => showComponentsSection = true, 800);
    });
  </script>
  
  <style>
    main {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #1a1a1a, #2c3e50);
      color: #fff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  
    .container {
      text-align: center;
      max-width: 800px;
      padding: 2rem;
    }
  
    .title, .description, .cta-button, .components-section {
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
  
    .show {
      opacity: 1;
      transform: translateY(0);
    }
  
    .title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  
    .description {
      font-size: 1.25rem;
      color: #a0aec0;
      margin-bottom: 2rem;
    }
  
    .cta-button {
      background: #4f46e5;
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease;
    }
  
    .cta-button:hover {
      background: #4338ca;
      transform: scale(1.05);
    }
  
    .components-section {
      margin-top: 4rem;
    }
  
    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
  
    .component-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      transition: transform 0.3s ease, background 0.3s ease;
    }
  
    .component-card:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-10px);
    }
  
    .component-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
  
    .component-card p {
      font-size: 0.9rem;
      color: #a0aec0;
    }
  </style>
  
  <main>
    <div class="container">
      <!-- Titre principal -->
      <h1 class="title {showTitle ? 'show' : ''}">Build Faster with Reusable Svelte Components</h1>
  
      <!-- Description -->
      <p class="description {showDescription ? 'show' : ''}">
        Share, customize, and integrate powerful Svelte components to accelerate your SaaS development.
        Join a community of developers building the future.
      </p>
  
      <!-- Bouton CTA -->
      <a href="/docs" class="cta-button {showCtaButton ? 'show' : ''}">Explore the Documentation</a>
  
      <!-- Section des composants -->
      <div class="components-section {showComponentsSection ? 'show' : ''}">
        <h2>Featured Components</h2>
        <div class="components-grid">
          <div class="component-card">
            <h3>Responsive Navbar</h3>
            <p>A fully customizable navbar with dropdowns and mobile support.</p>
          </div>
          <div class="component-card">
            <h3>Data Table</h3>
            <p>Sort, filter, and paginate your data with ease.</p>
          </div>
          <div class="component-card">
            <h3>Auth Forms</h3>
            <p>Pre-built login and registration forms with validation.</p>
          </div>
          <div class="component-card">
            <h3>Dashboard Cards</h3>
            <p>Beautiful cards for displaying metrics and analytics.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  