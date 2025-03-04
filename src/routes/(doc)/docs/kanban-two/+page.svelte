<script lang="ts">
    import { onMount } from "svelte";
    import "prismjs";
    import "prismjs/themes/prism.css";  // Inclure le thème de PrismJS
    let vladimir: string = $state('`form-${status}');

  let code2 = `   
  try {
				const response = await fetch('?/updateStatus', {
					// Assurez-vous que l'URL est correcte
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: new URLSearchParams({
						id,
						title,
						statu:status,

					}).toString()
				});

				if (!response.ok) {
					throw new Error('error updating task');
				}

				const result = await response.json();
				console.log('Mise à jour réussie :', result);
			} catch (error) {
				console.error('Erreur :', error);
			} finally {
				draggedTaskId = null; // reset task id after drop
			}
		}
	}
  
  
  `


    let code = `
     -----script lang="ts"---
	let tasks = $state([
		{ id: 1, title: 'task 1', status: 'todo' },
		{ id: 2, title: 'task 2', status: 'in-progress' },
		{ id: 3, title: 'task 3 ', status: 'done' }
	]);

	const statuses = $state(['todo', 'in-progress', 'done']);
	let draggedTaskId = $state(null);

	function startDrag(taskId: any) {
		draggedTaskId = taskId;
		console.log(draggedTaskId);
	}

	function allowDrop(event: any) {
		event.preventDefault(); // Empêcher le comportement par défaut pour autoriser le drop
	}

	function dropTask(status: any) {
		if (draggedTaskId !== null) {
			const task = tasks.find((t) => t.id === draggedTaskId);

			if (task) {
				task.status = status; // Met à jour le statut de la tâche
				console.log(status);
				draggedTaskId = null; // Réinitialise l'id de la tâche après le drop
			}
		}
	}

function getFormId(status: any) {
  return ${vladimir} // 
}

---script----

<div class="kanban-board">
	{#each statuses as status}
		<div
			class="column"
			ondragover={(event) => event.preventDefault()}
			ondrop={() => dropTask(status)}
			role="list"
		>
			<h3>{status.toUpperCase()}</h3>
			{#each tasks.filter((task) => task.status === status) as task}
				<div class="task" draggable="true" ondragstart={() => startDrag(task.id)} role="listitem">
					{task.title}
				</div>
			{/each}
		</div>
	{/each}{getFormId(tasks[0].status)}
</div>

<!-- Formulaire dynamique en fonction du statut -->
<div class="form-container">
	{#if tasks.length > 0}
		<h3>Formulaire pour {getFormId(tasks[0].status)} {getFormId(tasks[0].title)}</h3>
		---- {tasks[0].title}
		<form id={getFormId(tasks[0].status)}>
			<label for="taskTitle">Titre de la tâche :</label>
			<input type="text" id="taskTitle" value={tasks[2].title} />
			<input type="text" id="taskTitle" value={tasks[2].status} />
			<input type="text" id="taskTitle" value={tasks[2].id} />

			<button type="submit">Sauvegarder</button>
		</form>
	{/if}
</div>

<style>
	.kanban-board {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.column {
		width: 30%;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 4px;
		min-height: 200px;
	}

	.task {
		margin: 10px 0;
		padding: 10px;
		background-color: #f9f9f9;
		border-radius: 4px;
		cursor: pointer;
	}

	.task:hover {
		background-color: #f0f0f0;
	}

	.form-container {
		margin-top: 20px;
	}
</style>

    `;
  
    let copied = $state(false);
  
    function copyCode() {
      navigator.clipboard.writeText(code2).then(() => {
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 2000);
      });
    }
    function copyCode2() {
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
  

  <div class="kanban">
    {#each Object.keys(tasks) as column}
      <div
        class="column"
        ondragover={allowDrop}
        ondrop={(e) => handleDrop(e, column)}
      >
        <h3>{column}</h3>
        <div>
          {#each tasks[column] as task (task.id)}
            <div
              class="task"
              draggable="true"
              ondragstart={(e) =>
                e.dataTransfer.setData(
                  "task",
                  JSON.stringify({ task, from: column })
                )
              }
            >
              {task.text}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div class="code-container">
    <!-- Bouton de copie -->
    <button class="copy-button" onclick={copyCode}>
      {#if copied}
        Copy!
      {:else}
        Copy code
      {/if}
    </button>
  

    <p>if you use a database supabase exemple</p>
    <div class="code-block">
      <pre><code class="language-javascript">{code2}</code></pre>
    </div>
 
    <button class="copy-button" onclick={copyCode2}>
      {#if copied}
        Copy!
      {:else}
        Copy code
      {/if}
    </button>
    <!-- Bloc de code avec syntax highlighting -->
    <div class="code-block">
      <pre><code class="language-javascript">{code}</code></pre>
    </div>
  </div>
  

