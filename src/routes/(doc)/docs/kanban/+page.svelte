<script>
    import { onMount } from "svelte";
    import "prismjs";
    import "prismjs/themes/prism.css";  // Inclure le thème de PrismJS
  



 // Code à afficher dans le bloc de code
 const code =$state( `
<script>
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
  ---script----
  


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



  <style>
    .kanban {
      display: flex;
      gap: 1rem;
      margin: 2rem;
    }
    .column {
      flex: 1;
      background: #f3f4f6;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    .task {
      background: #fff;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      border-radius: 5px;
      cursor: grab;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .task:hover {
      background: #e5e7eb;
    }
  </style>
  
 

  `);
  

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




    let copied = $state(false);
  
    function copyCode() {
      navigator.clipboard.writeText(code).then(() => {
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 2000);
      });
    }
    function copyCode2() {
      navigator.clipboard.writeText(code2).then(() => {
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
       copy
      {:else}
      copy code
      {/if}
    </button>
    <br>
    if you use a database supabase exemple
<br>

    <div class="code-block">
        <pre><code class="language-javascript">{code2}</code></pre>
      </div>
      
      <button class="copy-button" onclick={copyCode2}>
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
  