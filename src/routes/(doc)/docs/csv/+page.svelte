<script lang="ts">
  import { onMount } from "svelte";
  import Papa from 'papaparse';
  import "prismjs";
  import "prismjs/themes/prism-tomorrow.css";

  // --- ÉTATS SVELTE 5 ---
  let csvData = $state<any[]>([]);
  let error = $state<string | null>(null);
  let loading = $state(false);
  let copied = $state(false);

  const codeSnippet = `
<script lang="ts">
  import Papa from 'papaparse';
  let csvData = $state([]);

  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    Papa.parse(file, {
      header: true,
      complete: (res) => csvData = res.data
    });
  }
<\/script>

<input type="file" accept=".csv" onchange={handleFileUpload} />
  `.trim();

  // --- LOGIQUE ---
  function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    loading = true;
    error = null;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        csvData = result.data;
        loading = false;
      },
      error: (err) => {
        error = "Failed to parse CSV file.";
        loading = false;
      }
    });
  }

  function copyCode() {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }

  onMount(() => { window.Prism.highlightAll(); });
</script>

<div class="csv-doc-container">
  <header class="doc-header">
    <h1>CSV Parser</h1>
    <p>Efficiently transform CSV files into reactive Svelte data arrays.</p>
  </header>

  <section class="demo-card">
    <div class="upload-zone">
      <div class="upload-icon">📁</div>
      <h2>Import CSV File</h2>
      <p>Select a .csv file to see the parser in action</p>
      
      <label class="file-input-label">
        Browse Files
        <input type="file" accept=".csv" onchange={handleFileUpload} />
      </label>

      {#if loading}
        <div class="status loading">Parsing data...</div>
      {/if}
      
      {#if error}
        <div class="status error">⚠️ {error}</div>
      {/if}
    </div>

    {#if csvData.length > 0}
      <div class="table-container">
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
      </div>
    {/if}
  </section>

  <section class="code-explorer">
    <div class="code-card">
      <div class="code-nav">
        <span>csv-parser.svelte</span>
        <button class="copy-btn" onclick={copyCode}>
          {copied ? "✓ Copied" : "Copy code"}
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
  $radius: 12px;

  // --- COLORS ---
  :global(:root) {
    --csv-card-bg: #ffffff;
    --csv-border: #e2e8f0;
    --csv-table-header: #f8fafc;
    --csv-text: #1e293b;
    --csv-row-hover: #f1f5f9;
  }

  :global(.dark-mode) {
    --csv-card-bg: #1e1e2e;
    --csv-border: rgba(255, 255, 255, 0.1);
    --csv-table-header: #11111b;
    --csv-text: #cdd6f4;
    --csv-row-hover: rgba(255, 255, 255, 0.05);
  }

  .csv-doc-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .doc-header {
    margin-bottom: 3rem;
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { color: #64748b; font-size: 1.1rem; }
  }

  // --- DEMO CARD ---
  .demo-card {
    background: var(--csv-card-bg);
    border: 1px solid var(--csv-border);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 3rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .upload-zone {
    padding: 3rem;
    text-align: center;
    border-bottom: 1px solid var(--csv-border);

    .upload-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    h2 { font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--csv-text); }
    p { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }

    .file-input-label {
      display: inline-block;
      background: $primary;
      color: white;
      padding: 10px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover { transform: translateY(-2px); }
      input { display: none; }
    }
  }

  .status {
    margin-top: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    &.loading { color: #3b82f6; }
    &.error { color: #ef4444; }
  }

  // --- TABLE STYLE ---
  .table-container {
    max-height: 400px;
    overflow: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      color: var(--csv-text);

      th {
        position: sticky;
        top: 0;
        background: var(--csv-table-header);
        padding: 12px 16px;
        text-align: left;
        font-weight: 700;
        border-bottom: 1px solid var(--csv-border);
      }

      td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--csv-border);
      }

      tr:hover { background: var(--csv-row-hover); }
    }
  }

  // --- CODE CARD ---
  .code-card {
    background: #1e1e2e;
    border-radius: $radius;
    overflow: hidden;
    border: 1px solid var(--csv-border);

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
      &:hover { background: $primary; color: white; }
    }

    pre { margin: 0; padding: 1.5rem; font-size: 0.85rem; }
  }
</style>