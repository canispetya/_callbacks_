/**
 * ACTIVIDAD: Funciones Callback (Validación y Cálculo)
 *
 * Idea clave para estudiantes:
 * Un callback es una función que se pasa como argumento para ejecutarla después.
 * Es como decir: “haz tu trabajo y cuando termines me avisas llamando ESTA función”.
 *
 * El PDF pide:
 * 1) validar_numero(callback) usando prompt y validación numérica.  [oai_citation:5‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 * 2) calcular_y_avisar_despues(numero, callback): suma impares 1..N y espera 5s.  [oai_citation:6‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 * 3) calcular_y_avisar_dependiendo(numero, callback, callback_error): sumatorias sucesivas y umbral 1000.  [oai_citation:7‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 */

/* ========= helpers de UI ========= */
const output = document.querySelector("#output");
const btnLimpiar = document.querySelector("#btnLimpiar");

function print(msg) {
  output.textContent += (output.textContent.endsWith("\n") || output.textContent === "" ? "" : "\n") + msg;
  console.log(msg);
}

function resetOutput() {
  output.textContent = "";
}

btnLimpiar.addEventListener("click", () => {
  resetOutput();
  output.textContent = "Salida limpia ✅";
});

/* =========================================================
   1) validar_numero(callback)
   ========================================================= */

/**
 * Valida si una entrada del prompt es un número.
 * Llama al callback con un objeto resultado:
 * - ok: true/false
 * - value: número parseado (o null)
 * - message: mensaje “Correcto” o “Error...”
 */
function validar_numero(callback) {
  const dato = prompt("Ingrese un número:"); // pedido explícito del enunciado  [oai_citation:8‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)

  // Si el usuario presiona “Cancelar”, prompt devuelve null
  if (dato === null) {
    callback({
      ok: false,
      value: null,
      message: "Error: el usuario canceló el ingreso."
    });
    return;
  }

  // trim() evita problemas con espacios ("  10  ")
  const limpio = dato.trim();

  // Number(limpio) convierte a número; si no se puede, será NaN
  const numero = Number(limpio);

  if (!Number.isNaN(numero) && limpio !== "") {
    callback({
      ok: true,
      value: numero,
      message: "Correcto: ingresó un número válido."
    });
  } else {
    callback({
      ok: false,
      value: null,
      message: "Error: Usted ingresó caracteres incorrectos."
    });
  }
}

/* Callback de ejemplo para validar_numero */
function callbackValidacion(resultado) {
  // Aquí se “reacciona” a lo ocurrido en validar_numero
  if (resultado.ok) {
    print(`✅ ${resultado.message} (valor: ${resultado.value})`);
  } else {
    print(`❌ ${resultado.message}`);
  }
}

/* Botón 1 */
document.querySelector("#btnValidar").addEventListener("click", () => {
  resetOutput();
  print("== validar_numero(callback) ==");
  validar_numero(callbackValidacion);
});

/* =========================================================
   2) calcular_y_avisar_despues(numero, callback)
   ========================================================= */

/**
 * Calcula la sumatoria de impares entre 1 y numero.
 * Luego espera 5 segundos y llama al callback con el resultado.
 * Requisito del PDF: esperar 5 segundos y decir el mensaje.  [oai_citation:9‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 */
function calcular_y_avisar_despues(numero, callback) {
  // Sumamos solo impares: 1,3,5,7...
  let suma = 0;
  for (let i = 1; i <= numero; i++) {
    if (i % 2 !== 0) suma += i;
  }

  // setTimeout = asincronía controlada (esperar y luego ejecutar callback)
  setTimeout(() => {
    callback(suma);
  }, 5000);
}

/* Callback para el ejercicio 2 (mensaje exacto del enunciado) */
function callbackAvisoDespues(resultado) {
  print(`⏳ El valor de la sumatoria es ${resultado}. Este resultado se obtuvo hace 5 segundos`);
}

/* Botón 2 */
document.querySelector("#btnImpares").addEventListener("click", () => {
  resetOutput();
  print("== calcular_y_avisar_despues(N, callback) ==");

  const n = Number(document.querySelector("#numImpares").value);

  if (!Number.isFinite(n) || n < 1) {
    print("❌ Error: ingresa un N válido (N >= 1).");
    return;
  }

  print(`Calculando impares entre 1 y ${n}... (espera 5 segundos)`);
  calcular_y_avisar_despues(n, callbackAvisoDespues);
});

/* =========================================================
   3) calcular_y_avisar_dependiendo(numero, callback, callback_error)
   ========================================================= */

/**
 * “Sumatorias sucesivas desde 1 hasta número”
 * Ejemplo N=5:
 * 1
 * 1+2
 * 1+2+3
 * 1+2+3+4
 * 1+2+3+4+5
 * Resultado total = 35 (suma de todas esas líneas)  [oai_citation:10‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 *
 * Si resultado < 1000 => callback
 * Si resultado >= 1000 => callback_error (pero mostrando el resultado igualmente)  [oai_citation:11‡Funciones Callback en JavaScript.pdf](sediment://file_00000000ce1071f58eb3b33c901ad752)
 */
function calcular_y_avisar_dependiendo(numero, callback, callback_error) {
  let resultadoTotal = 0;

  // Vamos construyendo la sumatoria parcial:
  // parcial = 1, luego 1+2, luego 1+2+3...
  let parcial = 0;

  for (let i = 1; i <= numero; i++) {
    parcial += i;
    resultadoTotal += parcial;
  }

  if (resultadoTotal < 1000) {
    callback(numero, resultadoTotal);
  } else {
    callback_error(numero, resultadoTotal);
  }
}

/* Callbacks para el ejercicio 3 */
function callbackExitoSucesivas(numero, resultado) {
  print(`✅ Las sumatorias sucesivas de ${numero} es ${resultado}`);
}

function callbackErrorSucesivas(numero, resultado) {
  print(`⚠️ Error: el número ${numero} sobrepasa el objetivo de la función. Resultado obtenido: ${resultado}`);
}

/* Botón 3 */
document.querySelector("#btnSucesivas").addEventListener("click", () => {
  resetOutput();
  print("== calcular_y_avisar_dependiendo(N, callback, callback_error) ==");

  const n = Number(document.querySelector("#numSucesivas").value);

  if (!Number.isFinite(n) || n < 1) {
    print("❌ Error: ingresa un N válido (N >= 1).");
    return;
  }

  calcular_y_avisar_dependiendo(n, callbackExitoSucesivas, callbackErrorSucesivas);
});