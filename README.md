# Actividad - Funciones Callback en JavaScript

Proyecto web (HTML + CSS + JS) para practicar callbacks con:
- validación con prompt
- cálculos matemáticos
- asincronía con setTimeout

## 🎨 Diseño Actualizado
- Tema de colores: Terracota (#CD853F) y Teal (#20B2AA)
- Contraste optimizado para mejor legibilidad
- Interfaz moderna y accesible
- Descripciones de funciones mejoradas y sin referencias irrelevantes

## ✅ Requisitos (según PDF)
1) validar_numero(callback)
- Pide un número con prompt
- Valida si es número
- Llama callback con “Correcto” o “Error: Usted ingresó caracteres incorrectos”

2) calcular_y_avisar_despues(numero, callback)
- Calcula sumatoria de impares entre 1 y N
- Espera 5 segundos y llama callback
- Callback muestra: “El valor de la sumatoria es N. Este resultado se obtuvo hace 5 segundos”

3) calcular_y_avisar_dependiendo(numero, callback, callback_error)
- Calcula sumatorias sucesivas desde 1 hasta N
- Si resultado < 1000 => callback
- Si resultado >= 1000 => callback_error (mostrando igual el resultado)

## ▶️ Cómo ejecutar
1. Ejecuta un servidor local: `python -m http.server 8000`
2. Abre `http://localhost:8000` en el navegador
3. Usa los botones para probar las funciones
4. Revisa la salida en pantalla y la consola (F12 → Console)

## 🧠 Tip docente
- Callback = “te llamo cuando termine”
- setTimeout simula tareas que demoran (asincronía)
- Validar entradas evita errores y mejora la UX