<script lang="ts">
  import { onMount } from "svelte";
  import "prismjs";
  import "prismjs/themes/prism-tomorrow.css"; 

  let copiedId = $state("");

  // ==========================================
  // 1. VARIABLES DE CODE
  // ==========================================

  const codeKanban = `<script>
  // Liste des colonnes et des tâches
  let tasks = $state({
    "To Do": [
      { id: 1, text: "Make a coffee" },
      { id: 2, text: "Review the code" },
    ],
    "In Progress": [
      { id: 3, text: "Create a Kanban" },
    ],
    "In Review": [],
    "Done": [
      { id: 4, text: "Plan the day" },
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
<\/script>

<div class="kanban">
  {#each Object.keys(tasks) as column}
    <div class="column" ondragover={allowDrop} ondrop={(e) => handleDrop(e, column)}>
      <h3>{column}</h3>
      <div>
        {#each tasks[column] as task (task.id)}
          <div class="task" draggable="true" 
               ondragstart={(e) => e.dataTransfer.setData("task", JSON.stringify({ task, from: column }))}>
            {task.text}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .kanban { display: flex; gap: 1rem; margin: 2rem; }
  .column { flex: 1; background: #f3f4f6; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
  .task { background: #fff; padding: 0.5rem 1rem; margin: 0.5rem 0; border-radius: 5px; cursor: grab; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
  .task:hover { background: #e5e7eb; }
</style>`;

  const codeSupabase = `try {
  const response = await fetch('?/updateStatus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ id, title, statu: status }).toString()
  });

  if (!response.ok) {
    throw new Error('error updating task');
  }

  const result = await response.json();
  console.log('Mise à jour réussie :', result);
} catch (error) {
  console.error('Erreur :', error);
} finally {
  draggedTaskId = null;
}`;

  // ==========================================
  // 2. LOGIQUE DÉMO
  // ==========================================
  let tasksDemo = $state({
    "To Do": [{ id: 1, text: "☕ Coffee break" }, { id: 2, text: "🔍 Code Review" }],
    "In Progress": [{ id: 3, text: "🏗️ Building UI" }],
    "In Review": [],
    "Done": [{ id: 4, text: "✅ Task finished" }],
  });

  function moveTask(task, from, to) {
    tasksDemo[from] = tasksDemo[from].filter((t) => t.id !== task.id);
    tasksDemo[to] = [...tasksDemo[to], task];
  }

  function handleDrop(event, toColumn) {
    event.preventDefault();
    const data = event.dataTransfer.getData("task");
    if (!data) return;
    const { task, from } = JSON.parse(data);
    moveTask(task, from, toColumn);
  }

  function copyCode(content: string, id: string) {
    navigator.clipboard.writeText(content).then(() => {
      copiedId = id;
      setTimeout(() => (copiedId = ""), 2000);
    });
  }

  onMount(() => { window.Prism.highlightAll(); });
</script>

<div class="dark-layout">
  <div class="container">
    <header class="main-header">
      <div class="badge">Svelte 5 Runes</div>
      <h1>Kanban Engine <span class="text-gradient">v2</span></h1>
      <p>Système de drag & drop haute performance. Prêt pour Supabase.</p>
    </header>

    <section class="preview-card">
      <div class="card-header">
        <span class="dot"></span>
        <span>Interactive Preview</span>
      </div>
      <div class="kanban-grid">
        {#each Object.keys(tasksDemo) as column}
          <div class="column" ondragover={(e) => e.preventDefault()} ondrop={(e) => handleDrop(e, column)}>
            <div class="column-header">
              <h3>{column}</h3>
              <span class="count">{tasksDemo[column].length}</span>
            </div>
            <div class="task-container">
              {#each tasksDemo[column] as task (task.id)}
                <div class="task-card" draggable="true" 
                     ondragstart={(e) => e.dataTransfer.setData("task", JSON.stringify({ task, from: column }))}>
                  {task.text}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <div class="code-grid">
      <section class="code-card">
        <div class="card-header">
          <span class="file-name">Kanban.svelte</span>
          <button class="copy-btn" class:success={copiedId === 'kb'} onclick={() => copyCode(codeKanban, 'kb')}>
            {copiedId === 'kb' ? '✓ Copied' : 'Copy Code'}
          </button>
        </div>
        <div class="prism-wrap">
          <pre><code class="language-javascript">{codeKanban}</code></pre>
        </div>
      </section>

      <section class="code-card">
        <div class="card-header">
          <span class="file-name">database-sync.js</span>
          <button class="copy-btn" class:success={copiedId === 'sb'} onclick={() => copyCode(codeSupabase, 'sb')}>
            {copiedId === 'sb' ? '✓ Copied' : 'Copy Code'}
          </button>
        </div>
        <div class="prism-wrap">
          <pre><code class="language-javascript">{codeSupabase}</code></pre>
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a; 
    margin: 0;
    font-family: 'Inter', system-ui, sans-serif;
    color: #f1f5f9;
  }

  .dark-layout { padding: 4rem 1rem; }
  .container { max-width: 1100px; margin: 0 auto; }

  /* HEADER */
  .main-header { margin-bottom: 3rem; text-align: left; }
  
  /* Badge orange pour matcher avec le titre */
  .badge { 
    display: inline-block; background: #1e293b; color: #f97316; 
    padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem;
    border: 1px solid #334155;
  }
  
  h1 { font-size: 2.5rem; margin: 0; font-weight: 800; }
  
  /* LE FAMEUX DEGRADÉ ORANGE (Feu/Soleil) */
  .text-gradient { 
    background: linear-gradient(to right, #f97316, #fbbf24); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
  }
  
  p { color: #94a3b8; font-size: 1.1rem; }

  /* PREVIEW CARD */
  .preview-card { 
    background: #1e293b; border-radius: 16px; border: 1px solid #334155; 
    overflow: hidden; margin-bottom: 3rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
  }
  .card-header { 
    background: #0f172a; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.8rem; color: #94a3b8; border-bottom: 1px solid #334155;
  }
  
  /* Le point d'indication en orange aussi */
  .dot { width: 8px; height: 8px; background: #f97316; border-radius: 50%; box-shadow: 0 0 8px #f97316; }

  /* KANBAN GRID DÉMO */
  .kanban-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1.5rem; }
  .column { background: #0f172a; border-radius: 12px; padding: 1rem; min-height: 250px; border: 1px solid #334155; }
  .column-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .column-header h3 { font-size: 0.9rem; margin: 0; color: #f1f5f9; }
  .count { font-size: 0.7rem; background: #334155; padding: 2px 8px; border-radius: 10px; }
  .task-card { 
    background: #1e293b; border: 1px solid #334155; padding: 0.75rem; border-radius: 8px; 
    margin-bottom: 0.75rem; cursor: grab; font-size: 0.85rem; color: #cbd5e1;
    transition: transform 0.2s, border-color 0.2s;
  }
  /* Liseré orange au survol des tâches */
  .task-card:hover { border-color: #f97316; transform: translateY(-2px); }

  /* CODE SECTIONS */
  .code-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
  .code-card { background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }
  .file-name { font-family: monospace; font-size: 0.85rem; color: #f97316; }
  
  .copy-btn { 
    background: #f97316; color: white; border: none; padding: 0.4rem 0.8rem; 
    border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer;
    transition: background-color 0.2s;
  }
  .copy-btn:hover { background: #ea580c; }
  .copy-btn.success { background: #10b981; }
  
  .prism-wrap { max-height: 400px; overflow: auto; background: #0f172a; }
  pre { margin: 0 !important; padding: 1.25rem !important; font-size: 0.85rem !important; }

  @media (max-width: 768px) {
    .kanban-grid { grid-template-columns: 1fr; }
  }
</style>