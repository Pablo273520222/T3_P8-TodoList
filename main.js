// Seleccionar los elementos
const formulario = document.querySelector('form');
const entrada = document.querySelector('input');
const listaUl = document.querySelector('ul');
const vacio = document.querySelector('.empty');
const contadorTareas = document.querySelector('.task-count span:last-child');

// Array para almacenar tareas
let tareas = [];

// Cargar tareas desde el almacenamiento local al cargar
cargarTareas();

// Cargar tareas desde el almacenamiento local
function cargarTareas() {
  const tareasAlmacenadas = localStorage.getItem('tareas');
  if (tareasAlmacenadas) {
    tareas = JSON.parse(tareasAlmacenadas);
    renderizarTareas();
  }
}

// Guardar tareas en el almacenamiento local
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Renderizar tareas
function renderizarTareas() {
  // Borrar la lista actual
  listaUl.innerHTML = '';

  // Renderizar cada tarea
  tareas.forEach(tarea => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>${tarea}</p>
      <button class="btn-delete">x</button>
    `;

    listaUl.appendChild(li);
  });

  // Mostrar/ocultar el mensaje de vacío
  if (tareas.length === 0) {
    vacio.style.display = 'block';
  } else {
    vacio.style.display = 'none';
  }

  // Actualizar el contador de tareas
  contadorTareas.textContent = tareas.length;
}

// Agregar nueva tarea
formulario.addEventListener('submit', e => {
  e.preventDefault();

  const tarea = entrada.value.trim();

  if (tarea !== '') {
    tareas.push(tarea);
    guardarTareas();
    renderizarTareas();
    entrada.value = '';
  }
});

// Eliminar tarea
listaUl.addEventListener('click', e => {
  if (e.target.classList.contains('btn-delete')) {
    const indice = tareas.indexOf(e.target.parentElement.firstElementChild.textContent);
    tareas.splice(indice, 1);
    guardarTareas();
    renderizarTareas();
  }
});