import {
  partida,
  obtenerNumeroAleatorio,
  obtenerNumeroCarta,
  obtenerPuntosCarta,
  sumarPuntuacion,
  actualizarPuntuacion,
  reiniciarModeloPartida,
} from "./modelo";

import { pedirCarta } from "./motor";

import {
  muestraPuntuacion,
  pintarUrlCarta,
  obtenerUrlCarta,
  gameOver,
  contenedorMensajeFinal,
  mostrarMensajeFinal,
  reiniciarInterfazPartida,
  pedirBtn,
  mostrarMensajeFuturo,
  habilitarBotonPedirCarta,
  desplegarQueHabriaPasado,
} from "./ui";

// PEDIR CARTA
if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
  pedirBtn.addEventListener("click", () => {
    const numeroAleatorio = obtenerNumeroAleatorio();
    const carta = obtenerNumeroCarta(numeroAleatorio); // Obtenemos el número de la carta aleatoriamente
    const urlCarta = obtenerUrlCarta(carta); // Sustituimos la imagen de la carta con la que corresponda al número obtenido
    pintarUrlCarta(urlCarta);
    const puntuacionCarta = obtenerPuntosCarta(carta);
    const puntosSumados = sumarPuntuacion(puntuacionCarta); // Obtenemos los puntos que vale la carta
    actualizarPuntuacion(puntosSumados); // Actualizamos la puntuación con el valor de la carta obtenida
    muestraPuntuacion(); // Mostramos la puntuación en el div puntuacion
    gameOver(partida.puntuacion); // Verificamos si el jugador ha superado los 7.5 puntos
  });
}

// ME PLANTO
const quieroPlantarme = () => {
  const plantarseBtn = document.querySelector(
    ".seccion-principal__plantarse-btn"
  );

  if (plantarseBtn !== null && plantarseBtn instanceof HTMLButtonElement) {
    plantarseBtn.addEventListener("click", () => {
      mostrarMensajeFinal(); // Llama a la función principal cuando el usuario se planta
    });
  }
};

quieroPlantarme();

// REINICIAR PARTIDA
const reiniciarPartida = () => {
  reiniciarModeloPartida();
  reiniciarInterfazPartida();
};

// Aplicar reiniciarPartida a los botones que inician una nueva partida en cada pantalla que se puede encontrar el jugador
const nuevaPartidaBtnGameOver = document.querySelector(
  ".game-over__nueva-partida-btn"
);

if (
  nuevaPartidaBtnGameOver !== null &&
  nuevaPartidaBtnGameOver instanceof HTMLButtonElement
) {
  nuevaPartidaBtnGameOver.addEventListener("click", () => {
    reiniciarPartida();
  });
}

const nuevaPartidaBtnPlantarse = document.querySelector(
  ".mensaje-final__nueva-partida-btn"
);

if (
  nuevaPartidaBtnPlantarse !== null &&
  nuevaPartidaBtnPlantarse instanceof HTMLButtonElement
) {
  nuevaPartidaBtnPlantarse.addEventListener("click", () => {
    reiniciarPartida();
  });
}

const nuevaPartidaBtnQueHabriaPasado = document.querySelector(
  ".que-habria-pasado__nueva-partida-btn"
);

if (
  nuevaPartidaBtnQueHabriaPasado !== null &&
  nuevaPartidaBtnQueHabriaPasado instanceof HTMLButtonElement
) {
  nuevaPartidaBtnQueHabriaPasado.addEventListener("click", () => {
    reiniciarPartida();
  });
}

// QUÉ HABRÍA PASADO
const pedirCartaQueHabriaPasado = () => {
  const carta = pedirCarta();
  const urlCarta = obtenerUrlCarta(carta);
  pintarUrlCarta(urlCarta);
  const puntuacionCarta = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntuacion(puntuacionCarta);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();

  if (partida.puntuacion >= 7.5) {
    clearInterval(intervalId); // Para el intervalo si la puntuación alcanza 7.5 o lo supera
    desplegarQueHabriaPasado();
    mostrarMensajeFuturo();
  }
};

// Función para el intervalo que va enseñando las cartas que habrían salido
let intervalId: number | undefined; // Declara un intervalo que usaremos para pulsar el botón de pedir carta y mostrar las que habrían salido de seguir jugando
const iniciarIntervalo = () => {
  if (intervalId === undefined && partida.puntuacion < 7.5) {
    intervalId = window.setInterval(() => {
      pedirCartaQueHabriaPasado();
    }, 1000);
  }
};

// Lógica principal del qué habría pasado
const queHabriaPasado = () => {
  habilitarBotonPedirCarta();
  pedirCartaQueHabriaPasado();

  // Agrega una clase para hacer visibles las cartas del futuro
  if (contenedorMensajeFinal) {
    contenedorMensajeFinal.classList.add("mensaje-final--viendo-futuro");
  } else {
    console.error(
      "contenedorMensajeFinal: No se ha encontrado el elemento con class mensaje-final"
    );
  }

  iniciarIntervalo(); // Inicia el intervalo para seguir pidiendo cartas
};

const futuroBtn = document.querySelector(".mensaje-final__futuro-btn");
if (futuroBtn !== null && futuroBtn instanceof HTMLButtonElement) {
  futuroBtn.addEventListener("click", () => {
    queHabriaPasado();
  });
}
