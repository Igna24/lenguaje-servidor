$(document).ready(() => {
  // Declaración de variables
  let cartas = []; // Almacena la lista de cartas
  let currentPage = 1; // Página actual de la paginación
  const cardsPerPage = 5; // Número de cartas por página

  // Cargar las cartas al cargar la página
  cargarCartas();

  // Función para cargar las cartas utilizando una solicitud AJAX
  function cargarCartas() {
    $.ajax({
      url: '/cartas',
      type: 'GET',
      success(data) {
        cartas = data;
        mostrarCartas(cartas);
      },
      error(error) {
        console.log('Error al obtener la lista de cartas:', error);
      },
    });
  }

  // Función para mostrar las cartas en la página
  function mostrarCartas(cartas) {
    // Calcular el índice de inicio y fin de las cartas para la paginación
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = cartas.slice(startIndex, endIndex);

    // Limpiar la lista de cartas y agregar las cartas actuales
    $('#lista-cartas').empty();
    currentCards.forEach((carta) => {
      const listItem = `<li data-id="${carta._id}">${carta.nombre} - ${carta.tipo} - ${carta.descripcion} - ${carta.puntosBatalla}</li>`;
      $('#lista-cartas').append(listItem);
    });

    // Asignar un evento click a cada carta para mostrar el formulario de edición
    $('#lista-cartas li').click(function () {
      const cartaId = $(this).data('id');
      mostrarFormularioEdicion(cartaId);
    });

    // Mostrar la paginación
    mostrarPaginacion(cartas.length);
  }

  // Función para mostrar el formulario de edición de una carta
  function mostrarFormularioEdicion(cartaId) {
    const carta = cartas.find((carta) => carta._id === cartaId);
    if (!carta) {
      console.log('No se encontró la carta con el ID:', cartaId);
      return;
    }

    // Rellenar el formulario de edición con los datos de la carta
    $('#edit-tipo').val(carta.tipo);
    $('#edit-nombre').val(carta.nombre);
    $('#edit-descripcion').val(carta.descripcion);
    $('#edit-puntosBatalla').val(carta.puntosBatalla);
    $('#edit-id').val(carta._id);

    // Mostrar el formulario de edición y ocultar el formulario de creación
    $('#form').addClass('hidden');
    $('#edit-form-container').removeClass('hidden');
  }

  // Función para ocultar el formulario de edición
  function ocultarFormularioEdicion() {
    $('#edit-form')[0].reset();

    // Mostrar el formulario de creación y ocultar el formulario de edición
    $('#form').removeClass('hidden');
    $('#edit-form-container').addClass('hidden');
  }

  // Evento submit del formulario de creación de cartas
  $('#form').submit(function (event) {
    event.preventDefault();
    const formData = $(this).serializeArray();
    const newCard = {
      tipo: formData.find((item) => item.name === 'tipo').value,
      nombre: formData.find((item) => item.name === 'nombre').value,
      descripcion: formData.find((item) => item.name === 'descripcion').value,
      puntosBatalla: parseInt(formData.find((item) => item.name === 'puntosBatalla').value),
    };
    registrarCarta(newCard);
  });

  // Función para registrar una nueva carta utilizando una solicitud AJAX
  function registrarCarta(carta) {
    $.ajax({
      url: '/cartas',
      type: 'POST',
      data: carta,
      success() {
        cargarCartas();
        $('#form')[0].reset();
      },
      error(error) {
        console.log('Error al registrar la carta', error);
      },
    });
  }

  // Evento submit del formulario de búsqueda
  $('#buscar-form').submit((event) => {
    event.preventDefault();
    const searchTerm = $('#buscar-input').val().trim();
    buscarCartas(searchTerm);
  });

  // Función para buscar cartas utilizando una solicitud AJAX
  function buscarCartas(searchTerm) {
    $.ajax({
      url: '/cartas/search',
      type: 'POST',
      data: { searchTerm },
      success(cartas) {
        mostrarCartas(cartas);
      },
      error(error) {
        console.log('Error al buscar cartas:', error);
      },
    });
  }

  // Evento submit del formulario de edición de cartas
  $('#edit-form').submit(function (event) {
    event.preventDefault();
    const formData = $(this).serializeArray();
    const editedCard = {
      tipo: formData.find((item) => item.name === 'tipo').value,
      nombre: formData.find((item) => item.name === 'nombre').value,
      descripcion: formData.find((item) => item.name === 'descripcion').value,
      puntosBatalla: parseInt(formData.find((item) => item.name === 'puntosBatalla').value),
      id: formData.find((item) => item.name === 'edit-id').value,
    };
    editarCarta(editedCard);
  });

  // Función para editar una carta utilizando una solicitud AJAX
  function editarCarta(carta) {
    $.ajax({
      url: `/cartas/${carta.id}`,
      type: 'PUT',
      data: carta,
      success() {
        cargarCartas();
        ocultarFormularioEdicion();
      },
      error(error) {
        console.log('Error al editar la carta', error);
      },
    });
  }

  // Evento click del botón de eliminar carta
  $('#delete-button').click(() => {
    const cartaId = $('#edit-id').val();
    eliminarCarta(cartaId);
  });

  // Función para eliminar una carta utilizando una solicitud AJAX
  function eliminarCarta(cartaId) {
    $.ajax({
      url: `/cartas/${cartaId}`,
      type: 'DELETE',
      success() {
        cargarCartas();
        ocultarFormularioEdicion();
      },
      error(error) {
        console.log('Error al eliminar la carta', error);
      },
    });
  }

  // Evento click para ordenar cartas por nombre
  $('#ordenar-nombre').click(() => {
    ordenarCartas('nombre');
  });

  // Evento click para ordenar cartas por puntos de batalla
  $('#ordenar-puntos').click(() => {
    ordenarCartas('puntosBatalla');
  });

  // Evento change para filtrar cartas por tipo
  $('#filtro-tipo').change(function () {
    const tipo = $(this).val();
    filtrarCartasPorTipo(tipo);
  });

  // Función para ordenar las cartas según un criterio
  function ordenarCartas(criterio) {
    cartas.sort((a, b) => {
      if (a[criterio] < b[criterio]) {
        return -1;
      }
      if (a[criterio] > b[criterio]) {
        return 1;
      }
      return 0;
    });

    mostrarCartas(cartas);
  }

  // Evento click para buscar cartas
  $('#buscar-button').click(() => {
    const searchTerm = $('#buscar-input').val().trim();
    buscarCartas(searchTerm);
  });

  // Evento click en la paginación
  $('#pagination').on('click', 'li', function () {
    currentPage = $(this).data('page');
    mostrarCartas(cartas);
  });

  // Función para mostrar la paginación
  function mostrarPaginacion(totalCards) {
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    $('#pagination').empty();
    for (let i = 1; i <= totalPages; i++) {
      const listItem = `<li data-page="${i}" class="${currentPage === i ? 'active' : ''}">${i}</li>`;
      $('#pagination').append(listItem);
    }
  }

  // Función para filtrar las cartas por tipo
  function filtrarCartasPorTipo(tipo) {
    if (tipo === '') {
      cargarCartas();
    } else {
      const cartasFiltradas = cartas.filter((carta) => carta.tipo === tipo);
      mostrarCartas(cartasFiltradas);
    }
  }

  // Evento change para filtrar cartas por tipo
  $('#filtrar-tipo').change(function () {
    const tipo = $(this).val();
    filtrarCartasPorTipo(tipo);
  });
});
