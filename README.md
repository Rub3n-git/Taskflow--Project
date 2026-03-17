# TaskFlow

**TaskFlow** es una aplicación web de gestión de tareas desarrollada con HTML, CSS y JavaScript vanilla. Permite crear, editar, filtrar y organizar tareas de forma sencilla, con soporte para modo oscuro y persistencia de datos mediante localStorage.

---

## 📸 Vista previa

> Abre `index.html` en tu navegador para ver la aplicación en funcionamiento.

---

## ✨ Funcionalidades

- ✅ **Crear tareas** con título y nivel de prioridad (alta, media, baja)
- ✏️ **Editar tareas** de forma inline sin recargar la página
- 🗑️ **Eliminar tareas** con confirmación previa
- ☑️ **Marcar tareas** como completadas o pendientes
- 🔍 **Buscar tareas** por texto en tiempo real
- 🔽 **Filtrar tareas** por estado: todas, pendientes o completadas
- 📊 **Estadísticas** en tiempo real: total, pendientes y completadas
- 🌙 **Modo oscuro** con persistencia entre sesiones
- 💾 **Persistencia de datos** mediante localStorage
- 🔢 **Contador de caracteres** en el input de nueva tarea
- 💬 **Mensaje de lista vacía** cuando no hay tareas en una sección
- ✔️ **Completar o borrar todas** las tareas de una vez

---

## 🗂️ Estructura del proyecto

```
TaskFlow/
├── index.html       # Estructura HTML de la aplicación
├── app.js           # Lógica JavaScript de la aplicación
├── styles.css       # Estilos CSS personalizados
└── docs/
    └── ai/
        ├── ai-comparison.md       # Comparativa ChatGPT vs Claude
        ├── cursor-workflow.md     # Flujo de trabajo con Cursor + MCP
        ├── prompt-engineering.md  # Prompts útiles documentados
        ├── experiments.md         # Experimentos con y sin IA
        └── reflection.md          # Reflexión final
```

---

## 🚀 Cómo usar la aplicación

### 1. Clonar o descargar el repositorio

```bash
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow
```

### 2. Abrir en el navegador

No necesita instalación ni servidor. Simplemente abre el archivo `index.html` en tu navegador:

```
Doble clic en index.html
```

O si tienes la extensión **Live Server** en VS Code o Cursor:

```
Clic derecho en index.html → Open with Live Server
```

---

## 📖 Ejemplos de uso

### Crear una tarea con prioridad alta
1. Escribe el título en el campo **Descripción**
2. Selecciona **🔴 Alta** en el desplegable de prioridad
3. Pulsa **Agregar tarea**

### Buscar tareas
Escribe en el campo **Buscar** y la lista se filtra automáticamente en tiempo real.

### Activar el modo oscuro
Pulsa el botón 🌙 en la esquina superior derecha. La preferencia se guarda automáticamente.

### Editar una tarea
Pulsa el botón **Editar** en cualquier tarea, modifica el texto y pulsa **Guardar**.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de la aplicación |
| CSS3 | Estilos personalizados y variables CSS |
| JavaScript ES6 | Lógica de la aplicación |
| Tailwind CSS (CDN) | Clases de utilidad para el diseño |
| localStorage | Persistencia de datos en el navegador |

---

## 🤖 Desarrollo asistido por IA

Este proyecto fue desarrollado con ayuda de herramientas de IA:

- **Claude** y **ChatGPT** para explicar conceptos, detectar bugs y generar código
- **Cursor** como IDE asistido por IA con autocompletado y chat contextual
- **MCP (Model Context Protocol)** para conectar la IA directamente con los archivos del proyecto

Toda la documentación del proceso está disponible en la carpeta [`docs/ai/`](./docs/ai/).

---

## 📝 Licencia

Proyecto de uso educativo desarrollado para el módulo DAM.

---

*TaskFlow © 2025*
