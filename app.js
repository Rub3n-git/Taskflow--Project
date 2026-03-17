let tareas = [];
let filtroActivo = "todas";
let textoBusqueda = "";

// ─── MODO OSCURO ────────────────────────────────────────────────────────────

/**
 * Inicializa el modo oscuro al cargar la página según la preferencia guardada.
 */
function inicializarModoOscuro() {
    const modoOscuro = localStorage.getItem("modoOscuro") === "true";
    if (modoOscuro) {
        document.documentElement.classList.add("dark");
        document.getElementById("btn-modo-oscuro").textContent = "☀️";
    }
}

/**
 * Alterna entre el modo oscuro y el modo claro, y guarda la preferencia.
 */
function toggleModoOscuro() {
    document.documentElement.classList.toggle("dark");
    const modoOscuro = document.documentElement.classList.contains("dark");
    localStorage.setItem("modoOscuro", modoOscuro);
    document.getElementById("btn-modo-oscuro").textContent = modoOscuro ? "☀️" : "🌙";
}

// ─── FILTROS ─────────────────────────────────────────────────────────────────

/**
 * Cambia el filtro activo y re-renderiza las tareas.
 * @param {string} filtro - Filtro a aplicar: 'todas', 'pendientes' o 'completadas'
 * @param {HTMLElement} boton - Botón que activó el filtro
 */
function cambiarFiltro(filtro, boton) {
    filtroActivo = filtro;
    document.querySelectorAll("#filtros button").forEach(btn => {
        btn.classList.remove("activo");
    });
    boton.classList.add("activo");
    renderizarTareas();
}

// ─── RENDERIZADO ─────────────────────────────────────────────────────────────

/**
 * Aplica el filtro activo y el texto de búsqueda sobre el array de tareas.
 * @returns {Array} Array de tareas filtradas
 */
function obtenerTareasFiltradas() {
    let resultado = tareas;

    if (filtroActivo === "pendientes") {
        resultado = resultado.filter(t => !t.completada);
    } else if (filtroActivo === "completadas") {
        resultado = resultado.filter(t => t.completada);
    }

    if (textoBusqueda !== "") {
        resultado = resultado.filter(t =>
            t.titulo.toLowerCase().includes(textoBusqueda)
        );
    }

    return resultado;
}

/**
 * Devuelve las clases de color según la prioridad de la tarea.
 * NUEVA FUNCIONALIDAD: prioridad en las tareas.
 * @param {string} prioridad - 'alta', 'media' o 'baja'
 * @returns {string} Clases CSS de color para la etiqueta de prioridad
 */
function obtenerColorPrioridad(prioridad) {
    const colores = {
        alta: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        media: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        baja: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
    };
    return colores[prioridad] || colores.media;
}

/**
 * Crea el elemento <li> HTML para una tarea.
 * @param {Object} tarea - Objeto tarea
 * @returns {HTMLElement} Elemento li listo para insertar en el DOM
 */
function crearElementoTarea(tarea) {
    const li = document.createElement("li");
    li.className = "bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 px-4 py-3 rounded shadow-sm mb-2 flex justify-between items-center";

    if (tarea.completada) {
        li.classList.add("opacity-60", "line-through");
    }

    const prioridad = tarea.prioridad || "media";
    const colorPrioridad = obtenerColorPrioridad(prioridad);

    li.innerHTML = `
        <div class="flex flex-col gap-1">
            <span>${tarea.titulo}</span>
            <span class="text-xs px-2 py-0.5 rounded-full w-fit font-medium ${colorPrioridad}">
                ${prioridad.charAt(0).toUpperCase() + prioridad.slice(1)}
            </span>
        </div>
        <div class="flex gap-2">
            <button onclick="editarTarea(${tarea.id})" title="Editar tarea"
            class="p-2 bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-900 text-sm">Editar</button>
            <button onclick="toggleCompletar(${tarea.id})" title="${tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}"
            class="p-2 bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-900 text-sm">
                ${tarea.completada ? "Desmarcar" : "Completar"}
            </button>
            <button onclick="eliminarTarea(${tarea.id})" title="Eliminar tarea"
            class="p-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 text-sm">Eliminar</button>
        </div>
    `;

    return li;
}

/**
 * Renderiza todas las tareas filtradas en la interfaz.
 * NUEVA FUNCIONALIDAD: muestra mensaje cuando la lista está vacía.
 */
function renderizarTareas() {
    const listaPendientes = document.getElementById("pending-tasks");
    const listaCompletadas = document.getElementById("completed-tasks");

    listaPendientes.innerHTML = "";
    listaCompletadas.innerHTML = "";

    const tareasFiltradas = obtenerTareasFiltradas();
    const pendientes = tareasFiltradas.filter(t => !t.completada);
    const completadas = tareasFiltradas.filter(t => t.completada);

    // NUEVA FUNCIONALIDAD 1: Mensaje cuando la lista está vacía
    if (pendientes.length === 0) {
        listaPendientes.innerHTML = '<p class="text-gray-400 text-sm italic">No hay tareas pendientes</p>';
    } else {
        pendientes.forEach(tarea => listaPendientes.appendChild(crearElementoTarea(tarea)));
    }

    if (completadas.length === 0) {
        listaCompletadas.innerHTML = '<p class="text-gray-400 text-sm italic">No hay tareas completadas</p>';
    } else {
        completadas.forEach(tarea => listaCompletadas.appendChild(crearElementoTarea(tarea)));
    }

    actualizarEstadisticas();
}

// ─── LOCAL STORAGE ───────────────────────────────────────────────────────────

/**
 * Guarda el array de tareas en localStorage.
 */
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

/**
 * Carga las tareas almacenadas en localStorage.
 */
function cargarTareas() {
    const datos = localStorage.getItem("tareas");
    if (datos !== null) {
        tareas = JSON.parse(datos);
    }
}

// ─── CRUD DE TAREAS ──────────────────────────────────────────────────────────

/**
 * Agrega una nueva tarea al array y actualiza la interfaz.
 * NUEVA FUNCIONALIDAD: acepta parámetro de prioridad.
 * @param {string} titulo - Título de la nueva tarea
 * @param {string} prioridad - Prioridad: 'alta', 'media' o 'baja'
 * @returns {boolean} false si la validación falla
 */
function agregarTarea(titulo, prioridad = "media") {
    const tituloLimpio = titulo.trim();
    if (tituloLimpio === "") return false;

    const tarea = {
        id: Date.now(),
        titulo: tituloLimpio,
        completada: false,
        prioridad: prioridad,
        creadaEn: new Date().toLocaleDateString("es-ES")
    };

    tareas.push(tarea);
    renderizarTareas();
    guardarTareas();
}

/**
 * Alterna el estado completado/pendiente de una tarea.
 * @param {number} id - ID de la tarea a alternar
 */
function toggleCompletar(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
        guardarTareas();
    }
}

/**
 * Elimina una tarea del array por su ID.
 * NUEVA FUNCIONALIDAD: pide confirmación antes de eliminar.
 * @param {number} id - ID de la tarea a eliminar
 */
function eliminarTarea(id) {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
    guardarTareas();
}

/**
 * Marca todas las tareas como completadas.
 */
function completarTodas() {
    tareas = tareas.map(t => ({ ...t, completada: true }));
    renderizarTareas();
    guardarTareas();
}

/**
 * Elimina todas las tareas que estén marcadas como completadas.
 */
function borrarCompletadas() {
    tareas = tareas.filter(t => !t.completada);
    renderizarTareas();
    guardarTareas();
}

// ─── EDICIÓN DE TAREAS ───────────────────────────────────────────────────────

/**
 * Convierte el elemento <li> de una tarea en un formulario de edición inline.
 * @param {number} id - ID de la tarea a editar
 */
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;

    const li = document.querySelector(`[onclick="editarTarea(${id})"]`).closest("li");
    li.innerHTML = `
        <input type="text" id="input-editar-${id}" value="${tarea.titulo}"
        class="p-2 text-base border border-gray-300 rounded w-full focus:outline-none focus:border-blue-800 dark:bg-gray-700 dark:text-white dark:border-gray-600">
        <div class="flex gap-2 mt-2">
            <button onclick="guardarEdicion(${id})"
            class="p-2 bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-900 text-sm">Guardar</button>
            <button onclick="cancelarEdicion()"
            class="p-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 text-sm">Cancelar</button>
        </div>
    `;
    document.getElementById(`input-editar-${id}`).focus();
}

/**
 * Guarda el nuevo título de una tarea editada.
 * @param {number} id - ID de la tarea que se está editando
 */
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

/**
 * Cancela la edición de una tarea y restaura la vista normal.
 */
function cancelarEdicion() {
    renderizarTareas();
}

// ─── ESTADÍSTICAS ────────────────────────────────────────────────────────────

/**
 * Actualiza los contadores de estadísticas en la interfaz.
 */
function actualizarEstadisticas() {
    const totalCompletadas = tareas.filter(t => t.completada).length;
    const totalPendientes = tareas.length - totalCompletadas;

    document.getElementById("stat-total").textContent = tareas.length;
    document.getElementById("stat-pending").textContent = totalPendientes;
    document.getElementById("stat-completed").textContent = totalCompletadas;
}

// ─── EVENTOS ─────────────────────────────────────────────────────────────────

// Evento formulario agregar tarea
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("task-input");
    const prioridad = document.getElementById("select-prioridad").value;
    const titulo = input.value.trim();
    if (titulo === "") return;
    agregarTarea(titulo, prioridad);
    input.value = "";
    // NUEVA FUNCIONALIDAD 2: resetear contador de caracteres tras agregar
    document.getElementById("contador-chars").textContent = "0 / 50";
});

// NUEVA FUNCIONALIDAD 2: Contador de caracteres en el input
document.getElementById("task-input").addEventListener("input", function () {
    document.getElementById("contador-chars").textContent = `${this.value.length} / 50`;
});

// Evento buscador
document.getElementById("input-busqueda").addEventListener("input", function () {
    textoBusqueda = this.value.trim().toLowerCase();
    renderizarTareas();
});

// ─── INICIALIZACIÓN ──────────────────────────────────────────────────────────

inicializarModoOscuro();
cargarTareas();
renderizarTareas();
