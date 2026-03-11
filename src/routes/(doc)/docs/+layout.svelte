<script lang="ts">
  import { UsedarkMode } from './theme.svelte';
  let { children } = $props();

  // Utilisation de ta rune de thème personnalisée
  let theme = UsedarkMode();

  // État local pour le menu mobile (Svelte 5 Rune)
  let isMobileMenuOpen = $state(false);

  function toggleMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<svelte:head>
  <title>Rekit Docs | Modern Svelte Components</title>
  <meta name="description" content="Documentation for Rekit Svelte components" />
</svelte:head>

<div class="app-layout" class:dark-mode={theme.darkMode}>
  <aside class="sidebar" class:open={isMobileMenuOpen}>
    <div class="sidebar-header">
      <a href="/" class="logo">
        <span class="logo-dot"></span>
        Rekit <span>Docs</span>
      </a>
      <button class="close-menu" onclick={toggleMenu}>✕</button>
    </div>

    <nav class="nav-groups">
      <div class="group">
        <span class="group-title">Getting Started</span>
        <a href="/docs" class="nav-link">Introduction</a>
      </div>

      <div class="group">
        <span class="group-title">Components</span>
        <a href="/docs/kanban" class="nav-link">Kanban Board</a>
        <a href="/docs/kanban-two" class="nav-link">Kanban Pro</a>
        <a href="/docs/csv" class="nav-link">CSV Parser</a>
        <a href="/docs/board" class="nav-link">Project Board</a>
        <a href="/docs/calendar" class="nav-link">Event Calendar</a>
      </div>
    </nav>

    <div class="sidebar-footer">
      <p>v1.0.0-beta</p>
    </div>
  </aside>

  <main class="main-container">
    <header class="top-nav">
      <div class="left-section">
        <button class="menu-toggle" onclick={toggleMenu}>☰</button>
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search components..." class="search-input" />
          <kbd class="search-shortcut">⌘K</kbd>
        </div>
      </div>

      <div class="right-section">
        <a href="https://github.com/Tyjust31/rekit" class="icon-link">GitHub</a>
        <button class="theme-btn" onclick={theme.toggle} aria-label="Toggle Theme">
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>

    <section class="page-content">
      <article class="prose">
        {@render children()}
      </article>
    </section>
  </main>
</div>

<style lang="scss">
  // --- VARIABLES ---
  $primary: #ff3e00;
  $sidebar-bg: #11111b;
  $sidebar-text: #cdd6f4;
  $light-bg: #ffffff;
  $light-border: #e2e8f0;
  $dark-bg: #0f172a;
  $dark-border: #1e293b;

  .app-layout {
    display: flex;
    height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    background: $light-bg;
    color: #1a202c;
    transition: background 0.3s;
    a{
          color: #1a202c;

    }
    &.dark-mode {
      background: $dark-bg;
      color: #f8fafc;
          a{
          color: #ffffff;

    }
    }
  }

  // --- SIDEBAR ---
  .sidebar {
    width: 280px;
    background: $sidebar-bg;
    color: $sidebar-text;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border-right: 1px solid rgba(255,255,255,0.05);
    z-index: 1000;
    transition: transform 0.3s ease;

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;

      .logo {
        font-size: 1.25rem;
        font-weight: 800;
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        
        span { color: $primary; }
        .logo-dot { width: 8px; height: 8px; background: $primary; border-radius: 50%; }
      }

      .close-menu { display: none; background: none; border: none; color: white; font-size: 1.5rem; }
    }

    .nav-groups {
      flex: 1;
      .group {
        margin-bottom: 2rem;
        .group-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6c7086;
          font-weight: 700;
          display: block;
          margin-bottom: 0.75rem;
        }
      }
    }

    .nav-link {
      display: block;
      color: #a6adc8;
      text-decoration: none;
      padding: 0.6rem 0.8rem;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }
    }

    .sidebar-footer {
      font-size: 0.8rem;
      color: #585b70;
      padding-top: 1rem;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
  }

  // --- MAIN CONTENT ---
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .top-nav {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid $light-border;

    .dark-mode & { border-bottom-color: $dark-border; }

    .left-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .menu-toggle { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; }

    .search-wrapper {
      position: relative;
      max-width: 400px;
      width: 100%;
      display: flex;
      align-items: center;

      .search-icon { position: absolute; left: 12px; font-size: 0.9rem; }
      .search-input {
        width: 100%;
        padding: 0.6rem 1rem 0.6rem 2.5rem;
        border-radius: 10px;
        border: 1px solid $light-border;
        background: #f1f5f9;
        font-size: 0.9rem;

        .dark-mode & {
          background: #1e293b;
          border-color: $dark-border;
          color: white;
        }
      }
      .search-shortcut {
        position: absolute;
        right: 12px;
        font-size: 0.7rem;
        padding: 2px 6px;
        background: white;
        border: 1px solid $light-border;
        border-radius: 4px;
        color: #94a3b8;
        .dark-mode & { background: #0f172a; border-color: $dark-border; }
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .theme-btn {
        background: none;
        border: 1px solid $light-border;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        .dark-mode & { border-color: $dark-border; }
      }
    }
  }

  .page-content {
    flex: 1;
    overflow-y: auto;
    padding: 3rem 2rem;
    scroll-behavior: smooth;
    
    .prose {
      max-width: 800px;
      margin: 0 auto;
    }
  }

  // --- RESPONSIVE ---
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      left: 0; top: 0; bottom: 0;
      transform: translateX(-100%);
      &.open { transform: translateX(0); }
      .sidebar-header .close-menu { display: block; }
    }

    .top-nav {
      padding: 0 1rem;
      .menu-toggle { display: block; }
      .search-shortcut { display: none; }
    }
    
    .page-content { padding: 1.5rem; }
  }
</style>