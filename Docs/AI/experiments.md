# Experimentos con IA en Programación

## ¿Qué voy a documentar aquí?

En este documento comparo resolver problemas de programación **con y sin ayuda de IA**. Para cada experimento se registra el problema, la solución manual, la solución asistida por IA y una comparativa de tiempo, calidad y comprensión.

> **Nota importante:** Los tiempos sin IA incluyen el tiempo de intentar recordar cómo se planteaban los ejemplos vistos en clase, no solo el de escribir el código. Esto es relevante para interpretar la comparativa de forma justa.

---

## Experimentos generales (Java)

### Experimento 1 — Saludo personalizado

**Problema:**
Escribe un método que reciba un nombre y devuelva un saludo personalizado.
Ejemplo: `saludar("Ana")` → `"Hola, Ana!"`

**Solución sin IA:**
```java
public class Main {
    public static String saludar(String nombre) {
        return "Hola, " + nombre + "!";
    }
}
```
⏱ Tiempo invertido: **8 minutos** (incluye recordar la sintaxis de métodos en Java)

**Solución con IA:**
```java
public class Main {
    public static String saludar(String nombre) {
        return "Hola, " + nombre + "!";
    }

    public static void main(String[] args) {
        System.out.println(saludar("Ana"));
    }
}
```
⏱ Tiempo invertido: **menos de 1 segundo**

**Prompt usado:**
> "Escribe un método Java que reciba un nombre y devuelva un saludo personalizado. Ejemplo: saludar("Ana") → "Hola, Ana!""

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | 8 min  | < 1 seg |
| Calidad del código    | ✅ Correcta | ✅ Correcta + main de ejemplo |
| Comprensión del tema  | ✅ Alta | ✅ Alta |

**Conclusión:**
El resultado es prácticamente idéntico, pero la IA añade el método `main` de ejemplo. El tiempo sin IA fue alto porque hubo que recordar la sintaxis de declaración de métodos en Java.

---

### Experimento 2 — Suma de dos números

**Problema:**
Escribe un método que reciba dos enteros y devuelva su suma.
Ejemplo: `sumar(3, 5)` → `8`

**Solución sin IA:**
```java
public class Main {
    public static int sumar(int a, int b) {
        return a + b;
    }
}
```
⏱ Tiempo invertido: **2 minutos**

**Solución con IA:**
```java
public class Main {
    public static int sumar(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(sumar(3, 5));
    }
}
```
⏱ Tiempo invertido: **menos de 1 segundo**

**Prompt usado:**
> "Escribe un método Java que reciba dos números enteros y devuelva su suma."

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | 2 min  | < 1 seg |
| Calidad del código    | ✅ Correcta | ✅ Correcta + main de ejemplo |
| Comprensión del tema  | ✅ Alta | ✅ Alta |

**Conclusión:**
Este fue el más rápido sin IA porque la lógica era muy sencilla. La diferencia de tiempo es menor que en otros problemas, lo que indica que para tareas muy simples la IA no aporta tanto valor en términos de velocidad.

---

### Experimento 3 — ¿Es mayor de edad?

**Problema:**
Escribe un método que reciba una edad y devuelva `true` si es mayor de edad o `false` si no.
Ejemplo: `esMayorDeEdad(20)` → `true`

**Solución sin IA:**
```java
public class Main {
    public static boolean esMayorDeEdad(int edad) {
        return edad >= 18;
    }
}
```
⏱ Tiempo invertido: **10 minutos** (incluye recordar el tipo de retorno `boolean` y la sintaxis)

**Solución con IA:**
```java
public class Main {
    public static boolean esMayorDeEdad(int edad) {
        return edad >= 18;
    }

    public static void main(String[] args) {
        System.out.println(esMayorDeEdad(20)); // true
        System.out.println(esMayorDeEdad(15)); // false
    }
}
```
⏱ Tiempo invertido: **menos de 1 segundo**

**Prompt usado:**
> "Escribe un método Java que reciba una edad y devuelva true si es mayor de edad (18 o más) o false si no."

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | 10 min | < 1 seg |
| Calidad del código    | ✅ Correcta | ✅ Correcta + ejemplos comentados |
| Comprensión del tema  | ✅ Alta | ✅ Alta |

**Conclusión:**
El tiempo sin IA fue el más alto de los tres problemas Java. Recordar el tipo `boolean` y cómo usarlo en Java llevó más tiempo del esperado. La IA además añadió ejemplos comentados que facilitan entender el resultado.

---

## Experimentos aplicados a TaskFlow (JavaScript)

### Experimento 4 — Mensaje cuando no hay tareas

**Tarea:**
Mostrar un mensaje "No hay tareas pendientes" cuando la lista esté vacía.

**Solución sin IA:**
No se pudo completar sin ayuda. JavaScript resultó más difícil de resolver de forma autónoma al no tener suficiente práctica con la manipulación del DOM.

⏱ Tiempo invertido sin IA: **no completado**

**Solución con IA:**
```javascript
if (obtenerTareasFiltradas().filter(t => !t.completada).length === 0) {
    listaPendientes.innerHTML = '<p class="text-gray-400 text-sm italic">No hay tareas pendientes</p>';
}
if (obtenerTareasFiltradas().filter(t => t.completada).length === 0) {
    listaCompletadas.innerHTML = '<p class="text-gray-400 text-sm italic">No hay tareas completadas</p>';
}
```
⏱ Tiempo invertido con IA: **menos de 1 segundo**

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | No completado | < 1 seg |
| Calidad del código    | — | ✅ Correcta con clases Tailwind |
| Comprensión del tema  | ⚠️ Baja | ✅ Alta tras explicación |

**Conclusión:**
La manipulación del DOM en JavaScript requiere más práctica para hacerlo de forma autónoma. La IA no solo generó el código sino que explicó por qué se hace así, lo que ayudó a entender el concepto.

---

### Experimento 5 — Contador de caracteres

**Tarea:**
Añadir un contador debajo del input que muestre los caracteres escritos en tiempo real. Ejemplo: `12 / 50`

**Solución sin IA:**
No se pudo completar sin ayuda. No estaba claro si había que modificar el HTML, el JS o ambos.

⏱ Tiempo invertido sin IA: **no completado**

**Solución con IA:**

`index.html` — añadir debajo del input:
```html
<p id="contador-chars" class="text-sm text-gray-400">0 / 50</p>
```

`app.js` — añadir en la sección de eventos:
```javascript
document.getElementById("task-input").addEventListener("input", function () {
    document.getElementById("contador-chars").textContent = `${this.value.length} / 50`;
});
```
⏱ Tiempo invertido con IA: **menos de 1 segundo**

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | No completado | < 1 seg |
| Calidad del código    | — | ✅ Correcta con evento input |
| Comprensión del tema  | ⚠️ Baja | ✅ Alta tras explicación |

**Conclusión:**
Esta tarea requería coordinar cambios en dos archivos, lo que aumenta la dificultad. La IA explicó claramente qué tocar en cada archivo y por qué, lo cual fue muy útil para entender la relación entre HTML y JS.

---

### Experimento 6 — Confirmar antes de eliminar

**Tarea:**
Antes de eliminar una tarea, pedir confirmación al usuario. Si acepta se elimina, si cancela no pasa nada.

**Solución sin IA:**
No se pudo completar sin ayuda. No se conocía la función `confirm()` de JavaScript.

⏱ Tiempo invertido sin IA: **no completado**

**Solución con IA:**
```javascript
function eliminarTarea(id) {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
    guardarTareas();
}
```
⏱ Tiempo invertido con IA: **menos de 1 segundo**

| Criterio              | Sin IA | Con IA |
|-----------------------|--------|--------|
| Tiempo                | No completado | < 1 seg |
| Calidad del código    | — | ✅ Correcta y concisa |
| Comprensión del tema  | ⚠️ Baja | ✅ Alta tras explicación |

**Conclusión:**
La IA introdujo `confirm()`, una función nativa del navegador que no se conocía. Este es un ejemplo claro de cómo la IA puede acelerar el aprendizaje al mostrar herramientas del lenguaje que aún no se dominan.

---

## Resumen global de experimentos

| Experimento | Tiempo sin IA | Tiempo con IA | ¿Completado sin IA? |
|-------------|--------------|---------------|----------------------|
| 1 — Saludo personalizado (Java) | 8 min | < 1 seg | ✅ Sí |
| 2 — Suma de números (Java) | 2 min | < 1 seg | ✅ Sí |
| 3 — Mayor de edad (Java) | 10 min | < 1 seg | ✅ Sí |
| 4 — Mensaje lista vacía (JS) | No completado | < 1 seg | ❌ No |
| 5 — Contador de caracteres (JS) | No completado | < 1 seg | ❌ No |
| 6 — Confirmar eliminación (JS) | No completado | < 1 seg | ❌ No |

**Conclusión general:**
Los problemas en Java, siendo el lenguaje estudiado en clase, se pudieron resolver de forma autónoma aunque con más tiempo del esperado, ya que parte de ese tiempo se dedicó a recordar la sintaxis vista en clase. Los problemas en JavaScript, al ser un lenguaje con menos práctica acumulada, no pudieron completarse sin ayuda de IA. En ambos casos la IA fue considerablemente más rápida y añadió valor extra como ejemplos comentados y explicaciones del código generado. Esto demuestra que la IA es especialmente útil cuando se trabaja fuera del lenguaje de mayor dominio o cuando se desconocen funciones específicas del lenguaje.
