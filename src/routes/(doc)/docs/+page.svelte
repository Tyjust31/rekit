<script lang="ts">
  import { onMount } from "svelte";

  // Utilisation de Svelte 5 pour l'état d'animation
  let isReady = $state(false);

  onMount(() => {
    isReady = true;
  });
</script>

<main class="about-container" class:isReady>
  <section class="profile-card">
    <div class="badge">Creator Spotlight</div>
    
    <h1 class="title">Rekit</h1>
    
    <p class="subtitle">
      An independent project by 
      <span class="highlight">Juste Allou</span>, 
      <br />an Ivorian-Rwandans  developer. 🌍
    </p>

    <div class="bio-content">
      <p>
        Rekit provides ready-to-use tools and pre-built components to help you avoid common mistakes when building SaaS.
      </p>
      <div class="features-mini">
        <span>⚡ Faster Dev</span>
        <span>🛡️ Clean Code</span>
        <span>🎨 Full Custom</span>
      </div>
    </div>

    <div class="cta-wrapper">
      <a href="/docs" class="cta-btn">
        Explore the tools
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>

  <section class="vision-card">
    <div class="icon-orbit">🚀</div>
    <h2>Towards a community platform</h2>
    <p>
      In the future, Rekit will evolve into a component-sharing and design platform, 
      inspired by the best UI ecosystems. 
    </p>
    <div class="status-tag">Coming Soon</div>
  </section>
</main>

<style lang="scss">
  // --- CONFIGURATION DU THÈME ---
  $primary: #ff3e00;
  
  // Couleurs Light Mode (Défaut)
  :global(:root) {
    --bg-app: #f8fafc;
    --card-bg: #ffffff;
    --text-main: #0f172a;
    --text-dim: #64748b;
    --border-color: #e2e8f0;
    --glass-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  }

  // Couleurs Dark Mode (Trigger par la classe parente)
  :global(.dark-mode) {
    --bg-app: #0a0a0c;
    --card-bg: #161622;
    --text-main: #f8fafc;
    --text-dim: #94a3b8;
    --border-color: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  }

  .about-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 4rem 1.5rem;
    min-height: 80vh;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);

    &.isReady {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // --- STYLE DES CARTES ---
  .profile-card, .vision-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: var(--glass-shadow);
    border-radius: 24px;
    padding: 3rem;
    width: 100%;
    max-width: 800px;
    text-align: center;
    transition: background 0.3s;
  }

  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: rgba($primary, 0.1);
    color: $primary;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
  }

  .title {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    letter-spacing: -3px;
    color: var(--text-main);
  }

  .subtitle {
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--text-dim);
    margin-bottom: 2rem;

    .highlight {
      color: var(--text-main);
      font-weight: 700;
      border-bottom: 2px solid $primary;
    }
  }

  .bio-content {
    color: var(--text-dim);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 550px;
    margin: 0 auto 2.5rem;

    .features-mini {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      
      span {
        padding: 4px 10px;
        background: var(--bg-app);
        border-radius: 6px;
        border: 1px solid var(--border-color);
      }
    }
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: $primary;
    color: white;
    padding: 14px 32px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 10px 20px rgba($primary, 0.3);
    }
  }

  .vision-card {
    background: linear-gradient(135deg, var(--card-bg), var(--bg-app));
    border-style: dashed;
    
    .icon-orbit {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h2 { font-size: 1.8rem; margin-bottom: 1rem; color: var(--text-main); }
    p { color: var(--text-dim); max-width: 500px; margin: 0 auto 1.5rem; }

    .status-tag {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 4px 8px;
      background: #3b82f6;
      color: white;
      border-radius: 4px;
      text-transform: uppercase;
    }
  }

  @media (max-width: 640px) {
    .title { font-size: 3rem; }
    .profile-card { padding: 2rem 1.5rem; }
    .features-mini { flex-direction: column; align-items: center; }
  }
</style>