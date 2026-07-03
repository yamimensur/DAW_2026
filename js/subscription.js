const form = document.getElementById("form-suscripcion");
const tituloFormulario = document.getElementById("titulo-formulario");

const campos = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repetirPassword: document.getElementById("repetirPassword"),
    edad: document.getElementById("edad"),
    telefono: document.getElementById("telefono"),
    direccion: document.getElementById("direccion"),
    ciudad: document.getElementById("ciudad"),
    codigoPostal: document.getElementById("codigoPostal"),
    dni: document.getElementById("dni")
};

function mostrarError(nombreCampo, mensaje) {
    const error = document.getElementById("error-" + nombreCampo);
    error.textContent = mensaje;
}

function limpiarError(nombreCampo) {
    mostrarError(nombreCampo, "");
}

const validaciones = {
    nombre: function() {
        const valor = campos.nombre.value.trim();
        if (valor.length <= 6 || !valor.includes(" ")) {
            return "El nombre debe tener mas de 6 letras y al menos un espacio.";
        }
        return "";
    },
    email: function() {
        const valor = campos.email.value.trim();
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(valor)) {
            return "Ingresar un email valido.";
        }
        return "";
    },
    password: function() {
        const valor = campos.password.value;
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(valor)) {
            return "La contrasena debe tener 8 caracteres o mas, solo con letras y numeros.";
        }
        return "";
    },
    repetirPassword: function() {
        if (campos.repetirPassword.value !== campos.password.value || campos.repetirPassword.value === "") {
            return "Las contrasenas deben coincidir.";
        }
        return "";
    },
    edad: function() {
        const valor = campos.edad.value.trim();
        const numero = Number(valor);
        if (valor === "" || !Number.isInteger(numero) || numero < 18) {
            return "La edad debe ser un numero entero mayor o igual a 18.";
        }
        return "";
    },
    telefono: function() {
        const valor = campos.telefono.value.trim();
        if (!/^[0-9]{7,}$/.test(valor)) {
            return "El telefono debe tener al menos 7 digitos, sin espacios ni simbolos.";
        }
        return "";
    },
    direccion: function() {
        const valor = campos.direccion.value.trim();
        const formatoDireccion = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\s).{5,}$/;
        if (!formatoDireccion.test(valor)) {
            return "La direccion debe tener al menos 5 caracteres, letras, numeros y un espacio.";
        }
        return "";
    },
    ciudad: function() {
        if (campos.ciudad.value.trim().length < 3) {
            return "La ciudad debe tener al menos 3 caracteres.";
        }
        return "";
    },
    codigoPostal: function() {
        if (campos.codigoPostal.value.trim().length < 3) {
            return "El codigo postal debe tener al menos 3 caracteres.";
        }
        return "";
    },
    dni: function() {
        const valor = campos.dni.value.trim();
        if (!/^[0-9]{7,8}$/.test(valor)) {
            return "El DNI debe tener 7 u 8 digitos.";
        }
        return "";
    }
};

function validarCampo(nombreCampo) {
    const error = validaciones[nombreCampo]();
    mostrarError(nombreCampo, error);
    return error;
}

function validarFormulario() {
    const errores = [];

    Object.keys(campos).forEach(function(nombreCampo) {
        const error = validarCampo(nombreCampo);
        if (error !== "") {
            errores.push(error);
        }
    });

    return errores;
}

function obtenerDatosFormulario() {
    return [
        "Nombre completo: " + campos.nombre.value,
        "Email: " + campos.email.value,
        "Edad: " + campos.edad.value,
        "Telefono: " + campos.telefono.value,
        "Direccion: " + campos.direccion.value,
        "Ciudad: " + campos.ciudad.value,
        "Codigo postal: " + campos.codigoPostal.value,
        "DNI: " + campos.dni.value
    ];
}

function actualizarTitulo() {
    const nombre = campos.nombre.value.trim();
    tituloFormulario.textContent = nombre === "" ? "HOLA" : "HOLA " + nombre.toUpperCase();
}

Object.keys(campos).forEach(function(nombreCampo) {
    campos[nombreCampo].addEventListener("blur", function() {
        validarCampo(nombreCampo);
    });

    campos[nombreCampo].addEventListener("focus", function() {
        limpiarError(nombreCampo);
        if (nombreCampo === "nombre") {
            actualizarTitulo();
        }
    });
});

campos.nombre.addEventListener("keydown", function() {
    setTimeout(actualizarTitulo, 0);
});

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const errores = validarFormulario();

    if (errores.length > 0) {
        alert("Se encontraron errores:\n\n" + errores.join("\n"));
    } else {
        alert("Datos cargados correctamente:\n\n" + obtenerDatosFormulario().join("\n"));
    }
});
