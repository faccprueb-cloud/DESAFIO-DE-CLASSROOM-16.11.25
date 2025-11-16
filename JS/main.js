const appContainer = document.getElementById('app-container');

let tempsFiebreList = [];
let saturacionesList = [];
let diametrosCrateresList = [];
let nivelesLuzList = [];
let tempsFocosCalorList = [];
let nivelesRioList = [];

function mostrarEjercicio(id) {
  appContainer.innerHTML = '';
  switch (id) {
    case 'salud-1':
      cargarEjercicioSalud1();
      break;
    case 'salud-2':
      cargarEjercicioSalud2();
      break;
    case 'salud-3':
      cargarEjercicioSalud3();
      break;
    case 'salud-4':
      cargarEjercicioSalud4();
      break;
    case 'salud-5':
      cargarEjercicioSalud5();
      break;
    case 'astro-1':
      cargarEjercicioAstro1();
      break;
    case 'astro-2':
      cargarEjercicioAstro2();
      break;
    case 'astro-3':
      cargarEjercicioAstro3();
      break;
    case 'astro-4':
      cargarEjercicioAstro4();
      break;
    case 'astro-5':
      cargarEjercicioAstro5();
      break;
    case 'amb-1':
      cargarEjercicioAmb1();
      break;
    case 'amb-2':
      cargarEjercicioAmb2();
      break;
    case 'amb-3':
      cargarEjercicioAmb3();
      break;
    case 'amb-4':
      cargarEjercicioAmb4();
      break;
    case 'amb-5':
      cargarEjercicioAmb5();
      break;
    default:
      appContainer.innerHTML = '<h2>Ejercicio no encontrado</h2>';
  }
}

function cargarEjercicioSalud1() {
  appContainer.innerHTML = `
    <h2>1. IF - Clasificación de Presión Arterial</h2>
    <div class="ejercicio-box">
      <label for="sistolica">Presión Sistólica (ej. 120):</label>
      <input type="number" id="sistolica" placeholder="Sistólica (alta)">
      <label for="diastolica">Presión Diastólica (ej. 80):</label>
      <input type="number" id="diastolica" placeholder="Diastólica (baja)">
      <button onclick="calcularPresion()">Calcular</button>
      <div id="resultado"></div>
    </div>
  `;
}

function calcularPresion() {
  const sistolica = parseInt(document.getElementById('sistolica').value);
  const diastolica = parseInt(document.getElementById('diastolica').value);
  const resultadoDiv = document.getElementById('resultado');
  let clasificacion = '';
  let claseCSS = '';

  if (isNaN(sistolica) || isNaN(diastolica)) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese valores válidos para ambas presiones.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  if (sistolica < 120 && diastolica < 80) {
    clasificacion = 'Normal';
    claseCSS = 'resultado-normal';
  } else if (sistolica >= 120 && sistolica <= 129 && diastolica < 80) {
    clasificacion = 'Elevada';
    claseCSS = 'resultado-elevada';
  } else if ((sistolica >= 130 && sistolica <= 139) || (diastolica >= 80 && diastolica <= 89)) {
    clasificacion = 'Hipertensión (HTA) grado 1';
    claseCSS = 'resultado-hta1';
  } else if (sistolica >= 140 || diastolica >= 90) {
    clasificacion = 'Hipertensión (HTA) grado 2';
    claseCSS = 'resultado-hta2';
  } else {
    clasificacion = 'Datos no válidos. Revise los números.';
    claseCSS = '';
  }

  resultadoDiv.innerHTML = `Clasificación: <strong>${clasificacion}</strong>`;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioSalud2() {
  appContainer.innerHTML = `
    <h2>2. FOR - Registrar Temperatura de Pacientes</h2>
    <div class="ejercicio-box">
      <label for="numPacientes">Número de pacientes a registrar:</label>
      <input type="number" id="numPacientes" min="1" placeholder="Ej. 5">
      <button onclick="generarCamposTemp()">Generar Campos</button>
      <div id="campos-temperatura" style="margin-top: 15px;"></div>
      <div id="resultado"></div>
    </div>
  `;
}

function generarCamposTemp() {
  const numPacientes = parseInt(document.getElementById('numPacientes').value);
  const camposDiv = document.getElementById('campos-temperatura');
  const resultadoDiv = document.getElementById('resultado');

  camposDiv.innerHTML = '';
  resultadoDiv.innerHTML = '';

  if (isNaN(numPacientes) || numPacientes <= 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  let inputsHTML = '';
  for (let i = 1; i <= numPacientes; i++) {
    inputsHTML += `
      <label for="temp-${i}">Temperatura Paciente ${i} (°C):</label>
      <input type="number" step="0.1" id="temp-${i}" class="temp-paciente" placeholder="Ej. 37.5" style="margin-bottom: 5px;">
    `;
  }

  camposDiv.innerHTML = inputsHTML;
  camposDiv.innerHTML += `
    <button onclick="calcularPromedioTemp()" style="margin-top: 10px;">Calcular Promedio</button>
  `;
}

function calcularPromedioTemp() {
  const inputs = document.querySelectorAll('.temp-paciente');
  const resultadoDiv = document.getElementById('resultado');
  let suma = 0;
  let conteoFiebre = 0;
  const numPacientes = inputs.length;

  for (let i = 0; i < numPacientes; i++) {
    const temp = parseFloat(inputs[i].value);
    if (isNaN(temp)) {
      resultadoDiv.innerHTML = '<strong class="error-text">Error: Ingrese todas las temperaturas.</strong>';
      resultadoDiv.className = 'resultado';
      return;
    }
    suma += temp;
    if (temp >= 38) {
      conteoFiebre++;
    }
  }

  const promedio = suma / numPacientes;
  resultadoDiv.innerHTML = `
    <p><strong>Promedio de Temperatura:</strong> ${promedio.toFixed(2)} °C</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p>Pacientes con fiebre (&ge; 38°C): <strong>${conteoFiebre}</strong></p>
  `;
  resultadoDiv.className = 'resultado resultado-normal';
}

function cargarEjercicioSalud3() {
  tempsFiebreList = [];
  appContainer.innerHTML = `
    <h2>3. WHILE - Contar Pacientes con Fiebre</h2>
    <div class="ejercicio-box">
      <label for="tempPaciente">Ingresar Temperatura (°C):</label>
      <input type="number" step="0.1" id="tempPaciente" placeholder="Ej. 38.5 (Ingrese 0 para parar)">
      <button onclick="agregarTempFiebre()">Agregar Temperatura</button>
      <div id="listaTemps" style="margin-top: 15px;">
        <p>Temperaturas registradas:</p>
        <ul id="temps-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarTempFiebre() {
  const tempInput = document.getElementById('tempPaciente');
  const temp = parseFloat(tempInput.value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(temp)) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  if (temp === 0) {
    calcularFiebre();
    tempInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
  } else {
    tempsFiebreList.push(temp);
    const listaUL = document.getElementById('temps-ul');
    const li = document.createElement('li');
    li.textContent = `${temp} °C`;
    listaUL.appendChild(li);
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = '';
    tempInput.value = '';
    tempInput.focus();
  }
}

function calcularFiebre() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoFiebre = 0;
  let i = 0;

  while (i < tempsFiebreList.length) {
    if (tempsFiebreList[i] >= 38) {
      conteoFiebre++;
    }
    i++;
  }

  const totalPacientes = tempsFiebreList.length;
  const porcentaje = totalPacientes > 0 ? (conteoFiebre / totalPacientes) * 100 : 0;

  resultadoDiv.innerHTML = `
    <p><strong>Total de pacientes registrados:</strong> ${totalPacientes}</p>
    <p><strong>Pacientes con fiebre (&ge; 38°C):</strong> ${conteoFiebre}</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Porcentaje de pacientes con fiebre:</strong> ${porcentaje.toFixed(1)} %</p>
  `;
  resultadoDiv.className = 'resultado resultado-normal';
}

function cargarEjercicioSalud4() {
  appContainer.innerHTML = `
    <h2>4. SWITCH - Clasificación de TRIAGE</h2>
    <div class="ejercicio-box">
      <label for="codigoTriage">Ingresar Código (1-4):</label>
      <input type="number" id="codigoTriage" min="1" max="4" placeholder="Ej. 1">
      <button onclick="clasificarTriage()">Clasificar</button>
      <div id="resultado"></div>
      <div style="margin-top: 20px; font-size: 0.9em;">
        <p>(Ampliación "Plus")</p>
        <p><strong>Códigos:</strong></p>
        <ul>
          <li>1: Rojo (Resucitación)</li>
          <li>2: Amarillo (Emergencia)</li>
          <li>3: Verde (Urgencia)</li>
          <li>4: Azul (No Urgente)</li>
        </ul>
      </div>
    </div>
  `;
}

function clasificarTriage() {
  const codigo = parseInt(document.getElementById('codigoTriage').value);
  const resultadoDiv = document.getElementById('resultado');
  let categoria = '';
  let claseCSS = '';

  switch (codigo) {
    case 1:
      categoria = 'Rojo (Resucitación)';
      claseCSS = 'resultado-hta2';
      break;
    case 2:
      categoria = 'Amarillo (Emergencia)';
      claseCSS = 'resultado-elevada';
      break;
    case 3:
      categoria = 'Verde (Urgencia)';
      claseCSS = 'resultado-normal';
      break;
    case 4:
      categoria = 'Azul (No Urgente)';
      claseCSS = 'resultado-normal';
      break;
    default:
      categoria = 'Código no válido. Use 1, 2, 3 ó 4.';
      claseCSS = '';
  }

  resultadoDiv.innerHTML = `Categoría: <strong>${categoria}</strong>`;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioSalud5() {
  saturacionesList = [];
  appContainer.innerHTML = `
    <h2>5. DO WHILE - Repetir Mediciones SpO2</h2>
    <div class="ejercicio-box">
      <label for="saturacion">Ingresar Saturación (%):</label>
      <input type="text" id="saturacion" placeholder="Ej. 98 (Escriba 'no' para parar)">
      <button onclick="agregarSaturacion()">Agregar Medición</button>
      <div id="listaSats" style="margin-top: 15px;">
        <p>Saturaciones registradas:</p>
        <ul id="sats-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarSaturacion() {
  const satInput = document.getElementById('saturacion');
  const valor = satInput.value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultado');

  if (valor === 'no') {
    calcularSaturacion();
    satInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
    return;
  }

  const saturacion = parseFloat(valor);
  if (isNaN(saturacion) || saturacion < 0 || saturacion > 100) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido (0-100) o "no".</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  saturacionesList.push(saturacion);
  const listaUL = document.getElementById('sats-ul');
  const li = document.createElement('li');
  li.textContent = `${saturacion} % SpO2`;
  listaUL.appendChild(li);
  resultadoDiv.innerHTML = '';
  resultadoDiv.className = '';
  satInput.value = '';
  satInput.focus();
}

function calcularSaturacion() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoBajo = 0;
  let i = 0;

  if (saturacionesList.length === 0) {
    resultadoDiv.innerHTML = '<p>No se ingresaron mediciones.</p>';
    resultadoDiv.className = 'resultado';
    return;
  }

  do {
    if (saturacionesList[i] < 92) {
      conteoBajo++;
    }
    i++;
  } while (i < saturacionesList.length);

  const totalMediciones = saturacionesList.length;
  const promedio = saturacionesList.reduce((a, b) => a + b, 0) / totalMediciones;

  resultadoDiv.innerHTML = `
    <p><strong>Total de mediciones:</strong> ${totalMediciones}</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Promedio de Saturación:</strong> ${promedio.toFixed(1)} % SpO2</p>
    <p><strong>Mediciones Bajas (&lt; 92%):</strong> ${conteoBajo}</p>
  `;
  if (conteoBajo > 0) {
    resultadoDiv.className = 'resultado resultado-hta1';
  } else {
    resultadoDiv.className = 'resultado resultado-normal';
  }
}

function cargarEjercicioAstro1() {
  appContainer.innerHTML = `
    <h2>1. IF - Clasificación de Brillo Estelar (Magnitud)</h2>
    <div class="ejercicio-box">
      <label for="magnitud">Magnitud Aparente (ej. -1.5):</label>
      <input type="number" step="0.1" id="magnitud" placeholder="Ej. 6.5">
      <button onclick="clasificarBrillo()">Clasificar</button>
      <div id="resultado"></div>
      <div style="margin-top: 20px; font-size: 0.9em;">
        <p>(Ampliación "Plus")</p>
        <p><strong>Guía de Magnitud:</strong></p>
        <ul>
          <li>Menor a -2: Extremadamente Brillante</li>
          <li>-2 a 1: Muy Brillante</li>
          <li>1 a 4: Brillante</li>
          <li>4 a 6: Débil</li>
          <li>Mayor a 6: No Visible</li>
        </ul>
      </div>
    </div>
  `;
}

function clasificarBrillo() {
  const magnitudInput = document.getElementById('magnitud');
  const magnitud = parseFloat(magnitudInput.value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(magnitud)) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un valor numérico.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  let clasificacion = '';
  let claseCSS = '';

  if (magnitud < -2) {
    clasificacion = 'Extremadamente Brillante';
    claseCSS = 'resultado-elevada';
  } else if (magnitud >= -2 && magnitud < 1) {
    clasificacion = 'Muy Brillante';
    claseCSS = 'resultado-normal';
  } else if (magnitud >= 1 && magnitud < 4) {
    clasificacion = 'Brillante';
    claseCSS = 'resultado-normal';
  } else if (magnitud >= 4 && magnitud <= 6) {
    clasificacion = 'Débil (Apenas visible)';
    claseCSS = 'resultado-hta1';
  } else {
    clasificacion = 'No Visible (a simple vista)';
    claseCSS = 'resultado-hta2';
  }

  resultadoDiv.innerHTML = `Clasificación: <strong>${clasificacion}</strong>`;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioAstro2() {
  appContainer.innerHTML = `
    <h2>2. FOR - Registrar Distancias de Planetas</h2>
    <div class="ejercicio-box">
      <label for="numPlanetas">Número de planetas a registrar:</label>
      <input type="number" id="numPlanetas" min="1" placeholder="Ej. 4">
      <button onclick="generarCamposDist()">Generar Campos</button>
      <div id="campos-distancia" style="margin-top: 15px;"></div>
      <div id="resultado"></div>
    </div>
  `;
}

function generarCamposDist() {
  const numPlanetas = parseInt(document.getElementById('numPlanetas').value);
  const camposDiv = document.getElementById('campos-distancia');
  const resultadoDiv = document.getElementById('resultado');

  camposDiv.innerHTML = '';
  resultadoDiv.innerHTML = '';

  if (isNaN(numPlanetas) || numPlanetas <= 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  let inputsHTML = '';
  for (let i = 1; i <= numPlanetas; i++) {
    inputsHTML += `
      <label for="dist-${i}">Distancia Planeta ${i} (en millones de km):</label>
      <input type="number" step="0.1" id="dist-${i}" class="dist-planeta" placeholder="Ej. 149.6" style="margin-bottom: 5px;">
    `;
  }

  camposDiv.innerHTML = inputsHTML;
  camposDiv.innerHTML += `
    <button onclick="calcularPromedioDist()" style="margin-top: 10px;">Calcular Promedio</button>
  `;
}

function calcularPromedioDist() {
  const inputs = document.querySelectorAll('.dist-planeta');
  const resultadoDiv = document.getElementById('resultado');
  let suma = 0;
  let distancias = [];
  const numPlanetas = inputs.length;

  for (let i = 0; i < numPlanetas; i++) {
    const dist = parseFloat(inputs[i].value);
    if (isNaN(dist) || dist < 0) {
      resultadoDiv.innerHTML = '<strong class="error-text">Error: Ingrese todas las distancias correctamente.</strong>';
      resultadoDiv.className = 'resultado';
      return;
    }
    suma += dist;
    distancias.push(dist);
  }

  const promedio = suma / numPlanetas;
  const masCercano = Math.min(...distancias);
  const masLejano = Math.max(...distancias);

  resultadoDiv.innerHTML = `
    <p><strong>Promedio de Distancia:</strong> ${promedio.toFixed(2)} millones de km</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Planeta más cercano:</strong> ${masCercano} millones de km</p>
    <p><strong>Planeta más lejano:</strong> ${masLejano} millones de km</p>
  `;
  resultadoDiv.className = 'resultado resultado-normal';
}

function cargarEjercicioAstro3() {
  diametrosCrateresList = [];
  appContainer.innerHTML = `
    <h2>3. WHILE - Contar Cráteres Lunares Grandes</h2>
    <div class="ejercicio-box">
      <label for="diametroCrater">Ingresar Diámetro del Cráter (km):</label>
      <input type="number" step="0.1" id="diametroCrater" placeholder="Ej. 85 (Ingrese 0 para parar)">
      <button onclick="agregarCrater()">Agregar Cráter</button>
      <div id="listaCrateres" style="margin-top: 15px;">
        <p>Diámetros registrados:</p>
        <ul id="crateres-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarCrater() {
  const craterInput = document.getElementById('diametroCrater');
  const diametro = parseFloat(craterInput.value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(diametro) || diametro < 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  if (diametro === 0) {
    calcularCrateres();
    craterInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
  } else {
    diametrosCrateresList.push(diametro);
    const listaUL = document.getElementById('crateres-ul');
    const li = document.createElement('li');
    li.textContent = `${diametro} km`;
    listaUL.appendChild(li);
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = '';
    craterInput.value = '';
    craterInput.focus();
  }
}

function calcularCrateres() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoGrandes = 0;
  let sumaGrandes = 0;
  let i = 0;

  while (i < diametrosCrateresList.length) {
    if (diametrosCrateresList[i] > 50) {
      conteoGrandes++;
      sumaGrandes += diametrosCrateresList[i];
    }
    i++;
  }

  const totalCrateres = diametrosCrateresList.length;
  const promedioGrandes = conteoGrandes > 0 ? sumaGrandes / conteoGrandes : 0;

  resultadoDiv.innerHTML = `
    <p><strong>Total de cráteres registrados:</strong> ${totalCrateres}</p>
    <p><strong>Cráteres grandes (&gt; 50 km):</strong> ${conteoGrandes}</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Diámetro promedio (solo grandes):</strong> ${promedioGrandes.toFixed(2)} km</p>
  `;
  resultadoDiv.className = 'resultado resultado-normal';
}

function cargarEjercicioAstro4() {
  appContainer.innerHTML = `
    <h2>4. SWITCH - Identificar Cuerpo Celeste</h2>
    <div class="ejercicio-box">
      <label for="codigoCuerpo">Ingresar Código (1-5):</label>
      <input type="number" id="codigoCuerpo" min="1" max="5" placeholder="Ej. 1">
      <button onclick="clasificarCuerpo()">Clasificar</button>
      <div id="resultado"></div>
      <div style="margin-top: 20px; font-size: 0.9em;">
        <p>(Ampliación "Plus")</p>
        <p><strong>Códigos:</strong></p>
        <ul>
          <li>1: Estrella</li>
          <li>2: Planeta</li>
          <li>3: Cometa</li>
          <li>4: Asteroide</li>
          <li>5: Galaxia</li>
        </ul>
      </div>
    </div>
  `;
}

function clasificarCuerpo() {
  const codigo = parseInt(document.getElementById('codigoCuerpo').value);
  const resultadoDiv = document.getElementById('resultado');
  let tipo = '';
  let claseCSS = 'resultado-normal';

  switch (codigo) {
    case 1:
      tipo = 'Estrella';
      break;
    case 2:
      tipo = 'Planeta';
      break;
    case 3:
      tipo = 'Cometa';
      break;
    case 4:
      tipo = 'Asteroide';
      break;
    case 5:
      tipo = 'Galaxia';
      break;
    default:
      tipo = 'Código no válido. Use 1-5.';
      claseCSS = 'resultado-hta1';
  }

  resultadoDiv.innerHTML = `Tipo de Cuerpo: <strong>${tipo}</strong>`;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioAstro5() {
  nivelesLuzList = [];
  appContainer.innerHTML = `
    <h2>5. DO WHILE - Registro de Niveles de Luz (lux)</h2>
    <div class="ejercicio-box">
      <label for="nivelLuz">Ingresar Nivel de Luz (lux):</label>
      <input type="text" id="nivelLuz" placeholder="Ej. 100 (Escriba 'no' para parar)">
      <button onclick="agregarLuz()">Agregar Medición</button>
      <div id="listaLuz" style="margin-top: 15px;">
        <p>Mediciones registradas:</p>
        <ul id="luz-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarLuz() {
  const luzInput = document.getElementById('nivelLuz');
  const valor = luzInput.value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultado');

  if (valor === 'no') {
    calcularLuz();
    luzInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
    return;
  }

  const lux = parseFloat(valor);
  if (isNaN(lux) || lux < 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido (&ge; 0) o "no".</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  nivelesLuzList.push(lux);
  const listaUL = document.getElementById('luz-ul');
  const li = document.createElement('li');
  li.textContent = `${lux} lux`;
  if (lux < 5) {
    li.textContent += ' (Noche Profunda)';
  }
  listaUL.appendChild(li);
  resultadoDiv.innerHTML = '';
  resultadoDiv.className = '';
  luzInput.value = '';
  luzInput.focus();
}

function calcularLuz() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoNocheProfunda = 0;
  let i = 0;

  if (nivelesLuzList.length === 0) {
    resultadoDiv.innerHTML = '<p>No se ingresaron mediciones.</p>';
    resultadoDiv.className = 'resultado';
    return;
  }

  do {
    if (nivelesLuzList[i] < 5) {
      conteoNocheProfunda++;
    }
    i++;
  } while (i < nivelesLuzList.length);

  const totalMediciones = nivelesLuzList.length;
  const promedio = nivelesLuzList.reduce((a, b) => a + b, 0) / totalMediciones;

  resultadoDiv.innerHTML = `
    <p><strong>Total de mediciones:</strong> ${totalMediciones}</p>
    <p><strong>Promedio de Luz:</strong> ${promedio.toFixed(2)} lux</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Mediciones de "Noche Profunda" (&lt; 5 lux):</strong> ${conteoNocheProfunda}</p>
  `;
  if (conteoNocheProfunda > 0) {
    resultadoDiv.className = 'resultado resultado-elevada';
  } else {
    resultadoDiv.className = 'resultado resultado-normal';
  }
}

function cargarEjercicioAmb1() {
  appContainer.innerHTML = `
    <h2>1. IF - Clasificación de Calidad del Aire (AQI)</h2>
    <div class="ejercicio-box">
      <label for="aqi">Valor AQI (Índice de Calidad del Aire):</label>
      <input type="number" id="aqi" placeholder="Ej. 45">
      <button onclick="clasificarAQI()">Clasificar</button>
      <div id="resultado"></div>
      <div style="margin-top: 20px; font-size: 0.9em;">
        <p>(Ampliación "Plus")</p>
        <p><strong>Guía de AQI:</strong></p>
        <ul>
          <li>0-50: Bueno (Verde)</li>
          <li>51-100: Moderado (Amarillo)</li>
          <li>101-150: Dañino (Naranja)</li>
          <li>151+: Peligroso (Rojo)</li>
        </ul>
      </div>
    </div>
  `;
}

function clasificarAQI() {
  const aqiInput = document.getElementById('aqi');
  const aqi = parseInt(aqiInput.value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(aqi) || aqi < 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un valor numérico válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  let clasificacion = '';
  let claseCSS = '';

  if (aqi >= 0 && aqi <= 50) {
    clasificacion = 'Bueno';
    claseCSS = 'resultado-normal';
  } else if (aqi >= 51 && aqi <= 100) {
    clasificacion = 'Moderado';
    claseCSS = 'resultado-elevada';
  } else if (aqi >= 101 && aqi <= 150) {
    clasificacion = 'Dañino (para grupos sensibles)';
    claseCSS = 'resultado-hta1';
  } else {
    clasificacion = 'Peligroso';
    claseCSS = 'resultado-hta2';
  }

  resultadoDiv.innerHTML = `Clasificación: <strong>${clasificacion}</strong>`;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioAmb2() {
  appContainer.innerHTML = `
    <h2>2. FOR - Registrar Niveles de Ruido Ambiental (dB)</h2>
    <div class="ejercicio-box">
      <label for="numMediciones">Número de mediciones a registrar:</label>
      <input type="number" id="numMediciones" min="1" placeholder="Ej. 5">
      <button onclick="generarCamposRuido()">Generar Campos</button>
      <div id="campos-ruido" style="margin-top: 15px;"></div>
      <div id="resultado"></div>
    </div>
  `;
}

function generarCamposRuido() {
  const numMediciones = parseInt(document.getElementById('numMediciones').value);
  const camposDiv = document.getElementById('campos-ruido');
  const resultadoDiv = document.getElementById('resultado');

  camposDiv.innerHTML = '';
  resultadoDiv.innerHTML = '';

  if (isNaN(numMediciones) || numMediciones <= 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  let inputsHTML = '';
  for (let i = 1; i <= numMediciones; i++) {
    inputsHTML += `
      <label for="db-${i}">Medición ${i} (en dB):</label>
      <input type="number" step="0.1" id="db-${i}" class="db-medicion" placeholder="Ej. 65.5" style="margin-bottom: 5px;">
    `;
  }

  camposDiv.innerHTML = inputsHTML;
  camposDiv.innerHTML += `
    <button onclick="calcularPromedioRuido()" style="margin-top: 10px;">Calcular Promedio</button>
  `;
}

function calcularPromedioRuido() {
  const inputs = document.querySelectorAll('.db-medicion');
  const resultadoDiv = document.getElementById('resultado');
  let suma = 0;
  let mediciones = [];
  const numMediciones = inputs.length;

  for (let i = 0; i < numMediciones; i++) {
    const db = parseFloat(inputs[i].value);
    if (isNaN(db) || db < 0) {
      resultadoDiv.innerHTML = '<strong class="error-text">Error: Ingrese todas las mediciones correctamente.</strong>';
      resultadoDiv.className = 'resultado';
      return;
    }
    suma += db;
    mediciones.push(db);
  }

  const promedio = suma / numMediciones;
  let clasificacionRuido = '';

  if (promedio < 55) {
    clasificacionRuido = 'Tranquilo';
  } else if (promedio <= 70) {
    clasificacionRuido = 'Moderado';
  } else if (promedio <= 85) {
    clasificacionRuido = 'Alto (Molesto)';
  } else {
    clasificacionRuido = 'Muy Alto (Peligroso)';
  }

  resultadoDiv.innerHTML = `
    <p><strong>Promedio de Ruido:</strong> ${promedio.toFixed(2)} dB</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Nivel de Ruido:</strong> ${clasificacionRuido}</p>
    <p><strong>Medición Más Baja:</strong> ${Math.min(...mediciones)} dB</p>
    <p><strong>Medición Más Alta:</strong> ${Math.max(...mediciones)} dB</p>
  `;
  resultadoDiv.className = 'resultado resultado-normal';
}

function cargarEjercicioAmb3() {
  tempsFocosCalorList = [];
  appContainer.innerHTML = `
    <h2>3. WHILE - Contar Focos de Calor (Incendios)</h2>
    <div class="ejercicio-box">
      <label for="tempFoco">Ingresar Temperatura del Foco (°C):</label>
      <input type="number" step="0.1" id="tempFoco" placeholder="Ej. 55 (Ingrese 0 para parar)">
      <button onclick="agregarFoco()">Agregar Foco</button>
      <div id="listaFocos" style="margin-top: 15px;">
        <p>Temperaturas registradas:</p>
        <ul id="focos-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarFoco() {
  const focoInput = document.getElementById('tempFoco');
  const temp = parseFloat(focoInput.value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(temp) || temp < 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido.</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  if (temp === 0) {
    calcularFocos();
    focoInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
  } else {
    tempsFocosCalorList.push(temp);
    const listaUL = document.getElementById('focos-ul');
    const li = document.createElement('li');
    li.textContent = `${temp} °C`;
    if (temp > 45) {
      li.textContent += ' (¡Alerta!)';
      li.style.color = '#b91c1c';
      li.style.fontWeight = 'bold';
    }
    listaUL.appendChild(li);
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = '';
    focoInput.value = '';
    focoInput.focus();
  }
}

function calcularFocos() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoAlto = 0;
  let i = 0;

  while (i < tempsFocosCalorList.length) {
    if (tempsFocosCalorList[i] > 45) {
      conteoAlto++;
    }
    i++;
  }

  const totalFocos = tempsFocosCalorList.length;
  const maxTemp = totalFocos > 0 ? Math.max(...tempsFocosCalorList) : 0;

  resultadoDiv.innerHTML = `
    <p><strong>Total de focos registrados:</strong> ${totalFocos}</p>
    <p><strong>Focos con alerta (&gt; 45°C):</strong> ${conteoAlto}</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Temperatura máxima registrada:</strong> ${maxTemp.toFixed(1)} °C</p>
  `;
  if (conteoAlto > 0) {
    resultadoDiv.className = 'resultado resultado-hta2';
  } else {
    resultadoDiv.className = 'resultado resultado-normal';
  }
}

function cargarEjercicioAmb4() {
  appContainer.innerHTML = `
    <h2>4. SWITCH - Clasificación del Tipo de Residuo</h2>
    <div class="ejercicio-box">
      <label for="codigoResiduo">Ingresar Código (1-4):</label>
      <input type="number" id="codigoResiduo" min="1" max="4" placeholder="Ej. 1">
      <button onclick="clasificarResiduo()">Clasificar</button>
      <div id="resultado"></div>
      <div style="margin-top: 20px; font-size: 0.9em;">
        <p><strong>Códigos:</strong></p>
        <ul>
          <li>1: Orgánico</li>
          <li>2: Plástico</li>
          <li>3: Papel/Cartón</li>
          <li>4: Vidrio</li>
        </ul>
      </div>
    </div>
  `;
}

function clasificarResiduo() {
  const codigo = parseInt(document.getElementById('codigoResiduo').value);
  const resultadoDiv = document.getElementById('resultado');
  let tipo = '';
  let descripcion = '';
  let claseCSS = 'resultado-normal';

  switch (codigo) {
    case 1:
      tipo = 'Orgánico';
      descripcion = 'Ej: Restos de comida, cáscaras de fruta, hojas.';
      break;
    case 2:
      tipo = 'Plástico';
      descripcion = 'Ej: Botellas PET, envases, bolsas.';
      break;
    case 3:
      tipo = 'Papel/Cartón';
      descripcion = 'Ej: Cajas, periódicos, hojas de oficina.';
      break;
    case 4:
      tipo = 'Vidrio';
      descripcion = 'Ej: Botellas de bebida, frascos.';
      break;
    default:
      tipo = 'Código no válido. Use 1-4.';
      descripcion = '';
      claseCSS = 'resultado-hta1';
  }

  resultadoDiv.innerHTML = `
    <p>Tipo de Residuo: <strong>${tipo}</strong></p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p style="font-size: 1rem;">${descripcion}</p>
  `;
  resultadoDiv.className = 'resultado';
  if (claseCSS) {
    resultadoDiv.classList.add(claseCSS);
  }
}

function cargarEjercicioAmb5() {
  nivelesRioList = [];
  appContainer.innerHTML = `
    <h2>5. DO WHILE - Monitoreo de Niveles del Río</h2>
    <div class="ejercicio-box">
      <label for="nivelRio">Ingresar Nivel del Río (metros):</label>
      <input type="text" id="nivelRio" placeholder="Ej. 2.5 (Escriba 'no' para parar)">
      <button onclick="agregarNivelRio()">Agregar Medición</button>
      <div id="listaNiveles" style="margin-top: 15px;">
        <p>Niveles registrados:</p>
        <ul id="niveles-ul"></ul>
      </div>
      <div id="resultado"></div>
    </div>
  `;
}

function agregarNivelRio() {
  const nivelInput = document.getElementById('nivelRio');
  const valor = nivelInput.value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultado');

  if (valor === 'no') {
    calcularNivelesRio();
    nivelInput.disabled = true;
    document.querySelector('.ejercicio-box button').disabled = true;
    return;
  }

  const nivel = parseFloat(valor);
  if (isNaN(nivel) || nivel < 0) {
    resultadoDiv.innerHTML = '<strong class="error-text">Ingrese un número válido (&ge; 0) o "no".</strong>';
    resultadoDiv.className = 'resultado';
    return;
  }

  nivelesRioList.push(nivel);
  const listaUL = document.getElementById('niveles-ul');
  const li = document.createElement('li');
  li.textContent = `${nivel} m`;
  if (nivel > 3) {
    li.textContent += ' (¡ALERTA DE DESBORDE!)';
    li.style.color = '#b91c1c';
    li.style.fontWeight = 'bold';
  }
  listaUL.appendChild(li);
  resultadoDiv.innerHTML = '';
  resultadoDiv.className = '';
  nivelInput.value = '';
  nivelInput.focus();
}

function calcularNivelesRio() {
  const resultadoDiv = document.getElementById('resultado');
  let conteoAlertas = 0;
  let i = 0;

  if (nivelesRioList.length === 0) {
    resultadoDiv.innerHTML = '<p>No se ingresaron mediciones.</p>';
    resultadoDiv.className = 'resultado';
    return;
  }

  do {
    if (nivelesRioList[i] > 3) {
      conteoAlertas++;
    }
    i++;
  } while (i < nivelesRioList.length);

  const totalMediciones = nivelesRioList.length;
  const promedio = nivelesRioList.reduce((a, b) => a + b, 0) / totalMediciones;
  const maxNivel = Math.max(...nivelesRioList);

  resultadoDiv.innerHTML = `
    <p><strong>Total de mediciones:</strong> ${totalMediciones}</p>
    <p><strong>Mediciones en Alerta (&gt; 3 m):</strong> ${conteoAlertas}</p>
    <p style="font-size: 0.9em;">(Ampliación "Plus")</p>
    <p><strong>Nivel Promedio:</strong> ${promedio.toFixed(2)} m</p>
    <p><strong>Nivel Máximo Registrado:</strong> ${maxNivel.toFixed(2)} m</p>
  `;
  if (conteoAlertas > 0) {
    resultadoDiv.className = 'resultado resultado-hta2';
  } else {
    resultadoDiv.className = 'resultado resultado-normal';
  }
}
