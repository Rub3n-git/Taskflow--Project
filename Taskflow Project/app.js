let tareas = [];

let filtroActivo = "todas";
function cambiarFiltro(filtro, boton) {
    filtroActivo = filtro;
    document.querySelectorAll("#filtros button").forEach(btn => {
        btn.classList.remove("activo");
    });
    boton.classList.add("activo");
    renderizarTareas();
    };
    let textoBusqueda = "";
    // Función para alternar el modo oscuro
    if (localStorage.getItem("modoOscuro") === "true") {
        document.documentElement.classList.add("dark");
        document.getElementById("btn-modo-oscuro").textContent = "☀️";
    }
    function toggleModoOscuro() {
    document.documentElement.classList.toggle("dark");
    const modoOscuro = document.documentElement.classList.contains("dark");
    localStorage.setItem("modoOscuro", modoOscuro);
    document.getElementById("btn-modo-oscuro").textContent = modoOscuro ? "☀️" : "🌙";
}

// Función para renderizar las tareas en la interfaz
    function renderizarTareas() {
    // Lógica para renderizar las tareas
    const tareasPendientes =document.getElementById("pending-tasks");
    const tareasCompletadas = document.getElementById("completed-tasks");

    tareasPendientes.innerHTML = "";
    tareasCompletadas.innerHTML = "";
    
    let tareasFiltradas;
    if (filtroActivo === "pendientes") {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActivo === "completadas") {
        tareasFiltradas = tareas.filter(t => t.completada);
    } else {
        tareasFiltradas = tareas;
    }
    if (textoBusqueda !== "") {
        tareasFiltradas = tareasFiltradas.filter(t => 
            t.titulo.toLowerCase().includes(textoBusqueda)
        );
    }
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.className = "bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 border border-gray-200 px-4 py-3 rounded shadow-sm mb-2 flex justify-between items-center";
        if (tarea.completada) {
            li.classList.add("opacity-60", "line-through");
        }
        li.innerHTML = `
            <span>${tarea.titulo}</span>
            <div class="flex gap-2">
                <button onclick="editarTarea(${tarea.id})" title="Editar tarea"
                class="p-2 bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-900 text-sm">Editar</button>
                <button onclick= "toggleCompletar(${tarea.id})" title="${tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}"
                class="p-2 bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-900 text-sm">
                    ${tarea.completada ? "Desmarcar" : "Completar"}
                </button>
                <button onclick="eliminarTarea(${tarea.id})" tittle="Eliminar tarea"
                class="p-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 text-sm">Eliminar</button>
            </div>
        `;  
        if (tarea.completada) {
            tareasCompletadas.appendChild(li);
        } else {
            tareasPendientes.appendChild(li);

        }
    });
    actualizarEstadisticas();
    }

//Local Storage
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
function cargarTareas() {
    const datos= localStorage.getItem("tareas");
    if (datos !== null) {
        tareas = JSON.parse(datos);
    }
}

    // Función para agregar una nueva tarea
    function agregarTarea(titulo) {
        const tarea = {
            id: Date.now(),
            titulo: titulo,
            completada: false,
            creadaEn: new Date().toLocaleDateString("es-ES")
        };
        tareas.push(tarea);
        renderizarTareas();
        guardarTareas();
    }
    // Función para marcar una tarea como completada o pendiente
    function toggleCompletar(id) {
        const tarea = tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            renderizarTareas();
            guardarTareas();
        }
    }
    // Función para eliminar una tarea
    function eliminarTarea(id) {
        tareas = tareas.filter(t => t.id !== id);
        renderizarTareas();
        guardarTareas();
    }
    // Función para actualizar las estadísticas
    function actualizarEstadisticas() {
        const completadas = tareas.filter(t => t.completada).length;
        const pendientes = tareas.filter(t => !t.completada).length;
        
        document.getElementById("stat-total").textContent = tareas.length;
        document.getElementById("stat-pending").textContent = pendientes;
        document.getElementById("stat-completed").textContent = completadas;
        
    }
    // Función para editar una tarea
    function editarTarea(id) {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return;
        const li = document.querySelector(`[onclick="editarTarea(${id})"]`).closest("li");

        li.innerHTML = `
            <input type="text" id="input-editar-${id}" value="${tarea.titulo}">
            <div>
                <button onclick="guardarEdicion(${id})">Guardar</button>
                <button onclick="cancelarEdicion()">Cancelar</button>
            </div>
        `;
        document.getElementById(`input-editar-${id}`).focus();

    }
    // Función para completar todas las tareas
    function completarTodas() {
        tareas.forEach(t =>{
             t.completada = true
        });
        renderizarTareas();
        guardarTareas();
    }
    // Función para borrar todas las tareas completadas
    function borrarCompletadas() {
        tareas = tareas.filter(t => !t.completada);
        renderizarTareas();
        guardarTareas();
    }
    // Función para guardar la edición de una tarea
    function guardarEdicion(id) {
        const input = document.getElementById(`input-editar-${id}`);
        const nuevoTitulo = input.value.trim();
        if (nuevoTitulo === "") return;
        const tarea = tareas.find(t => t.id === id);
        if (tarea) {
            tarea.titulo = nuevoTitulo;
            guardarTareas();
            renderizarTareas();
            
        }
    }
    // Función para cancelar la edición de una tarea
        function cancelarEdicion() {
        renderizarTareas();
    }

    // Evento para el formulario de agregar tarea
    document.getElementById("task-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const input = document.getElementById("task-input");
        const titulo = input.value.trim();
        if (titulo === "") return;
        agregarTarea(titulo);
        input.value = "";
    });
    // Evento para el buscador
    document.getElementById("input-busqueda").addEventListener("input", function() {
        textoBusqueda = this.value.trim().toLowerCase();
        renderizarTareas();
    });

    // Cargar tareas al iniciar la aplicación
    if (localStorage.getItem("modoOscuro") === "true") {
        document.documentElement.classList.add("dark");
    }
    cargarTareas();
    renderizarTareas();
    