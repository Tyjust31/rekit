<script lang="ts">
  import { onMount } from 'svelte';

  let isVisible = $state(false);

  onMount(() => {
    setTimeout(() => isVisible = true, 100);
  });
</script>

<div class="hero-page" class:isVisible>
  <div class="container">
    <div class="badge">Svelte 5 & Bun Powered</div>

    <h1 class="title">
      Build Faster with <span class="gradient-text">Reusable</span> Components
    </h1>

    <p class="description">
      Share, customize, and integrate powerful Svelte components to accelerate your SaaS development. 
      Join a community of developers building the future.
    </p>

    <div class="cta-wrapper">
      <a href="/docs" class="cta-button">
        Explore the Documentation
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>

    <section class="components-section">
      <div class="section-header">
        <span class="line"></span>
        <h2>Featured Components</h2>
        <span class="line"></span>
      </div>

      <div class="components-grid">
        {#each [
          { title: 'Responsive Navbar', desc: 'Customizable with dropdowns and smart mobile support.', icon: '🛰️' },
          { title: 'Data Table', desc: 'Sort, filter, and paginate with reactive performance.', icon: '📊' },
          { title: 'Auth Forms', desc: 'Pre-built login/register forms with built-in validation.', icon: '🔐' },
          { title: 'Dashboard Cards', desc: 'Beautiful metrics visualization and analytics widgets.', icon: '📈' }
        ] as card, i}
          <div class="component-card" style="transition-delay: {500 + (i * 100)}ms">
            <div class="card-glow"></div>
            <div class="icon-box">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style lang="scss">
  $primary: #ff3e00;
  $text-dim: #a1a1aa;
  $glass: rgba(255, 255, 255, 0.03);
  $glass-border: rgba(255, 255, 255, 0.08);

  // Breakpoints
  $bp-sm: 480px;
  $bp-md: 768px;

  .hero-page {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    padding: 0 1.5rem;

    @media (max-width: $bp-sm) { padding: 0 1.25rem; }
    
    &.isVisible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    padding-top: 2rem;

    @media (max-width: $bp-sm) { padding-top: 1.25rem; }
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba($primary, 0.1);
    border: 1px solid rgba($primary, 0.2);
    border-radius: 99px;
    color: $primary;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2rem;

    @media (max-width: $bp-sm) {
      font-size: 0.65rem;
      padding: 0.4rem 0.85rem;
      margin-bottom: 1.5rem;
      letter-spacing: 0.5px;
    }
  }

  .title {
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -2px;
    color: aliceblue;

    @media (max-width: $bp-md) { letter-spacing: -1px; }
    @media (max-width: $bp-sm) {
      font-size: clamp(1.75rem, 9vw, 2.5rem);
      letter-spacing: -0.5px;
      margin-bottom: 1.25rem;
    }

    .gradient-text {
      background: linear-gradient(to right, $primary, #ff8a00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .description {
    font-size: 1.15rem;
    color: $text-dim;
    max-width: 650px;
    margin: 0 auto 3rem;
    line-height: 1.6;

    @media (max-width: $bp-md) { font-size: 1.05rem; margin-bottom: 2.5rem; }
    @media (max-width: $bp-sm) {
      font-size: 0.95rem;
      margin-bottom: 2rem;
      line-height: 1.55;
    }
  }

  .cta-wrapper {
    @media (max-width: $bp-sm) {
      display: flex;
      justify-content: center;
    }
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: $primary;
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s;
    box-shadow: 0 10px 30px rgba($primary, 0.3);

    @media (max-width: $bp-md) { padding: 0.9rem 1.75rem; }
    @media (max-width: $bp-sm) {
      padding: 0.85rem 1.5rem;
      font-size: 0.9rem;
      gap: 8px;
      width: 100%;
      max-width: 320px;
      justify-content: center;

      svg { width: 18px; height: 18px; flex-shrink: 0; }
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 40px rgba($primary, 0.4);
    }

    // Évite le scale sur mobile (tap feels odd)
    @media (hover: none) {
      &:hover { transform: none; }
      &:active { opacity: 0.85; transform: scale(0.98); }
    }
  }

  // --- SECTION COMPOSANTS ---
  .components-section {
    margin-top: 6rem;

    @media (max-width: $bp-md) { margin-top: 4rem; }
    @media (max-width: $bp-sm) { margin-top: 3rem; }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;

      @media (max-width: $bp-md) { gap: 1.25rem; margin-bottom: 2rem; }
      @media (max-width: $bp-sm) {
        gap: 1rem;
        margin-bottom: 1.5rem;
        // Cache les lignes déco sur très petit écran pour éviter l'écrasement du titre
        .line { display: none; }
      }
      
      h2 {
        font-size: 1.25rem;
        color: white;
        white-space: nowrap;
        @media (max-width: $bp-sm) { font-size: 1.05rem; width: 100%; text-align: center; }
      }
      .line { flex: 1; height: 1px; background: $glass-border; }
    }
  }

  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;

    @media (max-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    @media (max-width: $bp-sm) {
      grid-template-columns: 1fr;
      gap: 0.875rem;
    }
  }

  .component-card {
    position: relative;
    background: $glass;
    border: 1px solid $glass-border;
    padding: 2rem;
    border-radius: 24px;
    text-align: left;
    backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);

    @media (max-width: $bp-md) { padding: 1.75rem; border-radius: 20px; }
    @media (max-width: $bp-sm) {
      padding: 1.5rem;
      border-radius: 16px;
      // Affichage horizontal sur mobile pour compacité
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      column-gap: 1rem;
      align-items: start;
    }

    .isVisible & {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba($primary, 0.3);
      transform: translateY(-10px);
      .card-glow { opacity: 1; }
    }

    @media (hover: none) {
      &:hover { transform: none; }
    }

    .card-glow {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at top right, rgba($primary, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.5s;
    }

    .icon-box {
      font-size: 2rem;
      margin-bottom: 1rem;

      @media (max-width: $bp-sm) {
        font-size: 1.75rem;
        margin-bottom: 0;
        grid-row: span 2;
        display: flex;
        align-items: center;
        padding-top: 2px;
      }
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;

      @media (max-width: $bp-sm) {
        font-size: 1rem;
        margin-bottom: 0.3rem;
      }
    }

    p {
      font-size: 0.9rem;
      color: $text-dim;
      line-height: 1.5;

      @media (max-width: $bp-sm) { font-size: 0.85rem; }
    }
  }
</style>