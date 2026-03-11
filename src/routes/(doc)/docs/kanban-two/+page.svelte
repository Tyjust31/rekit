<script lang="ts">
  import { onMount } from "svelte";
  import "prismjs";
  import "prismjs/themes/prism-tomorrow.css"; 

  let copiedId = $state("");
  let vladimir = '`form-${status}`';

  // ==========================================
  // 1. VARIABLES DE CODE (CONTENU À COPIER)
  // ==========================================

  const codeSupabase = `try {
  const response = await fetch('?/updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      id,
      title,
      statu: status,
    }).toString()
  });

  if (!response.ok) throw new Error('Error updating task');
  const result = await response.json();
  console.log('Succès :', result);
} catch (error) {
  console.error('Erreur :', error);
} finally {
  draggedTaskId = null;
}`;

  const codeKanbanFull = `<script lang="ts">
  let tasks = $state([
    { id: 1, title: 'Faire un café', status: 'todo' },
    { id: 2, title: 'Revoir le code', status: 'in-progress' },
    { id: 3, title: 'Planifier la semaine', status: 'done' }
  ]);

  const statuses = $state(['todo', 'in-progress', 'done']);
  let draggedTaskId = $state(null);

  function startDrag(taskId: any) { 
    draggedTaskId = taskId; 
  }

  function allowDrop(event: any) {
    event.preventDefault();
  }

  function dropTask(status: any) {
    if (draggedTaskId !== null) {
      const task = tasks.find((t) => t.id === draggedTaskId);
      if (task) {
        task.status = status;
        draggedTaskId = null;
      }
    }
  }

  function getFormId(status: any) {
    return ${vladimir}; 
  }
<\/script>

<div class="kanban-board">
  {#each statuses as status}
    <div
      class="kanban-column"
      ondragover={allowDrop}
      ondrop={() => dropTask(status)}
      role="list"
    >
      <div class="column-header">
        <h3>{status.toUpperCase()}</h3>
        <span class="task-count">
          {tasks.filter((t) => t.status === status).length}
        </span>
      </div>
      
      <div class="task-list">
        {#each tasks.filter((task) => task.status === status) as task}
          <div 
            class="kanban-task" 
            draggable="true" 
            ondragstart={() => startDrag(task.id)} 
            role="listitem"
          >
            {task.title}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<div class="form-container">
  {#if tasks.length > 0}
    <h3>Édition : {tasks[0].title}</h3>
    <form id={getFormId(tasks[0].status)} class="modern-form">
      <div class="input-group">
        <label for="taskTitle">Titre de la tâche</label>
        <input type="text" id="taskTitle" value={tasks[0].title} />
      </div>
      <div class="input-group">
        <label for="taskStatus">Statut</label>
        <input type="text" id="taskStatus" value={tasks[0].status} disabled />
      </div>
      <button type="submit" class="btn-submit">Sauvegarder</button>
    </form>
  {/if}
</div>

<style>
  /* --- DESIGN MODERNE KANBAN --- */
  .kanban-board {
    display: flex;
    gap: 1.5rem;
    margin-top: 20px;
    align-items: flex-start;
  }

  .kanban-column {
    flex: 1;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    border-radius: 12px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
  }

  .column-header h3 {
    margin: 0;
    font-size: 0.9rem;
    color: #475569;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .task-count {
    background: #e2e8f0;
    color: #475569;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .kanban-task {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    cursor: grab;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    color: #1e293b;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .kanban-task:hover {
    border-color: #f97316;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  .kanban-task:active {
    cursor: grabbing;
  }

  /* --- DESIGN DU FORMULAIRE --- */
  .form-container {
    margin-top: 2rem;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
  }
  
  .form-container h3 { margin-top: 0; color: #1e293b; font-size: 1.1rem; }
  
  .modern-form { display: flex; gap: 1rem; align-items: flex-end; }
  
  .input-group { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
  .input-group label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
  .input-group input { padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; }
  .input-group input:focus { border-color: #f97316; }
  
  .btn-submit {
    background: #f97316; color: white; border: none; padding: 0.65rem 1.2rem;
    border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s;
  }
  .btn-submit:hover { background: #ea580c; }
</style>`;

  // ==========================================
  // 2. LOGIQUE DÉMO (LIVE)
  // ==========================================
  let tasksDemo = $state([
    { id: 1, title: '☕ Faire un café', status: 'todo' },
    { id: 2, title: '🔍 Revoir le code', status: 'in-progress' },
    { id: 3, title: '✅ Planifier la journée', status: 'done' }
  ]);

  const statusesDemo = ['todo', 'in-progress', 'done'];
  let draggedTaskIdDemo = $state(null);

  function startDragDemo(taskId) { draggedTaskIdDemo = taskId; }
  function allowDropDemo(event) { event.preventDefault(); }

  function dropTaskDemo(status) {
    if (draggedTaskIdDemo !== null) {
      const task = tasksDemo.find((t) => t.id === draggedTaskIdDemo);
      if (task) {
        task.status = status;
        draggedTaskIdDemo = null;
      }
    }
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
      <p>Système de drag & drop avec formulaires dynamiques. Prêt pour Supabase.</p>
    </header>

    <section class="preview-card">
      <div class="card-header">
        <span class="dot"></span>
        <span>Interactive Preview</span>
      </div>
      
      <div class="demo-wrapper">
        <div class="kanban-board-demo">
          {#each statusesDemo as status}
            <div class="kanban-column-demo" ondragover={allowDropDemo} ondrop={() => dropTaskDemo(status)}>
              
              <div class="column-header-demo">
                <h3>{status.toUpperCase()}</h3>
                <span class="task-count-demo">
                  {tasksDemo.filter((t) => t.status === status).length}
                </span>
              </div>
              
              <div class="task-list-demo">
                {#each tasksDemo.filter((t) => t.status === status) as task}
                  <div class="kanban-task-demo" draggable="true" ondragstart={() => startDragDemo(task.id)}>
                    {task.title}
                  </div>
                {/each}
              </div>

            </div>
          {/each}
        </div>
      </div>
    </section>

    <div class="code-stack">
      
      <section class="code-card">
        <div class="card-header">
          <span class="file-tag">Svelte Component</span>
          <span class="file-name">KanbanBoard.svelte</span>
          <button class="copy-btn" class:success={copiedId === 'kb'} onclick={() => copyCode(codeKanbanFull, 'kb')}>
            {copiedId === 'kb' ? '✓ Copied' : 'Copy code'}
          </button>
        </div>
        <div class="description-bar">Code complet du Kanban : Design moderne, compteurs et formulaire.</div>
        <div class="prism-wrap">
          <pre><code class="language-javascript">{codeKanbanFull}</code></pre>
        </div>
      </section>

      <section class="code-card">
        <div class="card-header">
          <span class="file-tag">Database Sync</span>
          <span class="file-name">supabase-update.js</span>
          <button class="copy-btn" class:success={copiedId === 'sb'} onclick={() => copyCode(codeSupabase, 'sb')}>
            {copiedId === 'sb' ? '✓ Copied' : 'Copy code'}
          </button>
        </div>
        <div class="description-bar">Exemple d'intégration avec Supabase via Fetch.</div>
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
  .container { max-width: 1000px; margin: 0 auto; }

  /* HEADER */
  .main-header { margin-bottom: 3.5rem; }
  .badge { 
    display: inline-block; background: #1e293b; color: #f97316; 
    padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem;
    border: 1px solid #334155;
  }
  h1 { font-size: 2.5rem; margin: 0; font-weight: 800; letter-spacing: -0.025em; }
  .text-gradient { 
    background: linear-gradient(to right, #f97316, #fbbf24); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
  }
  p { color: #94a3b8; font-size: 1.1rem; margin-top: 0.5rem; }

  /* PREVIEW CARD DOCS */
  .preview-card { 
    background: #1e293b; border-radius: 16px; border: 1px solid #334155; 
    overflow: hidden; margin-bottom: 4rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  }
  .card-header { 
    background: #0f172a; padding: 0.8rem 1.25rem; display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.8rem; color: #94a3b8; border-bottom: 1px solid #334155;
  }
  .dot { width: 8px; height: 8px; background: #f97316; border-radius: 50%; box-shadow: 0 0 8px #f97316; }

  /* =========================================================
     STYLES DU KANBAN DEMO (Identiques au code copié) 
     ========================================================= */
  .demo-wrapper { padding: 2rem; background: #ffffff; color: #1e293b; }
  
  .kanban-board-demo { display: flex; gap: 1.5rem; align-items: flex-start; }
  
  .kanban-column-demo { 
    flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; 
    padding: 1rem; border-radius: 12px; min-height: 250px; 
    display: flex; flex-direction: column;
  }
  
  .column-header-demo { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
  .column-header-demo h3 { margin: 0; font-size: 0.9rem; color: #475569; font-weight: 700; letter-spacing: 0.05em; }
  
  /* Le compteur ! */
  .task-count-demo { 
    background: #e2e8f0; color: #475569; font-size: 0.75rem; 
    font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 99px; 
  }
  
  .task-list-demo { display: flex; flex-direction: column; gap: 0.75rem; }
  
  .kanban-task-demo { 
    background-color: #ffffff; padding: 1rem; border-radius: 8px; cursor: grab; 
    border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); 
    color: #1e293b; font-size: 0.9rem; font-weight: 500; transition: all 0.2s ease; 
  }
  /* Liseré orange au hover */
  .kanban-task-demo:hover { border-color: #f97316; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transform: translateY(-2px); }
  .kanban-task-demo:active { cursor: grabbing; }

  /* CODE STACK DOCS */
  .code-stack { display: flex; flex-direction: column; gap: 3rem; }
  .code-card { background: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }
  
  .file-tag { background: #0f172a; color: #f97316; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; margin-right: 10px; }
  .file-name { font-family: monospace; font-size: 0.85rem; color: #94a3b8; flex-grow: 1; }
  
  .description-bar { padding: 0.75rem 1.25rem; font-size: 0.9rem; color: #94a3b8; background: rgba(15, 23, 42, 0.3); border-bottom: 1px solid #334155; }

  .copy-btn { 
    background: #f97316; color: white; border: none; padding: 0.5rem 1rem; 
    border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: background 0.2s;
  }
  .copy-btn:hover { background: #ea580c; }
  .copy-btn.success { background: #10b981; }

  .prism-wrap { max-height: 500px; overflow: auto; background: #0b1120; }
  pre { margin: 0 !important; padding: 1.5rem !important; font-size: 0.9rem !important; }

  @media (max-width: 768px) {
    .kanban-board-demo { flex-direction: column; gap: 1rem; }
    .kanban-column-demo { width: 100%; box-sizing: border-box; }
  }
</style>