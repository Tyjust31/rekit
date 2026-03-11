<script lang="ts">
    import calendarize from './calendarize.js';
    import Arrow from './arrow.svelte';

    // --- LOGIQUE (Inchangée) ---
    let tasks = $state([
        { id: 1, x: ['2025-01-14', '2025-01-22'], y: 'Task8', name: 'kelly', status: '1' },
        { id: 2, x: ['2025-01-16', '2025-01-24'], y: 'Task8', name: 'kelly', status: '1' },
        { id: 3, x: ['2025-01-01', '2025-01-07'], y: 'Task9', name: 'leila', status: '33' },
        { id: 4, x: ['2024-12-25', '2025-01-06'], y: 'Task1', name: 'succes', status: '1' }
    ]);

    const statusColors: any = $state({
        '1': '#3b82f6', // Bleu moderne
        '2': '#f59e0b', // Orange
        '33': '#10b981' // Vert
    });

    let isModalOpen = $state(false);
    let selectedTask: any = $state(null);
    let selectedDate = $state(null);

    let {
        year = new Date().getFullYear(),
        month = new Date().getMonth(),
        offset = 0,
        today = new Date(),
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    } = $props();

    let today_year = $derived(today.getFullYear());
    let today_day = $derived(today.getDate());
    let today_month = $derived(today && today.getMonth());

    let prev = $state(calendarize(new Date(year, month - 1), offset));
    let current = $state(calendarize(new Date(year, month), offset));
    let next = $state(calendarize(new Date(year, month + 1), offset));

    function toPrev() {
        [current, next] = [prev, current];
        if (--month < 0) { month = 11; year--; }
        prev = calendarize(new Date(year, month - 1), offset);
    }

    function toNext() {
        [prev, current] = [current, next];
        if (++month > 11) { month = 0; year++; }
        next = calendarize(new Date(year, month + 1), offset);
    }

    function isToday(day) {
        return today && today_year === year && today_month === month && today_day === day;
    }

    function getTaskPosition(task, weekStart) {
        const startDate = new Date(task.x[0]);
        const endDate = new Date(task.x[1]);
        const weekEndDate = new Date(weekStart);
        weekEndDate.setDate(weekEndDate.getDate() + 6);

        const start = Math.max(0, Math.floor((startDate - weekStart) / (1000 * 60 * 60 * 24)));
        const end = Math.min(6, Math.floor((endDate - weekStart) / (1000 * 60 * 60 * 24)));

        return { start, width: end - start + 1, isStart: startDate >= weekStart, isEnd: endDate <= weekEndDate };
    }

    function getWeekTasks(weekIndex : number) {
        const weekStart = new Date(year, month, 1 + weekIndex * 7 - current[0].indexOf(1));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        return tasks.filter((task) => {
            const taskStart = new Date(task.x[0]);
            const taskEnd = new Date(task.x[1]);
            return taskStart <= weekEnd && taskEnd >= weekStart;
        }).map((task) => ({ ...task, ...getTaskPosition(task, weekStart) }));
    }

    function openNewTaskModal(day: any) {
        const date = new Date(year, month, day);
        // Correction du décalage horaire pour toISOString
        const dateStr = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        selectedTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
            x: [dateStr, dateStr], y: '', name: '', status: '1'
        };
        selectedDate = day;
        isModalOpen = true;
    }

    function openEditModal(task: any) {
        selectedTask = { ...task };
        selectedDate = null;
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
        selectedTask = null;
        selectedDate = null;
    }

    function saveTaskChanges() {
        if (selectedTask) {
            if (tasks.some((t) => t.id === selectedTask.id)) {
                tasks = tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task));
            } else {
                tasks = [...tasks, selectedTask];
            }
            closeModal();
        }
    }

    function toToday() {
        const currentDate = new Date();
        year = currentDate.getFullYear();
        month = currentDate.getMonth();
        prev = calendarize(new Date(year, month - 1), offset);
        current = calendarize(new Date(year, month), offset);
        next = calendarize(new Date(year, month + 1), offset);
    }

    function goToDate(selectedYear:any, selectedMonth:any) {
        year = selectedYear;
        month = selectedMonth;
        prev = calendarize(new Date(year, month - 1), offset);
        current = calendarize(new Date(year, month), offset);
        next = calendarize(new Date(year, month + 1), offset);
    }

    // --- DRAG & DROP LOGIC ---
    let draggedTask = $state(null);
    let resizingTask = $state(null);
    let startX = $state(0);
    let originalStart = $state(0);
    let originalWidth = $state(0);

    function handleMouseDown(task, e, action: 'drag' | 'resize') {
        e.preventDefault();
        startX = e.clientX;
        originalStart = task.start;
        originalWidth = task.width;
        if (action === 'drag') draggedTask = task;
        else resizingTask = task;
    }

    function handleMouseMove(e) {
        if (!draggedTask && !resizingTask) return;
        const diff = Math.round((e.clientX - startX) / 100); 
        
        if (draggedTask) {
            const newStart = Math.max(0, Math.min(6 - draggedTask.width, originalStart + diff));
            tasks = tasks.map(t => {
                if (t.id === draggedTask.id) {
                    const startDate = new Date(t.x[0]);
                    const endDate = new Date(t.x[1]);
                    const daysDiff = newStart - originalStart;
                    startDate.setDate(startDate.getDate() + daysDiff);
                    endDate.setDate(endDate.getDate() + daysDiff);
                    return { ...t, x: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]] };
                }
                return t;
            });
        }
        if (resizingTask) {
            const newWidth = Math.max(1, Math.min(7 - resizingTask.start, originalWidth + diff));
            tasks = tasks.map(t => {
                if (t.id === resizingTask.id) {
                    const endDate = new Date(t.x[0]);
                    endDate.setDate(endDate.getDate() + newWidth - 1);
                    return { ...t, x: [t.x[0], endDate.toISOString().split('T')[0]] };
                }
                return t;
            });
        }
    }

    function handleMouseUp() {
        draggedTask = null;
        resizingTask = null;
    }

    $effect(() => {
        if (draggedTask || resizingTask) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    });
</script>

<div class="calendar-app">
    <header class="cal-header">
        <div class="left-controls">
            <button class="btn-today" onclick={toToday}>Today</button>
            <input 
                class="month-picker"
                type="month" 
                value={`${year}-${String(month + 1).padStart(2, '0')}`}
                onchange={(e) => {
                    if(!e.target.value) return;
                    const date = new Date(e.target.value);
                    goToDate(date.getFullYear(), date.getMonth());
                }}
            />
        </div>

        <div class="center-nav">
            <Arrow left on:click={toPrev} />
            <h2>{months[month]} {year}</h2>
            <Arrow on:click={toNext} />
        </div>
        
        <div class="right-controls">
            </div>
    </header>  

    <div class="cal-body">
        <div class="day-headers">
            {#each labels as txt, idx (txt)}
                <span class="label-day">{labels[(idx + offset) % 7]}</span>
            {/each}
        </div>

        <div class="grid-container">
            {#each { length: 6 } as w, idxw (idxw)}
                {#if current[idxw]}
                    <div class="week-row">
                        <div class="days-bg">
                            {#each { length: 7 } as d, idxd (idxd)}
                                <div class="day-cell" class:is-today={current[idxw] && isToday(current[idxw][idxd])} class:empty={!current[idxw][idxd]}>
                                    <div class="day-top">
                                        <span class="day-num">{current[idxw] ? current[idxw][idxd] || '' : ''}</span>
                                        {#if current[idxw] && current[idxw][idxd]}
                                            <button class="btn-add-task" onclick={() => openNewTaskModal(current[idxw][idxd])} aria-label="Add task">
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <div class="tasks-layer">
                            {#each getWeekTasks(idxw) as task}
                                <div
                                    class="task-bar"
                                    role="button"
                                    tabindex="0"
                                    style="
                                        grid-column: {task.start + 1} / span {task.width};
                                        background-color: {statusColors[task.status]};
                                        border-radius: {task.isStart ? '6px' : '0'} {task.isEnd ? '6px' : '0'} {task.isEnd ? '6px' : '0'} {task.isStart ? '6px' : '0'};
                                    "
                                    onclick={() => openEditModal(task)}
                                    onmousedown={(e) => handleMouseDown(task, e, 'drag')}
                                >
                                    <span class="task-title">{task.y} - {task.name}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

{#if isModalOpen && selectedTask}
<div class="modal-backdrop" role="button" tabindex="0" onclick={closeModal} onkeydown={(e) => e.key === 'Escape' && closeModal()}>
    <div class="modal-box" role="dialog" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
        <div class="modal-head">
            <h3>{selectedTask.id && tasks.some(t => t.id === selectedTask.id) ? 'Modifier la tâche' : 'Nouvelle tâche'}</h3>
            <button class="btn-close" onclick={closeModal}>✕</button>
        </div>

        <div class="modal-body">
            <div class="form-group">
                <label for="taskName">Nom de la tâche</label>
                <input type="text" id="taskName" bind:value={selectedTask.y} placeholder="Ex: Refonte du site" />
            </div>

            <div class="form-group">
                <label for="assignee">Assigné à</label>
                <input type="text" id="assignee" bind:value={selectedTask.name} placeholder="Nom de la personne" />
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label for="startDate">Début</label>
                    <input type="date" id="startDate" bind:value={selectedTask.x[0]} />
                </div>
                <div class="form-group">
                    <label for="endDate">Fin</label>
                    <input type="date" id="endDate" bind:value={selectedTask.x[1]} />
                </div>
            </div>

            <div class="form-group">
                <label for="status">Statut</label>
                <select id="status" bind:value={selectedTask.status}>
                    <option value="1">À faire</option>
                    <option value="2">En cours</option>
                    <option value="33">Terminé</option>
                </select>
            </div>
        </div>

        <div class="modal-foot">
            <button class="btn-cancel" onclick={closeModal}>Annuler</button>
            <button class="btn-save" onclick={saveTaskChanges}>Enregistrer</button>
        </div>
    </div>
</div>
{/if}

<style>
    /* --- VARIABLES & BASE --- */
    .calendar-app {
        font-family: 'Inter', system-ui, sans-serif;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        max-width: 1200px;
        margin: 0 auto;
        color: #1e293b;
    }

    /* --- HEADER --- */
    .cal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.5rem;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
    }

    .left-controls, .right-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex: 1;
    }

    .center-nav {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex: 2;
        justify-content: center;
    }

    .center-nav h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: #0f172a;
        min-width: 140px;
        text-align: center;
    }

    /* Boutons et Inputs du Header */
    .btn-today {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        color: #334155;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .btn-today:hover { background: #f1f5f9; color: #0f172a; border-color: #94a3b8; }

    .month-picker {
        border: 1px solid #cbd5e1;
        padding: 0.45rem 0.75rem;
        border-radius: 8px;
        color: #334155;
        font-family: inherit;
        cursor: pointer;
        outline: none;
    }
    .month-picker:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

    /* --- CALENDAR GRID --- */
    .day-headers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
    }
    .label-day {
        text-align: center;
        padding: 0.75rem 0;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.05em;
    }

    .grid-container {
        display: flex;
        flex-direction: column;
        background: #f8fafc;
    }

    .week-row {
        position: relative;
        border-bottom: 1px solid #e2e8f0;
        min-height: 120px;
    }
    .week-row:last-child { border-bottom: none; }

    .days-bg {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        position: absolute;
        inset: 0;
    }

    .day-cell {
        border-right: 1px solid #e2e8f0;
        background: #ffffff;
        padding: 0.5rem;
        transition: background-color 0.2s;
    }
    .day-cell:last-child { border-right: none; }
    .day-cell:hover { background: #f8fafc; }
    .day-cell.empty { background: #fcfcfd; }
    .day-cell.is-today { background: #eff6ff; }

    .day-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .day-num {
        font-size: 0.875rem;
        font-weight: 600;
        color: #475569;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    .is-today .day-num {
        background: #2563eb;
        color: white;
    }

    /* Bouton d'ajout au survol de la cellule */
    .btn-add-task {
        background: transparent;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        opacity: 0;
        transition: all 0.2s;
        display: flex;
    }
    .day-cell:hover .btn-add-task { opacity: 1; }
    .btn-add-task:hover { background: #e2e8f0; color: #0f172a; }

    /* --- TASKS OVERLAY --- */
    .tasks-layer {
        position: relative;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        padding: 35px 4px 4px 4px; /* Espace pour les numéros de jour en haut */
        pointer-events: none;
    }

    .task-bar {
        pointer-events: auto;
        padding: 4px 8px;
        margin-bottom: 2px;
        cursor: grab;
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        transition: filter 0.2s, transform 0.1s;
    }
    .task-bar:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .task-bar:active { cursor: grabbing; }

    .task-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* --- MODAL DESIGN --- */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-box {
        background: #ffffff;
        width: 100%;
        max-width: 450px;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
    }
    .modal-head h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    
    .btn-close {
        background: transparent;
        border: none;
        font-size: 1.25rem;
        color: #64748b;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
    }
    .btn-close:hover { background: #f1f5f9; color: #0f172a; }

    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    
    .modal-body label { font-size: 0.85rem; font-weight: 600; color: #475569; }
    .modal-body input, .modal-body select {
        padding: 0.6rem 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        color: #1e293b;
        outline: none;
        transition: border-color 0.2s;
    }
    .modal-body input:focus, .modal-body select:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .modal-foot {
        padding: 1rem 1.5rem;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
    }

    .btn-cancel {
        background: white;
        border: 1px solid #cbd5e1;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-weight: 600;
        color: #475569;
        cursor: pointer;
    }
    .btn-cancel:hover { background: #f1f5f9; }

    .btn-save {
        background: #2563eb;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
    }
    .btn-save:hover { background: #1d4ed8; }
</style>