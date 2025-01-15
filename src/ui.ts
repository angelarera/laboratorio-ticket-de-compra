import { partida } from "./modelo";
import {
  obtenerNumeroAleatorio,
  obtenerNumeroCarta,
  verificarGameOver,
  obtenerMensajeFinal,
  obtenerMensajeFuturo,
} from "./motor";

// PEDIR CARTA
export const pedirCarta = (): number => {
  let numeroCarta: number;

  do {
    const numeroAleatorio = obtenerNumeroAleatorio();
    numeroCarta = obtenerNumeroCarta(numeroAleatorio);
  } while (partida.numerosGenerados.has(numeroCarta));

  partida.numerosGenerados.add(numeroCarta);

  return numeroCarta;
};

// MOSTRAR LA PUNTUACIÓN DEL USUARIO
const elementoPuntuacion = document.querySelector(".puntuacion__numero");
export const muestraPuntuacion = () => {
  if (elementoPuntuacion && elementoPuntuacion instanceof HTMLDivElement) {
    elementoPuntuacion.innerHTML = `${partida.puntuacion}`;
  } else {
    console.error(
      "muestraPuntuacion: No se ha encontrado el elemento con class puntuacion"
    );
  }
};

// MOSTRAR CARTA
const elementoImg = document.querySelector(".seccion-principal__carta");
export const pintarUrlCarta = (urlCarta: string) => {
  if (elementoImg && elementoImg instanceof HTMLImageElement) {
    elementoImg.src = urlCarta;
  }
};

export const obtenerUrlCarta = (numeroCarta: number): string => {
  // Equivalencia de cada número con la carta que le correspondería como imagen
  switch (numeroCarta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/cartas/back.jpg";
  }
};

// GAME OVER
const elementoGameOver = document.querySelector(".game-over");
export const actualizarDOMGameOver = () => {
  const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");

  // Deshabilitar el botón "Pedir carta"
  if (pedirBtn && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = true;
  }

  // Mostrar el mensaje de Game Over en el DOM
  if (elementoGameOver && elementoGameOver instanceof HTMLDivElement) {
    elementoGameOver.classList.add("game-over--desplegado");
  } else {
    console.error("No se ha encontrado el elemento con la clase game-over.");
  }
};

export const gameOver = (puntuacion: number) => {
  if (verificarGameOver(puntuacion)) {
    actualizarDOMGameOver();
  }
};

// ME PLANTO
export const actualizarMensajeFinal = (mensaje: string) => {
  const elementoMensajeFinal = document.querySelector(".mensaje-final__texto");

  if (
    elementoMensajeFinal !== null &&
    elementoMensajeFinal instanceof HTMLDivElement
  ) {
    elementoMensajeFinal.innerText = mensaje;
  } else {
    console.error(
      "mostrarMensajeFinal: No se ha encontrado el elemento con class mensaje-final__texto"
    );
  }
};

export const contenedorMensajeFinal = document.querySelector(".mensaje-final");
export const mostrarContenedorMensajeFinal = () => {
  if (
    contenedorMensajeFinal &&
    contenedorMensajeFinal instanceof HTMLDivElement
  ) {
    contenedorMensajeFinal.classList.add("mensaje-final--desplegado");
  } else {
    console.error(
      "contenedorMensajeFinal: No se ha encontrado el elemento con class mensaje-final"
    );
  }
};

export const mostrarMensajeFinal = () => {
  const mensaje = obtenerMensajeFinal(partida.puntuacion); // Obtener el mensaje de acuerdo con la puntuación
  actualizarMensajeFinal(mensaje); // Actualizar el mensaje en el DOM
  mostrarContenedorMensajeFinal(); // Mostrar el contenedor del mensaje final
};

// REINICIAR PARTIDA
// Función para restaurar la visibilidad de elementos en el DOM
export const restaurarElemento = (
  elemento: HTMLElement | null,
  clase: string
) => {
  if (elemento && elemento instanceof HTMLDivElement) {
    elemento.classList.remove(clase);
  } else {
    console.error(
      `restaurarElemento: No se ha encontrado el elemento con clase ${clase}`
    );
  }
};

export const reiniciarPuntuacion = () => {
  if (elementoPuntuacion && elementoPuntuacion instanceof HTMLDivElement) {
    elementoPuntuacion.innerHTML = ""; // Vacía el marcador de puntos
  }
};

export const reiniciarImagenCarta = () => {
  if (elementoImg !== null && elementoImg instanceof HTMLImageElement) {
    elementoImg.src = "";
  }
};

export const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");
export const reiniciarInterfazPartida = () => {
  if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = false; // Habilita el botón de pedir carta
  }

  // Restaurar los elementos del DOM
  restaurarElemento(elementoGameOver as HTMLElement, "game-over--desplegado");
  restaurarElemento(
    contenedorMensajeFinal as HTMLElement,
    "mensaje-final--desplegado"
  );
  restaurarElemento(
    elementoQueHabriaPasado as HTMLElement,
    "que-habria-pasado--desplegado"
  );

  reiniciarPuntuacion();
  reiniciarImagenCarta();
};

// QUÉ HABRÍA PASADO
export const mostrarMensajeFuturo = () => {
  const queHabriaPasado = document.querySelector(".que-habria-pasado__texto");

  if (queHabriaPasado !== null && queHabriaPasado instanceof HTMLDivElement) {
    queHabriaPasado.innerText = obtenerMensajeFuturo(partida.puntuacion);
  } else {
    console.error(
      "mostrarMensajeFuturo: No se ha encontrado el elemento con class que-habria-pasado__texto"
    );
  }
};

export const habilitarBotonPedirCarta = () => {
  const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");

  if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = false;
  }
};

const elementoQueHabriaPasado = document.querySelector(".que-habria-pasado");
export const desplegarQueHabriaPasado = () => {
  if (
    elementoQueHabriaPasado !== null &&
    elementoQueHabriaPasado instanceof HTMLDivElement
  ) {
    elementoQueHabriaPasado.classList.add("que-habria-pasado--desplegado");
  } else {
    console.error(
      "queHabriaPasado: No se ha encontrado el elemento que-habria-pasado"
    );
  }
};
