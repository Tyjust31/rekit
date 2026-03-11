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

  $bp-sm: 480px;
  $bp-md: 768px;

  // ── WRAPPER : aucun padding, juste l'animation d'entrée ──────────
  .hero-page {
    width: 100%;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
                transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);

    &.isVisible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // ── CONTAINER : seul responsable du centrage et du padding ───────
  .container {
    width: 100%;
    max-width: 1000px;
    // margin-inline: auto = centrage horizontal dans tous les contextes
    margin-inline: auto;
    box-sizing: border-box;
    // Le padding horizontal vit ici, une seule source de vérité
    padding: 2rem 2rem 0;
    text-align: center;

    @media (max-width: $bp-md) { padding: 2rem 1.5rem 0; }
    @media (max-width: $bp-sm) { padding: 1.5rem 1.25rem 0; }
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
    font-size: clamp(1.875rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    // margin auto sur les côtés pour forcer le centrage du bloc texte
    margin: 0 auto 1.5rem;
    letter-spacing: -2px;
    color: aliceblue;
    max-width: 900px;

    @media (max-width: $bp-md) { letter-spacing: -1px; }
    @media (max-width: $bp-sm) { letter-spacing: -0.5px; margin-bottom: 1.25rem; }

    .gradient-text {
      background: linear-gradient(to right, $primary, #ff8a00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .description {
    font-size: clamp(0.9rem, 2.5vw, 1.15rem);
    color: $text-dim;
    max-width: 620px;
    // margin auto = centrage du paragraphe garanti
    margin: 0 auto 3rem;
    line-height: 1.65;

    @media (max-width: $bp-md) { margin-bottom: 2.5rem; }
    @media (max-width: $bp-sm) { margin-bottom: 2rem; }
  }

  // ── CTA : flex centré systématiquement ───────────────────────────
  .cta-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: $primary;
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 10px 30px rgba($primary, 0.3);
    white-space: nowrap;

    @media (max-width: $bp-md) { padding: 0.9rem 1.75rem; font-size: 0.95rem; }
    @media (max-width: $bp-sm) {
      width: min(100%, 340px);
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
      gap: 8px;
      svg { width: 18px; height: 18px; flex-shrink: 0; }
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 40px rgba($primary, 0.4);
    }
    @media (hover: none) {
      &:hover { transform: none; box-shadow: 0 10px 30px rgba($primary, 0.3); }
      &:active { opacity: 0.85; transform: scale(0.98); }
    }
  }

  .components-section {
    margin-top: 6rem;
    @media (max-width: $bp-md) { margin-top: 4rem; }
    @media (max-width: $bp-sm) { margin-top: 3rem; }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 3rem;

      @media (max-width: $bp-md) { gap: 1.25rem; margin-bottom: 2rem; }
      @media (max-width: $bp-sm) { margin-bottom: 1.5rem; }

      h2 {
        font-size: 1.1rem;
        color: white;
        white-space: nowrap;
        margin: 0;
        @media (max-width: $bp-sm) { width: 100%; text-align: center; font-size: 1rem; }
      }
      .line {
        flex: 1; height: 1px; background: $glass-border;
        @media (max-width: $bp-sm) { display: none; }
      }
    }
  }

  .components-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

    @media (max-width: $bp-md) { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    @media (max-width: $bp-sm) { grid-template-columns: 1fr; gap: 0.875rem; }
  }

  .component-card {
    position: relative;
    background: $glass;
    border: 1px solid $glass-border;
    padding: 2rem;
    border-radius: 24px;
    text-align: left;
    backdrop-filter: blur(10px);
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
                transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
                background 0.3s, border-color 0.3s;

    @media (max-width: $bp-md) { padding: 1.75rem; border-radius: 20px; }
    @media (max-width: $bp-sm) {
      padding: 1.25rem 1.5rem;
      border-radius: 16px;
      display: grid;
      grid-template-columns: 2.5rem 1fr;
      grid-template-rows: auto auto;
      column-gap: 1rem;
      row-gap: 0.2rem;
      align-items: start;
    }

    .isVisible & { opacity: 1; transform: translateY(0); }

    &:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba($primary, 0.3);
      transform: translateY(-8px);
      .card-glow { opacity: 1; }
    }
    @media (hover: none) { &:hover { transform: none; } }

    .card-glow {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at top right, rgba($primary, 0.1), transparent);
      opacity: 0; transition: opacity 0.5s;
    }

    .icon-box {
      font-size: 2rem; margin-bottom: 1rem; line-height: 1;
      @media (max-width: $bp-sm) {
        font-size: 1.6rem; margin-bottom: 0;
        grid-column: 1; grid-row: 1 / span 2;
        display: flex; align-items: center; justify-content: center;
      }
    }

    h3 {
      font-size: 1.1rem; font-weight: 700; margin: 0 0 0.5rem; color: white;
      @media (max-width: $bp-sm) {
        font-size: 0.975rem; margin-bottom: 0.25rem;
        grid-column: 2; grid-row: 1;
      }
    }

    p {
      font-size: 0.9rem; color: $text-dim; line-height: 1.5; margin: 0;
      @media (max-width: $bp-sm) {
        font-size: 0.825rem;
        grid-column: 2; grid-row: 2;
      }
    }
  }
</style>