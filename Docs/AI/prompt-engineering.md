# Prompt Engineering aplicado al Desarrollo

## ¿Qué voy a documentar aquí?

En este documento recopilo **10 prompts útiles** para desarrollo, organizados por técnica. Cada prompt incluye el texto usado, el contexto en que se aplicó y por qué funciona bien.

Técnicas exploradas:
- Prompts con rol definido
- Few-shot prompting (con ejemplos)
- Chain-of-thought (razonamiento paso a paso)
- Prompts con restricciones claras

---

## Técnica 1: Prompts con Rol Definido

### Prompt #1
**Rol:** Desarrollador senior
**Prompt:**
> "Actúa como un desarrollador senior de JavaScript. Revisa este archivo app.js, detecta funciones mejorables y refactorízalas aplicando buenas prácticas como JSDoc, inmutabilidad y separación de responsabilidades."

**Aplicado en:** Refactorización del `app.js` de TaskFlow

**Resultado obtenido:**
La IA dividió `renderizarTareas()` en tres funciones más pequeñas, añadió JSDoc a todas las funciones, sustituyó la mutación directa en `completarTodas()` por `map()` con spread operator, y detectó la inicialización duplicada del modo oscuro.

**¿Por qué funciona bien?**
Definir el rol de "desarrollador senior" hace que la IA adopte un enfoque profesional y proponga soluciones más avanzadas que con un prompt genérico como "mejora este código". El rol ancla el nivel de exigencia esperado.

---

### Prompt #2
**Rol:** Experto en accesibilidad web
**Prompt:**
> "Actúa como un experto en accesibilidad web. Lee este archivo index.html y detecta todos los problemas que puedan dificultar su uso a personas con discapacidad o que usen lectores de pantalla."

**Aplicado en:** Auditoría de accesibilidad del `index.html` de TaskFlow (vía MCP en Cursor)

**Resultado obtenido:**
Detectó 5 problemas reales: botón sin `aria-label`, falta de skip link, input de búsqueda sin `<label>`, listas sin `aria-live` y jerarquía de encabezados mejorable.

**¿Por qué funciona bien?**
El rol de "experto en accesibilidad" orienta a la IA hacia criterios WCAG que normalmente no aplicaría en una revisión genérica de código. Sin el rol, probablemente solo habría comentado aspectos visuales.

---

## Técnica 2: Few-Shot Prompting

### Prompt #3
**Prompt:**
> "Genera comentarios JSDoc para funciones JavaScript. Aquí tienes dos ejemplos del formato esperado:
>
> Función: `filtrarTareasPorEstado(tareas, estado)` → filtra por estado
> JSDoc:
> ```
> /**
>  * Filtra un array de tareas por su estado.
>  * @param {Array} tareas - Array de objetos tarea
>  * @param {string} estado - Estado a filtrar
>  * @returns {Array} Tareas que coinciden con el estado
>  */
> ```
>
> Función: `guardarTareas()` → guarda en localStorage
> JSDoc:
> ```
> /**
>  * Guarda el array de tareas en localStorage.
>  */
> ```
>
> Ahora genera el JSDoc para todas las funciones de este archivo: [código]"

**Aplicado en:** Documentación de `app.js`

**Resultado obtenido:**
La IA generó JSDoc consistente para las 19 funciones, respetando exactamente el formato de los ejemplos proporcionados.

**¿Por qué funciona bien?**
Los ejemplos concretos eliminan la ambigüedad sobre el formato esperado. Sin ejemplos, cada JSDoc podría tener un estilo diferente. El few-shot prompting garantiza consistencia en toda la documentación.

---

### Prompt #4
**Prompt:**
> "Detecta el bug en estas funciones JavaScript. Te muestro dos ejemplos de cómo quiero que respondas:
>
> Ejemplo 1 — Función: `return a - b` en una función llamada `sumar`
> Respuesta: El operador debería ser `+` en lugar de `-`. La función resta en lugar de sumar.
>
> Ejemplo 2 — Función: `if (nombre = '')` 
> Respuesta: Se usa `=` (asignación) en lugar de `===` (comparación). Esto asigna vacío a `nombre` en lugar de compararlo.
>
> Ahora detecta el bug en esta función: [código]"

**Aplicado en:** Detección de bugs en las funciones del Paso 2

**Resultado obtenido:**
La IA siguió exactamente el formato de los ejemplos: identificó el bug, explicó por qué era un error y propuso la corrección en una línea.

**¿Por qué funciona bien?**
Al mostrar el formato de respuesta esperado con ejemplos, se evitan respuestas demasiado largas o demasiado vagas. El modelo entiende el nivel de detalle que se necesita.

---

## Técnica 3: Chain-of-Thought (Paso a Paso)

### Prompt #5
**Prompt:**
> "Antes de refactorizar este código, razona paso a paso:
> 1. Primero analiza qué hace cada función
> 2. Luego identifica qué problemas tiene (duplicación, longitud, responsabilidades)
> 3. Finalmente propón la versión refactorizada con una explicación de cada cambio
>
> Código: [app.js completo]"

**Aplicado en:** Refactorización del `app.js` de TaskFlow

**Resultado obtenido:**
La IA primero listó todas las funciones con su propósito, luego identificó que `renderizarTareas()` tenía demasiadas responsabilidades y que el modo oscuro estaba duplicado, y finalmente propuso la refactorización con comentarios explicativos en cada cambio.

**¿Por qué funciona bien?**
Forzar el razonamiento por pasos reduce errores lógicos y hace que la IA no salte directamente a generar código sin entender el problema. El resultado es más preciso y justificado.

---

### Prompt #6
**Prompt:**
> "Explícame cómo funciona el Event Loop en JavaScript razonando paso a paso:
> 1. Describe primero qué problema resuelve
> 2. Explica las piezas que lo componen
> 3. Muestra con un ejemplo de código el orden exacto de ejecución
> 4. Explica por qué ese orden es así"

**Aplicado en:** Explicación de conceptos técnicos del Paso 2

**Resultado obtenido:**
La IA estructuró la respuesta en exactamente esos 4 bloques, incluyendo un ejemplo con `setTimeout` y `Promise` que demostraba la diferencia entre microtasks y macrotasks.

**¿Por qué funciona bien?**
La estructura paso a paso obliga a la IA a no saltarse partes importantes de la explicación. Es especialmente útil para conceptos complejos donde el orden de comprensión importa.

---

## Técnica 4: Prompts con Restricciones Claras

### Prompt #7
**Prompt:**
> "Refactoriza esta función JavaScript con las siguientes restricciones:
> - No uses librerías externas
> - Mantén exactamente la misma firma de la función (nombre y parámetros)
> - El código debe ser compatible con ES6
> - No mutes el array original, devuelve uno nuevo
> - Responde solo con el código, sin explicaciones adicionales"

**Aplicado en:** Refactorización de `completarTodas()` y `ordenarPorFecha()`

**Resultado obtenido:**
La IA devolvió únicamente el código refactorizado respetando todas las restricciones. En `ordenarPorFecha()` usó spread operator para no mutar el array original, tal como se pedía.

**¿Por qué funciona bien?**
Las restricciones eliminan la ambigüedad y acotan el espacio de respuestas posibles. Sin ellas, la IA podría usar librerías externas, cambiar la firma o añadir explicaciones innecesarias.

---

### Prompt #8
**Prompt:**
> "Genera el archivo mcp.json de configuración para el servidor MCP de filesystem en Cursor. Restricciones:
> - Formato JSON válido
> - Solo incluye el servidor filesystem
> - La ruta del proyecto es: C:/Users/Aruma/Desktop/Proyectos/Taskflow Project IA
> - Usa npx para ejecutarlo
> - No añadas comentarios dentro del JSON"

**Aplicado en:** Configuración del servidor MCP en el Paso 5

**Resultado obtenido:**
La IA generó exactamente el JSON necesario sin comentarios ni texto extra, listo para copiar y pegar directamente en el archivo de configuración.

**¿Por qué funciona bien?**
En tareas de configuración, las restricciones son especialmente importantes porque un JSON con comentarios o con formato incorrecto directamente no funciona. Las restricciones garantizan un output directamente utilizable.

---

## Prompts adicionales

### Prompt #9
**Técnica:** Rol + Restricciones
**Prompt:**
> "Actúa como un desarrollador frontend especializado en CSS. Revisa este archivo styles.css y completa las secciones que están vacías. Restricciones: usa variables CSS ya definidas en :root en lugar de valores literales, no uses librerías externas, añade un comentario explicando cada sección que completes."

**Aplicado en:** Refactorización del `styles.css` de TaskFlow

**Resultado obtenido:**
La IA completó las 5 secciones vacías (header, layout, tarjetas, botones y responsive) usando las variables CSS existentes y añadiendo comentarios explicativos en cada bloque.

**¿Por qué funciona bien?**
Combinar rol y restricciones maximiza la precisión del resultado. El rol aporta el enfoque técnico correcto y las restricciones garantizan coherencia con el código existente.

---

### Prompt #10
**Técnica:** Chain-of-thought + Restricciones
**Prompt:**
> "Compara estas dos implementaciones de la misma función JavaScript. Razona paso a paso:
> 1. ¿Qué hace cada una?
> 2. ¿Cuál tiene mejor rendimiento y por qué?
> 3. ¿Cuál sigue mejor las buenas prácticas?
> 4. ¿Cuál usarías en producción?
> Responde en menos de 200 palabras."

**Aplicado en:** Comparativa entre las funciones generadas por ChatGPT y Claude en el Paso 2

**Resultado obtenido:**
La IA analizó ambas versiones de `ordenarPorFecha()` y señaló que la versión con spread operator era mejor porque no mutaba el array original, lo que previene errores difíciles de depurar en aplicaciones grandes.

**¿Por qué funciona bien?**
El límite de palabras obliga a la IA a ser concisa y priorizar lo más importante. Sin ese límite, la respuesta puede volverse demasiado extensa para una comparativa rápida.

---

## Conclusiones sobre Prompt Engineering

A lo largo del ejercicio se comprobó que la técnica más útil depende del contexto:

- **Rol definido** es ideal para tareas de revisión y análisis, donde el enfoque técnico importa.
- **Few-shot** es imprescindible cuando se necesita consistencia de formato, como en documentación o generación de código repetitivo.
- **Chain-of-thought** funciona mejor para explicaciones de conceptos complejos o refactorizaciones donde el razonamiento importa tanto como el resultado.
- **Restricciones claras** son fundamentales en tareas de configuración o cuando el output debe ser directamente utilizable sin edición manual.

En general, combinar dos técnicas (por ejemplo rol + restricciones) produce los resultados más precisos y útiles.
