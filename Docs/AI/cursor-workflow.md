# Flujo de Trabajo con Cursor

## ¿Qué voy a documentar aquí?

En este documento registro mi experiencia usando **Cursor** como IDE asistido por IA aplicado al proyecto TaskFlow. Incluye la exploración inicial de la interfaz, los atajos de teclado más utilizados y ejemplos concretos donde Cursor intervino en el código.

---

## 1. Instalación y configuración inicial

- Descargado desde [https://cursor.sh](https://cursor.sh)
- Instalado en Windows siguiendo el asistente de instalación
- Inicio de sesión con cuenta de Google/GitHub (plan gratuito)
- Proyecto TaskFlow abierto con `File → Open Folder`

---

## 2. Exploración de la interfaz

### Elementos explorados:
- [x] Explorador de archivos
- [x] Terminal integrada
- [x] Panel de chat (`Ctrl+L`)
- [x] Autocompletado con comentarios
- [x] Edición inline (`Ctrl+K`)
- [x] Composer (`Ctrl+Shift+I`)

---

## 3. Atajos de teclado frecuentes

| Atajo | Acción |
|-------|--------|
| `Ctrl+L` | Abrir chat contextual |
| `Ctrl+K` | Edición inline con IA |
| `Ctrl+Shift+I` | Abrir Composer (cambios multi-archivo) |
| `Ctrl+Shift+P` | Paleta de comandos |
| `Tab` | Aceptar sugerencia de autocompletado |

---

## 4. Ejemplo 1: Autocompletado y detección de errores

### Situación
Escribí un comentario describiendo una función que ya existía en el proyecto para probar el autocompletado de Cursor.

**Comentario escrito:**
```javascript
// función que filtra tareas por estado
```

**Lo que ocurrió:**
Cursor generó automáticamente una función similar a la que ya tenía en el proyecto. Sin embargo, la función generada contenía un error que provocaba un fallo en ejecución.

### Solución con edición inline (`Ctrl+K`)
Seleccioné la función con el error, pulsé `Ctrl+K` y le pedí a Cursor que lo solucionara. Cursor identificó el problema y propuso una versión corregida que funcionaba correctamente.

**¿Por qué mejoró?**
La edición inline permite corregir errores de forma muy rápida sin salir del editor ni cambiar de contexto. En lugar de buscar el bug manualmente, Cursor lo detectó y lo resolvió en segundos.

---

## 5. Ejemplo 2: Chat contextual para entender el código

### Situación
Usé el chat contextual (`Ctrl+L`) para preguntarle a Cursor por la misma función que había generado con errores.

**Pregunta realizada:**
> "¿Qué hace esta función?"

**Lo que ocurrió:**
Cursor explicó con detalle qué hacía la función, su propósito y cómo funcionaba internamente. La explicación tenía sentido y fue capaz de ofrecerla en español, adaptándose al idioma del desarrollador.

**¿Por qué fue útil?**
El chat contextual es especialmente útil para entender código heredado o generado automáticamente. En este caso ayudó a comprender mejor la función antes de corregirla, lo que facilita la toma de decisiones sobre cómo modificarla.

---

## 6. Uso del Composer

### Tarea realizada
Usé el Composer (`Ctrl+Shift+I`) para pedirle que modificara los estilos visuales de varias partes de la página del proyecto TaskFlow.

**Prompt usado en Composer:**
> "Cambia los estilos de las partes visuales de la página"

**Archivos modificados:**
- Archivos CSS del proyecto TaskFlow

**Resultado:**
Composer aplicó cambios de estilos en varios archivos simultáneamente. Tras revisar los cambios y comprobar que no eran los deseados, se le pidió que revirtiera todo al estado original, lo cual hizo correctamente.

**Conclusión:**
El Composer es potente para cambios que afectan a múltiples archivos a la vez. Es importante revisar siempre los cambios antes de aceptarlos, ya que pueden no ajustarse exactamente a lo esperado. La posibilidad de revertir los cambios fácilmente es una ventaja muy útil.

---

## 7. Conexión con MCP (Model Context Protocol)

### ¿Qué es MCP?
El **Model Context Protocol** es un estándar creado por Anthropic que permite a los modelos de IA conectarse con herramientas y fuentes de datos externas. En Cursor, con MCP activo, la IA puede leer directamente los archivos del proyecto sin necesidad de copiar y pegar código.

### Proceso de instalación

1. Instalación de **Node.js** desde [https://nodejs.org](https://nodejs.org) (versión LTS)
2. Configuración de la política de ejecución de scripts en PowerShell:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
3. Apertura de `Cursor Settings → MCP → Add new MCP server`
4. Configuración del servidor filesystem en `mcp.json`:
   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-filesystem",
           "C:/Users/Aruma/Desktop/Proyectos/Taskflow Project IA"
         ]
       }
     }
   }
   ```
5. Verificación: el indicador del servidor pasó de rojo a **verde** ✅

### 5 consultas realizadas con MCP

**Consulta 1:** *"Lista todos los archivos del proyecto TaskFlow"*
MCP listó correctamente los 3 archivos del proyecto: `index.html`, `styles.css` y `app.js`.

**Consulta 2:** *"Lee el archivo app.js y dime cuántas funciones tiene"*
Detectó **19 funciones**: 17 declaradas con `function` y 2 funciones anónimas asignadas a variables.

**Consulta 3:** *"¿Qué funciones del proyecto modifican el localStorage?"*
Identificó correctamente que `toggleModoOscuro()` y `guardarTareas()` **modifican** el localStorage, mientras que `inicializarModoOscuro()` y `cargarTareas()` solo lo **leen**.

**Consulta 4:** *"Lee el index.html y dime si hay algún problema de accesibilidad"*
Detectó 5 problemas de accesibilidad:
- Botón modo oscuro sin `aria-label` (solo tiene emoji y `title`)
- Falta un *skip link* para navegación por teclado
- Input de búsqueda sin `<label>` asociado
- Listas de tareas sin `aria-live` para lectores de pantalla
- Jerarquía de encabezados mejorable en el `<aside>`

**Consulta 5:** *"Busca en el proyecto si hay código duplicado"*
Encontró duplicación de clases Tailwind en los botones del HTML y en los botones generados dinámicamente desde JS. No detectó archivos duplicados entre sí.

### ¿En qué casos es útil MCP en proyectos reales?

- **Análisis de código:** permite pedirle a la IA que audite todo el proyecto sin copiar archivos manualmente
- **Refactorización masiva:** puede leer varios archivos a la vez y proponer cambios coordinados
- **Revisiones de accesibilidad y calidad:** detecta problemas en todo el proyecto de forma automática
- **Documentación automática:** puede leer el código fuente y generar documentación actualizada
- **Búsqueda de bugs:** analiza el proyecto completo buscando patrones problemáticos

---

## 8. Valoración general de Cursor

Cursor es una herramienta muy útil que acelera el desarrollo considerablemente. Sus puntos fuertes son el autocompletado contextual, la edición inline y el chat integrado que entiende el código del proyecto. Como punto a mejorar, el código generado automáticamente no siempre es correcto y requiere revisión manual antes de aceptarlo, como se comprobó en el Ejemplo 1. Para proyectos reales, sería una herramienta recomendable siempre que el desarrollador mantenga el criterio de revisar todo el código generado.
