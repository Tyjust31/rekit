<script lang="ts">
  import { onMount } from "svelte";
  import "prismjs";
  import "prismjs/themes/prism-tomorrow.css";

  // --- ÉTATS SVELTE 5 ---
  let copied = $state(false);
  let kpis = $state([
    { nom: "Increase leads", actuelle: 1200, cible: 1500, progress: 80, periode: "Nov 2024", responsable: "Jean Dupont" },
    { nom: "Conversion rate", actuelle: 8, cible: 10, progress: 40, periode: "Nov 2024", responsable: "Marketing Team" },
    { nom: "Customer satisfaction", actuelle: 85, cible: 80, progress: 100, periode: "Nov 2024", responsable: "Support Team" },
  ]);

  // Calcul dérivé pour la variation
  const getVariation = (kpi) => Math.round(((kpi.actuelle - kpi.cible) / kpi.cible) * 100);

  const codeSnippet = `

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
 *{}</style>

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

    `.trim();

  function copy() {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }

  onMount(() => { window.Prism.highlightAll(); });
</script>

<div class="kpi-explorer">
  <header class="doc-header">
    <h1>KPI Tracker</h1>
    <p>A reactive performance dashboard with real-time editing and progress visualization.</p>
  </header>

  <section class="demo-card">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>KPI Name</th>
            <th>Current</th>
            <th>Target</th>
            <th>Variation</th>
            <th>Progress</th>
            <th>Responsible</th>
          </tr>
        </thead>
        <tbody>
          {#each kpis as kpi, index}
            <tr>
              <td class="name-cell">
                <input type="text" bind:value={kpi.nom} placeholder="KPI Name" />
              </td>
              <td>
                <input type="number" bind:value={kpi.actuelle} />
              </td>
              <td>
                <input type="number" bind:value={kpi.cible} />
              </td>
              <td class="variation-cell" class:negative={getVariation(kpi) < 0}>
                {getVariation(kpi) > 0 ? '+' : ''}{getVariation(kpi)}%
              </td>
              <td class="progress-cell">
                <div class="progress-track">
                  <div 
                    class="progress-fill" 
                    class:low={kpi.progress < 50}
                    class:mid={kpi.progress >= 50 && kpi.progress < 90}
                    class:high={kpi.progress >= 90}
                    style="width: {kpi.progress}%"
                  ></div>
                </div>
                <input type="range" bind:value={kpi.progress} min="0" max="100" />
              </td>
              <td class="resp-cell">
                 <input type="text" bind:value={kpi.responsable} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="code-explorer">
    <div class="code-card">
      <div class="code-nav">
        <span>kpi-dashboard.svelte</span>
        <button class="copy-btn" onclick={copy}>
          {copied ? "✓ Copied" : "📋 Copy Code"}
        </button>
      </div>
      <div class="code-body">
        <pre><code class="language-javascript">{codeSnippet}</code></pre>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  $primary: #ff3e00;
  $success: #10b981;
  $warning: #f59e0b;
  $danger: #ef4444;

  // --- THEMING ---
  :global(:root) {
    --kpi-bg: #ffffff;
    --kpi-text: #1e293b;
    --kpi-border: #e2e8f0;
    --kpi-header: #f8fafc;
    --kpi-input-hover: #f1f5f9;
  }

  :global(.dark-mode) {
    --kpi-bg: #11111b;
    --kpi-text: #cdd6f4;
    --kpi-border: rgba(255, 255, 255, 0.08);
    --kpi-header: #181825;
    --kpi-input-hover: rgba(255, 255, 255, 0.03);
  }

  .kpi-explorer {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .doc-header {
    margin-bottom: 2.5rem;
    h1 { font-size: 2.2rem; font-weight: 800; color: var(--kpi-text); letter-spacing: -1px; }
    p { color: #64748b; font-size: 1.1rem; }
  }

  // --- TABLE DESIGN ---
  .demo-card {
    background: var(--kpi-bg);
    border: 1px solid var(--kpi-border);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    overflow: hidden;
    margin-bottom: 3rem;
  }

  .table-wrapper {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;

      th {
        background: var(--kpi-header);
        padding: 12px 16px;
        text-align: left;
        color: #64748b;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.5px;
        border-bottom: 1px solid var(--kpi-border);
      }

      td {
        padding: 8px 12px;
        border-bottom: 1px solid var(--kpi-border);
        color: var(--kpi-text);
      }
    }
  }

  // --- INPUTS & CELLS ---
  input[type="text"], input[type="number"] {
    width: 100%;
    background: transparent;
    border: 1px solid transparent;
    padding: 6px 8px;
    border-radius: 6px;
    color: inherit;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover { background: var(--kpi-input-hover); }
    &:focus {
      outline: none;
      background: var(--kpi-bg);
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
  }

  .variation-cell {
    font-weight: 700;
    color: $success;
    &.negative { color: $danger; }
  }

  .progress-cell {
    min-width: 140px;
    .progress-track {
      height: 6px;
      background: var(--kpi-border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .progress-fill {
      height: 100%;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      &.low { background: $danger; }
      &.mid { background: $warning; }
      &.high { background: $success; }
    }
    input[type="range"] {
      width: 100%;
      height: 4px;
      accent-color: $primary;
      cursor: pointer;
    }
  }

  // --- CODE BLOCK ---
  .code-card {
    background: #1e1e2e;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--kpi-border);

    .code-nav {
      background: rgba(255,255,255,0.05);
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span { font-size: 0.8rem; color: #a6adc8; font-family: monospace; }
    }

    .copy-btn {
      background: rgba($primary, 0.1);
      border: 1px solid rgba($primary, 0.2);
      color: $primary;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      font-weight: 600;
      &:hover { background: $primary; color: white; }
    }

    pre { margin: 0; padding: 1.5rem; font-size: 0.85rem; }
  }
</style>