<script lang="ts">
	import calendarize from './calendarize.js';
	import Arrow from './arrow.svelte';

	let tasks = $state([
		{ id: 1, x: ['2025-01-14', '2025-01-22'], y: 'Task8', name: 'kelly', status: '1' },
		{ id: 2, x: ['2025-01-16', '2025-01-24'], y: 'Task8', name: 'kelly', status: '1' },
		{ id: 3, x: ['2025-01-01', '2025-01-07'], y: 'Task9', name: 'leila', status: '33' },
		{ id: 4, x: ['2024-12-25', '2025-01-06'], y: 'Task1', name: 'succes', status: '1' }
	]);

	const statusColors: any = $state({
		'1': '#FFA500',
		'2': '#FFD700',
		'33': '#90EE90'
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
		if (--month < 0) {
			month = 11;
			year--;
		}
		prev = calendarize(new Date(year, month - 1), offset);
	}

	function toNext() {
		[prev, current] = [current, next];
		if (++month > 11) {
			month = 0;
			year++;
		}
		next = calendarize(new Date(year, month + 1), offset);
	}

	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}

	// Fonction pour calculer la position et la durée d'une tâche dans la semaine
	function getTaskPosition(task, weekStart) {
		const startDate = new Date(task.x[0]);
		const endDate = new Date(task.x[1]);
		const weekEndDate = new Date(weekStart);
		weekEndDate.setDate(weekEndDate.getDate() + 6);

		const start = Math.max(0, Math.floor((startDate - weekStart) / (1000 * 60 * 60 * 24)));

		const end = Math.min(6, Math.floor((endDate - weekStart) / (1000 * 60 * 60 * 24)));

		return {
			start,
			width: end - start + 1,
			isStart: startDate >= weekStart,
			isEnd: endDate <= weekEndDate
		};
	}

	function getWeekTasks(weekIndex : number) {
		const weekStart = new Date(year, month, 1 + weekIndex * 7 - current[0].indexOf(1));
		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekEnd.getDate() + 6);

		return tasks
			.filter((task) => {
				const taskStart = new Date(task.x[0]);
				const taskEnd = new Date(task.x[1]);
				return taskStart <= weekEnd && taskEnd >= weekStart;
			})
			.map((task) => ({
				...task,
				...getTaskPosition(task, weekStart)
			}));
	}

	// Ouverture de la modal pour ajouter une nouvelle tâche
	function openNewTaskModal(day: any) {
		const date = new Date(year, month, day);
		const dateStr = date.toISOString().split('T')[0];
		selectedTask = {
			id: Math.max(...tasks.map((t) => t.id)) + 1,
			x: [dateStr, dateStr],
			y: '',
			name: '',
			status: '1'
		};
		selectedDate = day;
		isModalOpen = true;
	}

	// Ouverture de la modal pour modifier une tâche existante
	function openEditModal(task: any) {
		selectedTask = { ...task };
		selectedDate = null;
		isModalOpen = true;
	}

	// Fermeture de la modal
	function closeModal() {
		isModalOpen = false;
		selectedTask = null;
		selectedDate = null;
	}

	// Sauvegarde des changements apportés à une tâche
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
        
        if (action === 'drag') {
            draggedTask = task;
        } else {
            resizingTask = task;
        }
    }

    function handleMouseMove(e) {
        if (!draggedTask && !resizingTask) return;
        
        const diff = Math.round((e.clientX - startX) / 100); // 100px per day
        
        if (draggedTask) {
            const newStart = Math.max(0, Math.min(6 - draggedTask.width, originalStart + diff));
            tasks = tasks.map(t => {
                if (t.id === draggedTask.id) {
                    const startDate = new Date(t.x[0]);
                    const endDate = new Date(t.x[1]);
                    const daysDiff = newStart - originalStart;
                    
                    startDate.setDate(startDate.getDate() + daysDiff);
                    endDate.setDate(endDate.getDate() + daysDiff);
                    
                    return {
                        ...t,
                        x: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
                    };
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
                    
                    return {
                        ...t,
                        x: [t.x[0], endDate.toISOString().split('T')[0]]
                    };
                }
                return t;
            });
        }
    }

    function handleMouseUp() {
        draggedTask = null;
        resizingTask = null;
    }

    // Add event listeners when component mounts
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

<header>
    <button class="today-btn" onclick={toToday}>
        <i class="calendar-icon"></i>
        Today
      </button>
  <br>
	  <span class="arrow">
    <Arrow left on:click={toPrev} /><br>

    <h4>{months[month]} {year}</h4>

    <Arrow on:click={toNext} />  <br>
</span>
    <input 
      type="month" 
      value={`${year}-${String(month + 1).padStart(2, '0')}-01`}
      onchange={(e) => {
        const date = new Date(e.target.value);
        goToDate(date.getFullYear(), date.getMonth());
      }}
    />
  </header>  

  {#if isModalOpen && selectedTask}
  <div class="modal-overlay" role="button" onclick={closeModal}>
	  <div class="modal" role="button" onclick={(e) => e.stopPropagation()}>
		  <div class="modal-header">
			  <h3>{selectedTask.id ? 'Modifier la tâche' : 'Nouvelle tâche'}</h3>
			  <button class="close-btn" onclick={closeModal}>×</button>
		  </div>

		  <div class="form-group">
			  <label for="taskName">Nom de la tâche</label>
			  <input type="text" id="taskName" bind:value={selectedTask.y} />
		  </div>

		  <div class="form-group">
			  <label for="assignee">Assigné à</label>
			  <input type="text" id="assignee" bind:value={selectedTask.name} />
		  </div>

		  <div class="form-group">
			  <label for="status">Status</label>
			  <select id="status" bind:value={selectedTask.status}>
				  <option value="1">À faire</option>
				  <option value="2">En cours</option>
				  <option value="33">Terminé</option>
			  </select>
		  </div>

		  <div class="form-group">
			  <label for="startDate">Date de début</label>
			  <input type="date" id="startDate" bind:value={selectedTask.x[0]} />
		  </div>

		  <div class="form-group">
			  <label for="endDate">Date de fin</label>
			  <input type="date" id="endDate" bind:value={selectedTask.x[1]} />
		  </div>

		  <div class="button-group">
			  <button class="cancel-button" onclick={closeModal}>Annuler</button>
			  <button class="save-button" onclick={saveTaskChanges}>Enregistrer</button>
		  </div>
	  </div>
  </div>
{/if}



<div class="month">
	<div class="days">
		{#each labels as txt, idx (txt)}
			<span class="label">{labels[(idx + offset) % 7]}</span>
		{/each}
	</div>


	{#each { length: 6 } as w, idxw (idxw)}
		{#if current[idxw]}
			<div class="week-row">
				{#each { length: 7 } as d, idxd (idxd)}
					<span class="date" class:today={current[idxw] && isToday(current[idxw][idxd])}>
						<div class="date-header">
							<span>{current[idxw] ? current[idxw][idxd] || '' : ''}</span>
							{#if current[idxw] && current[idxw][idxd]}
								<button class="add-task-btn" onclick={() => openNewTaskModal(current[idxw][idxd])}>
									+
								</button>
							{/if}
						</div>
					</span>
				{/each}

				<div class="week-tasks">
					{#each getWeekTasks(idxw ) as task}
						<div
							class="task-bar"
							role="button"
							tabindex="0"
							style="
                                grid-column: {task.start + 1} / span {task.width};
                                background-color: {statusColors[task.status]};
                                border-radius: {task.isStart ? '4px' : '0'} {task.isEnd
								? '4px'
								: '0'} {task.isEnd ? '4px' : '0'} {task.isStart ? '4px' : '0'};
                            "
							onclick={() => openEditModal(task)}
						>
							<div class="task-content">
								{task.y} - {task.name}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>


<style>
	 input {
  background-color: #ffffff;
  border: none;
  padding: 0.2rem 0.1rem;
  font-size: 1rem;
  width: 13em;
  border-radius: 0.6rem;
  box-shadow: 0 0.1rem #dfd9d9;
  cursor: pointer;
}

 input:focus {
  outline-color: lightcoral;
}
.arrow{
	margin: 0 50px 0 50px;
	display: flex;
}
h4{
	font-weight: 300;
	margin: 0 30px 0 30px;
}
	/*  header {
		display: flex;
		margin: 1rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
		background-color: #a9bceb;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}*/
	.month {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px;
	}

	.label {
		text-align: center;
		font-weight: bold;
		color: #666;
		padding: 4px;
		flex: 1;
       
	}
	.days {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px;
        color: #666;
        display: flex;
		flex-direction: row;
	}
	.week-row {
		position: relative;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
		min-height: 100px;
	}

	.date {
		position: relative;
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #eee;
		background: white;
		min-height: 100px;
	}

	.week-tasks {
		position: absolute;
		top: 40px;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
		padding: 4px;
	}

	.task-bar {
		background: #ffa500;
		padding: 4px 8px;
		margin: 2px 0;
		border-radius: 50px;
		cursor: pointer;
		font-size: 0.9em;
		color: white;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-height: 24px;
	}

	.task-bar:hover {
		opacity: 0.9;
	}

	.task-content {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
    .today-btn {
		background-color: #ffffff;
  border: none;
  padding: 0.2rem 0.1rem;
  font-size: 1rem;
  width: 13em;
  border-radius: 0.6rem;
  box-shadow: 0 0.1rem #dfd9d9;
  cursor: pointer;
}

.today-btn:hover {
  background-color: #f5f5f5;
}
.today {
	background-color: #f0f9ff;
        border-radius: 4px; /* Pour arrondir les angles si nécessaire */
    }
	
.calendar-icon {
  width: 16px;
  height: 16px;
  /* Ajoutez ici l'icône de votre choix en utilisant background-image ou une police d'icônes */
}

header input[type="date"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 1rem;
}

.add-task-btn {
  
    gap: 0.5rem;
    background: #E7E9E7;
    color: rgb(130, 130, 130);
    padding: 0.1rem 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s;
    border: none;
  }
 
  .add-task-btn:hover {
    background: #2563eb;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.5rem;
  }
	/* Le reste des styles reste le même que dans votre code original */
</style>
