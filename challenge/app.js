//  Referencias a los elementos del DOM
const inputAmigo   = document.getElementById('amigo');
const listaAmigos  = document.getElementById('listaAmigos');
const resultado    = document.getElementById('resultado');

//  Array para almacenar los nombres ingresados
let amigos = [];

/**
 * renderizarLista:
 * - Limpia la lista existente.
 * - Construye cada <li> incluyendo un botón de eliminar.
 */
function renderizarLista() {
  let html = '';
  amigos.forEach((amigo, index) => {
    html += `
      <li>
        ${amigo}
        <button class="delete-btn" data-index="${index}">
          Eliminar
        </button>
      </li>`;
  });
  listaAmigos.innerHTML = html;
}

/**
 * agregarAmigo:
 * - Valida que el input no esté vacío.
 * - Verifica que el nombre no exista aún en el array.
 * - Agrega, renderiza y limpia el input.
 */
function agregarAmigo() {
  const nombre = inputAmigo.value.trim();
  if (!nombre) {
    alert('Por favor ingresa un nombre válido');
    return;
  }
  if (amigos.includes(nombre)) {
    alert('Ese nombre ya está en la lista');
    return;
  }

  amigos.push(nombre);
  renderizarLista();

  inputAmigo.value = '';
  inputAmigo.focus();
}

/**
 * eliminarAmigo:
 * - Quita del array el índice recibido y vuelve a renderizar.
 */
function eliminarAmigo(index) {
  amigos.splice(index, 1);
  renderizarLista();
  // Si ya se había sorteado algo, opcionalmente lo limpiamos:
  resultado.innerHTML = '';
}

/**
 * sortearAmigo:
 * - Selecciona un índice al azar y muestra el resultado.
 */
function sortearAmigo() {
  if (amigos.length === 0) {
    alert('No hay amigos para sortear');
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const seleccionado = amigos[indiceAleatorio];

  resultado.innerHTML = `<li>Tu amigo secreto es: ${seleccionado}</li>`;
}

//  Delegación de eventos para el botón Eliminar
listaAmigos.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    const idx = Number(e.target.dataset.index);
    eliminarAmigo(idx);
  }
});