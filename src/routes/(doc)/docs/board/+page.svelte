<script>
    import { onMount } from "svelte";
    import "prismjs";
    import "prismjs/themes/prism.css";  // Inclure le thème de PrismJS
  
    let code = `
     <script>
let kpis = $state([
  {
    nom: "Increase leads",
    valeurActuelle: 1200,
    valeurCible: 1500,
    variation: -20,
    progress: 80,
    periode: "Nov 2024",
    responsable: "Jean Dupont",
  },
  {
    nom: "Conversion rate",
    valeurActuelle: 8,
    valeurCible: 10,
    variation: -2,
    progress: 40,
    periode: "Nov 2024",
    responsable: "Équipe Marketing",
  },
  {
    nom: "Customer satisfaction",
    valeurActuelle: 85,
    valeurCible: 80,
    variation: 5,
    progress: 100,
    periode: "Nov 2024",
    responsable: "Équipe Support",
  },
]);

  const updateKpi = (index, field, value) => {
    kpis[index][field] = field === "progress" ? parseFloat(value) : value;
  };
----script-----

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #e0e0e0;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f9f9f9;
    font-weight: bold;
  }

  td {
    position: relative;
    vertical-align: middle;
  }

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 14px;
    padding: 5px;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    margin-top: 5px;
  }

  .progress-bar div {
    height: 100%;
    border-radius: 5px;
  }

  .progress-bar .orange {
    background-color: orange;
  }

  .progress-bar .red {
    background-color: red;
  }

  .progress-bar .green {
    background-color: green;
  }
</style>

<table>
  <thead>
    <tr>
      <th>KPI Name</th>
      <th>Current Value</th>
      <th>Target Value</th>
      <th>Variation (%)</th>
      <th>Progress</th>
      <th>Period</th>
      <th>Responsible</th>
    </tr>
  </thead>
  <tbody>
    {#each kpis as kpi, index}
      <tr>
        <td>
          <input
            type="text"
            value={kpi.name}
            on:input={(e) => updateKpi(index, "name", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={kpi.currentValue}
            on:input={(e) => updateKpi(index, "currentValue", parseInt(e.target.value))}
          />
        </td>
        <td>
          <input
            type="number"
            value={kpi.targetValue}
            on:input={(e) => updateKpi(index, "targetValue", parseInt(e.target.value))}
          />
        </td>
        <td style="color: {kpi.variation < 0 ? 'red' : 'green'};">
          {kpi.variation}%
        </td>
        <td>
          <div class="progress-bar">
            <div
              class={kpi.progress >= 80 ? "green" : kpi.progress >= 50 ? "orange" : "red"}
              style="width: {kpi.progress}%;"
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={kpi.progress}
            on:input={(e) => updateKpi(index, "progress", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={kpi.period}
            on:input={(e) => updateKpi(index, "period", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={kpi.responsible}
            on:input={(e) => updateKpi(index, "responsible", e.target.value)}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

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

    let kpis = $state([
  {
    nom: "Increase leads",
    valeurActuelle: 1200,
    valeurCible: 1500,
    variation: -20,
    progress: 80,
    periode: "Nov 2024",
    responsable: "Jean Dupont",
  },
  {
    nom: "Conversion rate",
    valeurActuelle: 8,
    valeurCible: 10,
    variation: -2,
    progress: 40,
    periode: "Nov 2024",
    responsable: "Équipe Marketing",
  },
  {
    nom: "Customer satisfaction",
    valeurActuelle: 85,
    valeurCible: 80,
    variation: 5,
    progress: 100,
    periode: "Nov 2024",
    responsable: "Équipe Support",
  },
]);


  const updateKpi = (index, field, value) => {
    kpis[index][field] = field === "progress" ? parseFloat(value) : value;
  };
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


    table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-top: 20px;
  }

  th, td {
    border: #808080 1px solid;

    padding: 10px;
    text-align: left;
  }

  th {
    border: #808080 1px solid;

    font-weight: bold;
  }

  td {
    position: relative;
    vertical-align: middle;
  }

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 14px;
    color: gray;
    padding: 5px;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    margin-top: 5px;
    border: #808080 1px solid;
  }

  .progress-bar div {
    height: 100%;
    border-radius: 5px;
  }

  .progress-bar .orange {
    background-color: orange;
  }

  .progress-bar .red {
    background-color: red;
  }

  .progress-bar .green {
    background-color: green;
  }
  </style>
  

  <table>
    <thead>
      <tr>
        <th>KPI Name</th>
        <th>Current Value</th>
        <th>Target Value</th>
        <th>Variation (%)</th>
        <th>Progress</th>
        <th>Period</th>
        <th>Responsible</th>
        
      </tr>
    </thead>
    <tbody>
      {#each kpis as kpi, index}
        <tr>
          <td>
            <input
              type="text"
              value={kpi.nom}
              on:input={(e) => updateKpi(index, "nom", e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              value={kpi.valeurActuelle}
              on:input={(e) => updateKpi(index, "valeurActuelle", parseInt(e.target.value))}
            />
          </td>
          <td>
            <input
              type="number"
              value={kpi.valeurCible}
              on:input={(e) => updateKpi(index, "valeurCible", parseInt(e.target.value))}
            />
          </td>
          <td style="color: {kpi.variation < 0 ? 'red' : 'green'};">
            {kpi.variation}%
          </td>
          <td>
            <div class="progress-bar">
              <div
                class={kpi.progress >= 80 ? "green" : kpi.progress >= 50 ? "orange" : "red"}
                style="width: {kpi.progress}%;"
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={kpi.progress}
              on:input={(e) => updateKpi(index, "progress", e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={kpi.periode}
              on:input={(e) => updateKpi(index, "periode", e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={kpi.responsable}
              on:input={(e) => updateKpi(index, "responsable", e.target.value)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <div class="code-container">
    <!-- Bouton de copie -->
    <button class="copy-button" on:click={copyCode}>
      {#if copied}
        copy
      {:else}

copy code      
{/if}
    </button>
  
    <!-- Bloc de code avec syntax highlighting -->
    <div class="code-block">
      <pre><code class="language-javascript">{code}</code></pre>
    </div>
  </div>
  