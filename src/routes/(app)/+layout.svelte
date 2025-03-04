<script lang="ts">
	let { children } = $props();
</script>
<svelte:head>
  
<title>redkit</title>
<meta name="robots" content="redkit svelte component" />

</svelte:head>
<main>
  <!-- Header -->
  <header class="header">
    <a href="/" class="logo">Rekit</a>
    <nav class="nav">
      <a href="#" class="nav-link">Docs</a>
    </nav>
  </header>

  <!-- Contenu principal -->
  {@render children()}

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; Créé par TyJust 31 - Juste Allou</p>
    <div class="social-links">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-twitter"></i>
      </a>
    </div>
  </footer>
</main>

<style>
  /* Général */
  main {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #fff;
    background: linear-gradient(135deg, #1a1a1a, #2c3e50);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background: rgba(0, 0, 0, 0.8);
  }

  .logo {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }

  .logo:hover {
    text-decoration: underline;
  }

  .nav {
    display: flex;
    align-items: center;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
    font-weight: 500;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  /* Footer */
  .footer {
    background: rgba(0, 0, 0, 0.8);
    padding: 1.5em;
    text-align: center;
    font-size: 0.9em;
  }

  .social-links {
    margin-top: 10px;
  }

  .social-links a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    transition: transform 0.3s ease;
  }

  .social-links a:hover {
    transform: scale(1.1);
  }

  .social-links i {
    font-size: 1.5em;
  }

  /* Responsive */
  @media screen and (max-width: 768px) {
    .header {
      flex-direction: column;
      align-items: center;
    }

    .nav {
      margin-top: 10px;
    }

    .nav-link {
      margin-left: 0;
      margin-bottom: 10px;
    }

    .footer {
      padding: 1em 0.5em;
    }
  }
</style>
