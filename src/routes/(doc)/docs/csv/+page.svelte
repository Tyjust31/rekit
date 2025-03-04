<script>
    import { onMount } from "svelte";
    import "prismjs";
    import "prismjs/themes/prism.css";  // Inclure le thème de PrismJS
  
    let code = `
 <script lang="ts">
    import Papa from 'papaparse';
  
    let csvData: any[] = $state([]);
    let error: string | null = $state(null);
    let loading = $state(false);
  
    // Cette fonction est déclenchée lorsque l'utilisateur sélectionne un fichier CSV
    function handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
  
      // Démarre le chargement
      loading = true;
      error = null;
  
      // Utiliser PapaParse pour parser le CSV
      Papa.parse(file, {
        complete: (result) => {
          // Affiche les données extraites du fichier CSV
          csvData = result.data;
          console.log(csvData);
          loading = false;
        },
        error: (err) => {
          error = "Erreur lors du traitement du fichier CSV.";
          console.error(err);
          loading = false;
        },
        header: true, // Si la première ligne est un en-tête
      });
    }
  --script---
  
  <style>
    .loading {
      color: blue;
    }
    .error {
      color: red;
    }
  </style>
  
  <div>
    <h2>Importer un fichier CSV</h2>
    
    <!-- Formulaire pour uploader le fichier CSV -->
    <input type="file" accept=".csv" on:change={handleFileUpload} />
    
    <!-- Affichage du statut de chargement -->
    {#if loading}
      <p class="loading">Chargement...</p>
    {/if}
    
    <!-- Affichage des erreurs -->
    {#if error}
      <p class="error">{error}</p>
    {/if}
    
    <!-- Affichage des données extraites du CSV -->
    {#if csvData.length > 0}
      <table>
        <thead>
          <tr>
            {#each Object.keys(csvData[0]) as key}
              <th>{key}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each csvData as row}
            <tr>
              {#each Object.values(row) as value}
                <td>{value}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  
    `;
  
    let copied = $state(false);
  
    function copyCode() {
      navigator.clipboard.writeText(code).then(() => {
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 2000);
      });
    }
  
    onMount(() => {
      // Assurez-vous que PrismJS fonctionne
      window.Prism.highlightAll();
    });




        // Liste des colonnes et des tâches
        let tasks = $state({
      "À faire": [
        { id: 1, text: "Faire un café" },
        { id: 2, text: "Réviser le code" },
      ],
      "En cours": [
        { id: 3, text: "Créer un Kanban" },
      ],
      "En revue": [],
      "Terminé": [
        { id: 4, text: "Planifier la journée" },
      ],
    });
  
    // Fonction pour déplacer une tâche d'une colonne à une autre
    function moveTask(task, from, to) {
      tasks[from] = tasks[from].filter((t) => t.id !== task.id);
      tasks[to].push(task);
    }

    // Drag and drop handling
    function handleDrop(event, toColumn) {
      event.preventDefault();
      const { task, from } = JSON.parse(event.dataTransfer.getData("task"));
      moveTask(task, from, toColumn);
    }
  
    function allowDrop(event) {
      event.preventDefault();
    }




    import Papa from 'papaparse';
  
  let csvData: any[] = $state([]);
  let error: string | null = $state(null);
  let loading = $state(false);

  // Cette fonction est déclenchée lorsque l'utilisateur sélectionne un fichier CSV
  function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Démarre le chargement
    loading = true;
    error = null;

    // Utiliser PapaParse pour parser le CSV
    Papa.parse(file, {
      complete: (result) => {
        // Affiche les données extraites du fichier CSV
        csvData = result.data;
        console.log(csvData);
        loading = false;
      },
      error: (err) => {
        error = "Erreur lors du traitement du fichier CSV.";
        console.error(err);
        loading = false;
      },
      header: true, // Si la première ligne est un en-tête
    });
  }
  </script>
  
  <style>
    .copy-button {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 1rem;
    }
  
    .copy-button:focus {
      outline: none;
    }
  
    .copy-button:hover {
      background-color: #45a049;
    }
  
    .code-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
  
    .code-block {
      background: #282c34;
      color: white;
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      max-width: 800px;
      overflow: auto;
      margin-top: 10px;
      font-family: 'Courier New', Courier, monospace;
    }
  
    .notification {
      background-color: #4caf50;
      color: white;
      padding: 5px;
      border-radius: 5px;
      margin-top: 10px;
      font-size: 0.9rem;
      display: inline-block;
    }
    .kanban {
        border: #767676 1px solid;

      display: flex;
      gap: 1rem;
      margin: 2rem;
    }
    .column {
        border: #767676 1px solid;

      flex: 1;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    .task {
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      border-radius: 5px;
      cursor: grab;
      border: #767676 1px solid;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .task:hover {
      background: #808080;
    }
  </style>
  

  <div>
    <h2>Importer un fichier CSV</h2>
    
    <!-- Formulaire pour uploader le fichier CSV -->
    <input type="file" accept=".csv" on:change={handleFileUpload} />
    
    <!-- Affichage du statut de chargement -->
    {#if loading}
      <p class="loading">Chargement...</p>
    {/if}
    
    <!-- Affichage des erreurs -->
    {#if error}
      <p class="error">{error}</p>
    {/if}
    
    <!-- Affichage des données extraites du CSV -->
    {#if csvData.length > 0}
      <table>
        <thead>
          <tr>
            {#each Object.keys(csvData[0]) as key}
              <th>{key}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each csvData as row}
            <tr>
              {#each Object.values(row) as value}
                <td>{value}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  <div class="code-container">
    <!-- Bouton de copie -->
    <button class="copy-button" on:click={copyCode}>
      {#if copied}
        Copié!
      {:else}
        Copier le Code
      {/if}
    </button>
  
    <!-- Bloc de code avec syntax highlighting -->
    <div class="code-block">
      <pre><code class="language-javascript">{code}</code></pre>
    </div>
  </div>
  