<script lang="ts">
  import { onMount } from "svelte";
  import "prismjs";
  import "prismjs/themes/prism-tomorrow.css"; 

  let copiedId = $state("");

  // --- CONTENU COMPLET DES BLOCS DE CODE ---

  let code = `<script>
  import Calendar from './Calendar.svelte';
<\/script>

<main class="app-viewport">
  <Calendar />
</main>

<style>
  .app-viewport {
    padding: 2rem;
    min-height: 100vh;
    background: #f8fafc;
  }
</style>`;

  let codea = `<script>
  let { left = false, onclick } = $props();
<\/script>

<button class="nav-arrow" class:left {onclick} aria-label="Navigation">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>

<style>
  .nav-arrow {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    cursor: pointer;
    color: #64748b;
    display: grid;
    place-items: center;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .nav-arrow:hover { 
    background: #f8fafc; 
    color: #2563eb;
    border-color: #bfdbfe;
  }
  .left { transform: rotate(180deg); }
</style>`;

  let codeb = `<script lang="ts">
  import calendarize from './calendarize.js';
  import Arrow from './Arrow.svelte';

  // State
  let year = $state(new Date().getFullYear());
  let month = $state(new Date().getMonth());
  let tasks = $state([
    { id: 1, x: ['2026-03-10', '2026-03-15'], y: 'Design UI', status: '1' },
    { id: 2, x: ['2026-03-12', '2026-03-20'], y: 'Dev Backend', status: '2' }
  ]);

  // Derived logic
  let current = $derived(calendarize(new Date(year, month)));

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  function toNext() { if (++month > 11) { month = 0; year++; } }
  function toPrev() { if (--month < 0) { month = 11; year--; } }

  function getWeekTasks(weekDays, weekIndex) {
    const firstDay = new Date(year, month, 1).getDay();
    const weekStart = new Date(year, month, 1 + (weekIndex * 7) - firstDay);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return tasks.filter(t => {
      const ts = new Date(t.x[0]);
      const te = new Date(t.x[1]);
      return ts <= weekEnd && te >= weekStart;
    }).map(t => {
      const ts = new Date(t.x[0]);
      const te = new Date(t.x[1]);
      const start = Math.max(0, Math.floor((ts - weekStart) / 86400000));
      const end = Math.min(6, Math.floor((te - weekStart) / 86400000));
      return { ...t, start: start + 1, span: end - start + 1 };
    });
  }
<\/script>

<div class="calendar">
  <header>
    <Arrow left onclick={toPrev} />
    <h2>{months[month]} {year}</h2>
    <Arrow onclick={toNext} />
  </header>

  <div class="grid">
    {#each current as week, i}
      <div class="row">
        {#each week as day}
          <div class="cell" class:empty={!day}>{day || ''}</div>
        {/each}
        <div class="layers">
          {#each getWeekTasks(week, i) as task}
            <div class="task" style="grid-column: {task.start} / span {task.span}">
              {task.y}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar { background: white; border-radius: 12px; border: 1px solid #eee; overflow: hidden; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 1rem; }
  .grid { display: flex; flex-direction: column; }
  .row { display: grid; grid-template-columns: repeat(7, 1fr); position: relative; border-top: 1px solid #eee; }
  .cell { height: 100px; padding: 0.5rem; color: #94a3b8; border-right: 1px solid #eee; }
  .layers { position: absolute; top: 35px; left: 0; right: 0; display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; pointer-events: none; }
  .task { pointer-events: auto; background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; margin: 0 4px; }
</style>`;

  let codec = `export default function (target, offset) {
  let i = 0, j = 0, week, out = [], date = new Date(target || new Date());
  let year = date.getFullYear(), month = date.getMonth();
  
  // Premier jour du mois
  let first = new Date(year, month, 1 - (offset | 0)).getDay();
  // Nombre de jours dans le mois
  let days = new Date(year, month + 1, 0).getDate();

  while (i < days) {
    for (j = 0, week = Array(7); j < 7;) {
      while (j < first) week[j++] = 0;
      week[j++] = ++i > days ? 0 : i;
      first = 0;
    }
    out.push(week);
  }
  return out;
}`;

  function copyCode(content, id) {
    navigator.clipboard.writeText(content).then(() => {
      copiedId = id;
      setTimeout(() => (copiedId = ""), 2000);
    });
  }

  onMount(() => {
    window.Prism.highlightAll();
  });
</script>

<div class="doc-wrapper">
  <header class="main-header">
    <div class="header-left">
      <div class="badge">Svelte 5 Runes</div>
      <h1>Calendar Engine v2</h1>
      <p>Système de planification réactif. Copiez les composants pour votre projet.</p>
    </div>
    
    <div class="header-right">
      <a href="/calendardd" class="visualize-btn">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Visualiser /calendardd
      </a>
    </div>
  </header>

  <div class="grid-layout">
    <section class="code-card" id="page">
      <div class="card-header">
        <div class="file-info">
          <span class="dot red"></span>
          <span class="file-name">page.svelte</span>
        </div>
        <button class="copy-btn" class:success={copiedId === 'page'} onclick={() => copyCode(code, 'page')}>
          {copiedId === 'page' ? '✓ Copié' : 'Copier'}
        </button>
      </div>
      <div class="prism-container">
        <pre><code class="language-javascript">{code}</code></pre>
      </div>
    </section>

    <section class="code-card" id="arrow">
      <div class="card-header">
        <div class="file-info">
          <span class="dot yellow"></span>
          <span class="file-name">Arrow.svelte</span>
        </div>
        <button class="copy-btn" class:success={copiedId === 'arrow'} onclick={() => copyCode(codea, 'arrow')}>
          {copiedId === 'arrow' ? '✓ Copié' : 'Copier'}
        </button>
      </div>
      <div class="prism-container">
        <pre><code class="language-javascript">{codea}</code></pre>
      </div>
    </section>

    <section class="code-card wide" id="calendar">
      <div class="card-header">
        <div class="file-info">
          <span class="dot green"></span>
          <span class="file-name">Calendar.svelte</span>
        </div>
        <button class="copy-btn" class:success={copiedId === 'calendar'} onclick={() => copyCode(codeb, 'calendar')}>
          {copiedId === 'calendar' ? '✓ Copié' : 'Copier'}
        </button>
      </div>
      <div class="prism-container">
        <pre><code class="language-javascript">{codeb}</code></pre>
      </div>
    </section>

    <section class="code-card" id="calendarize">
      <div class="card-header">
        <div class="file-info">
          <span class="dot blue"></span>
          <span class="file-name">calendarize.js</span>
        </div>
        <button class="copy-btn" class:success={copiedId === 'calendarize'} onclick={() => copyCode(codec, 'calendarize')}>
          {copiedId === 'calendarize' ? '✓ Copié' : 'Copier'}
        </button>
      </div>
      <div class="prism-container">
        <pre><code class="language-javascript">{codec}</code></pre>
      </div>
    </section>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
    margin: 0;
    font-family: 'Inter', -apple-system, sans-serif;
    color: #1e293b;
  }

  .doc-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background: #e0e7ff;
    color: #4338ca;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  h1 { font-size: 2.2rem; margin: 0; letter-spacing: -0.02em; font-weight: 800; }
  p { color: #64748b; font-size: 1.05rem; margin-top: 0.4rem; }

  .visualize-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background-color: #2563eb;
    color: white;
    text-decoration: none;
    padding: 0.7rem 1.4rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
  }

  .visualize-btn:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .wide { grid-column: span 2; }

  .code-card {
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .card-header {
    padding: 0.75rem 1.25rem;
    background: #fcfcfd;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .file-info { display: flex; align-items: center; gap: 0.6rem; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }
  .blue { background: #3b82f6; }
  .file-name { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; font-weight: 600; color: #475569; }

  .copy-btn {
    background: #1e293b;
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover { background: #334155; }
  .copy-btn.success { background: #10b981; }

  .prism-container {
    max-height: 450px;
    overflow: auto;
    background: #282c34;
  }

  pre { margin: 0 !important; padding: 1.25rem !important; font-size: 0.85rem !important; }

  @media (max-width: 768px) {
    .main-header { flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; }
    .grid-layout { grid-template-columns: 1fr; }
    .wide { grid-column: span 1; }
  }
</style>