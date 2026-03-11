<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Rekit | Svelte Component Library</title>
  <meta name="description" content="Rekit: Modern Svelte components to accelerate your project development" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">
        <span class="logo-dot"></span>
        Rekit
      </a>
      
      <nav class="nav">
        <a href="/docs" class="nav-link">Docs</a>
        <a href="/components" class="nav-link">Components</a>
        <div class="divider"></div>
        <a href="https://github.com/Tyjust31/rekit" class="github-icon" target="_blank" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z" fill="currentColor"/>
          </svg>
        </a>
      </nav>
    </div>
  </header>

  <main class="content">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-info">
        <h3>Rekit</h3>
        <p>Built for the Svelte 5 era.</p>
      </div>
      <div class="social-links">
        <a href="https://twitter.com/tyjust31/" target="_blank">𝕏</a>
        <a href="https://github.com/Tyjust31/" target="_blank">Git</a>
        <a href="https://www.instagram.com/tyjust31/" target="_blank">Insta</a>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; {new Date().getFullYear()} TyJust 31. All rights reserved.
    </div>
  </footer>
</div>

<style>
  :global(:root) {
    --primary: #ff3e00;
    --primary-glow: rgba(255, 62, 0, 0.3);
    --bg: #0a0a0c;
    --text: #ffffff;
    --text-dim: #a1a1aa;
    --glass: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
  }

  :global(body) {
    margin: 0;
    background-color: var(--bg);
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .app-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* Decorative Glows */
  .glow-1 {
    position: fixed;
    top: -10%;
    left: -10%;
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    z-index: -1;
    filter: blur(80px);
  }

  .glow-2 {
    position: fixed;
    bottom: -10%;
    right: -10%;
    width: 30vw;
    height: 30vw;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
    z-index: -1;
    filter: blur(80px);
  }

  /* Header */
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 1.25rem;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
  }

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -1px;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--primary);
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .divider {
    width: 1px;
    height: 20px;
    background: var(--glass-border);
  }

  .github-icon {
    color: #fff;
    opacity: 0.7;
    transition: all 0.2s;
    display: flex;
  }

  .github-icon:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  /* Main Content */
  .content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 3rem 1.25rem;
  }

  /* Footer */
  .footer {
    margin-top: auto;
    border-top: 1px solid var(--glass-border);
    padding: 3rem 1.25rem 1.5rem;
    background: rgba(0,0,0,0.3);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
  }

  .footer-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  .footer-info p {
    color: var(--text-dim);
    margin: 0;
  }

  .social-links {
    display: flex;
    gap: 1.25rem;
  }

  .social-links a {
    color: var(--text-dim);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .social-links a:hover {
    color: var(--primary);
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    font-size: 0.85rem;
    color: var(--text-dim);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .header-inner {
      flex-direction: row;
    }
    .nav-link {
      display: none; /* Cache les liens textes sur mobile pour garder le GitHub */
    }
    .footer-content {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
      align-items: center;
    }
  }
</style>