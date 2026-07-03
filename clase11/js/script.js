const API_URL = "https://rickandmortyapi.com/api/character";

const btnTodos = document.getElementById("btn-todos");
const formFiltros = document.getElementById("form-filtros");
const contenedorPersonajes = document.getElementById("personajes");
const mensaje = document.getElementById("mensaje");
const cantidad = document.getElementById("cantidad");

async function pedirPersonajes(url) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error("No se encontraron personajes con esos datos.");
    }

    return respuesta.json();
}

async function pedirTodasLasPaginas(url) {
    let personajes = [];
    let siguientePagina = url;

    while (siguientePagina) {
        const datos = await pedirPersonajes(siguientePagina);
        personajes = personajes.concat(datos.results);
        siguientePagina = datos.info.next;
    }

    return personajes;
}

function mostrarMensaje(texto, clase) {
    mensaje.textContent = texto;
    mensaje.className = clase;
}

function limpiarResultado() {
    contenedorPersonajes.innerHTML = "";
    cantidad.textContent = "";
    mostrarMensaje("", "");
}

function crearTarjeta(personaje) {
    const article = document.createElement("article");
    article.className = "personaje";

    article.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}">
        <div class="personaje-info">
            <h3>${personaje.name}</h3>
            <p><strong>Status:</strong> ${personaje.status}</p>
            <p><strong>Species:</strong> ${personaje.species}</p>
            <p><strong>Gender:</strong> ${personaje.gender}</p>
            <p><strong>Origin:</strong> ${personaje.origin.name}</p>
        </div>
    `;

    return article;
}

function mostrarPersonajes(personajes) {
    contenedorPersonajes.innerHTML = "";

    personajes.forEach(function(personaje) {
        contenedorPersonajes.appendChild(crearTarjeta(personaje));
    });

    cantidad.textContent = "Personajes encontrados: " + personajes.length;
}

function armarUrlConFiltros() {
    const datosFormulario = new FormData(formFiltros);
    const parametros = new URLSearchParams();

    datosFormulario.forEach(function(valor, filtro) {
        if (valor.trim() !== "") {
            parametros.append(filtro, valor.trim());
        }
    });

    const filtros = parametros.toString();
    return filtros ? API_URL + "?" + filtros : API_URL;
}

async function cargarPersonajes(url) {
    try {
        limpiarResultado();
        mostrarMensaje("Cargando personajes...", "cargando");
        btnTodos.disabled = true;

        const personajes = await pedirTodasLasPaginas(url);

        mostrarMensaje("", "");
        mostrarPersonajes(personajes);
    } catch (error) {
        contenedorPersonajes.innerHTML = "";
        cantidad.textContent = "Personajes encontrados: 0";
        mostrarMensaje("Error: " + error.message, "error");
    } finally {
        btnTodos.disabled = false;
    }
}

btnTodos.addEventListener("click", function() {
    cargarPersonajes(API_URL);
});

formFiltros.addEventListener("submit", function(evento) {
    evento.preventDefault();
    cargarPersonajes(armarUrlConFiltros());
});
