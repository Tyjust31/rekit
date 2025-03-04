<script lang="ts">
    let { children } = $props();
   // let darkMode = $state(false);
    import {UsedarkMode}  from './theme.svelte'



    let theme = UsedarkMode()
    console.log(theme)
  </script>
  <svelte:head>
  
	<title>redkit svelte component</title>
	<meta name="robots" content="redkit svelte component" />

  </svelte:head>
  <main class={theme.darkMode ? 'dark' : ''}>
    <!-- Sidebar -->
    <aside class="sidebar">
      <a href="/" class="logo">Rekit Docs</a>
      <nav>
        <a href="/docs" class="nav-link">Introduction</a>
        <a href="/docs/kanban" class="nav-link">kanban</a>
        <a href="/docs/kanban-two" class="nav-link">kanban-two</a>
        <a href="/docs/csv" class="nav-link">csv</a>
        <a href="/docs/board" class="nav-link">board</a>
        <a href="/docs/calendar" class="nav-link">calendar</a>

      </nav>
    </aside>
  
    <!-- Contenu principal -->
    <div class="content">
      <!-- Header -->
      <header class="header">
        <input type="text" placeholder="Rechercher..." class="search" />
        <button class="theme-toggle" onclick={theme.toggle}>
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <section class="doc-content">
        {@render children()}
      </section>
    </div>
  </main>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    main {
      display: flex;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
  
    .sidebar {
      width: 250px;
      background: #1e1e2e;
      color: #fff;
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: #fff;
      margin-bottom: 1rem;
    }
  
    .nav-link {
      display: block;
      color: #fff;
      text-decoration: none;
      padding: 0.5rem 0;
      transition: 0.3s;
    }
  
    .nav-link:hover {
      color: #aaa;
    }
  
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  
    .header {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #f5f5f5;
    }
  
    .search {
      padding: 0.5rem;
      flex: 1;
      margin-right: 1rem;
    }
  
    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
  
    .doc-content {
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }
  
    /* Dark mode */
    .dark .content {
      background: #121212;
      color: #fff;
    }
    .dark .header {
      background: #222;
    }
    .dark .search {
      background: #333;
      color: #fff;
    }
    /* Ajouter ces règles à votre feuille de style */

/* Pour les petits écrans (mobiles) */
@media (max-width: 768px) {
  main {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    padding: 1rem;
  }
  .content {
    padding-top: 1rem;
  }
  .header {
    padding: 0.5rem;
  }
  .search {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  .theme-toggle {
    font-size: 1rem;
  }
}

/* Pour les tablettes */
@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
  .content {
    padding-left: 1rem;
  }
}

/* Pour les écrans plus grands */
@media (min-width: 1025px) {
  /* Aucune modification nécessaire ici */
}

  </style>
  