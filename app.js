const API_KEY = "f460387806f4b86ad81e4d7b2befdbb3";

const ciudadInput = document.getElementById("ciudad");
const botonBuscar = document.getElementById("buscar");

const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");

const nombreCiudad = document.getElementById("nombreCiudad");
const iconoClima = document.getElementById("iconoClima");
const temperatura = document.getElementById("temperatura");
const descripcion = document.getElementById("descripcion");

const humedad = document.getElementById("humedad");
const viento = document.getElementById("viento");
const sensacion = document.getElementById("sensacion");


botonBuscar.addEventListener("click", obtenerClima);


ciudadInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        obtenerClima();
    }

});


async function obtenerClima() {

    const ciudad = ciudadInput.value.trim();

    if (ciudad === "") {

        mensaje.textContent = "Escribe una ciudad.";

        resultado.classList.add("oculto");

        return;
    }


    mensaje.textContent = "Buscando...";


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;


    try {

        const respuesta = await fetch(url);


        if (!respuesta.ok) {

            throw new Error("Ciudad no encontrada");

        }


        const datos = await respuesta.json();


        console.log(datos);


        nombreCiudad.textContent = `${datos.name}, ${datos.sys.country}`;

        temperatura.textContent = `${Math.round(datos.main.temp)} °C`;

        descripcion.textContent = datos.weather[0].description;

        humedad.textContent = `${datos.main.humidity}%`;

        viento.textContent = `${datos.wind.speed} m/s`;

        sensacion.textContent = `${Math.round(datos.main.feels_like)} °C`;


        const icono = datos.weather[0].icon;

        iconoClima.src =
            `https://openweathermap.org/img/wn/${icono}@2x.png`;


        mensaje.textContent = "";

        resultado.classList.remove("oculto");


    } catch (error) {

        console.error(error);

        mensaje.textContent =
            "❌ No encontramos esa ciudad.";

        resultado.classList.add("oculto");

    }

}