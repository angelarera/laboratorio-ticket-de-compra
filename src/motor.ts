import { partida } from "./modelo";

// PEDIR CARTA
export const obtenerNumeroAleatorio = () => {
  return Math.floor(Math.random() * 10) + 1; // Multiplicando *10 conseguiríamos un número entre el 0 y el 10 sin incluir el 10. Sumando +1 incluimos el 10 y excluimos el 0
};

export const obtenerNumeroCarta = (numeroAleatorio: number) => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }

  return numeroAleatorio;
};

// ACTUALIZAR LA PUNTUACIÓN DEL USUARIO
export const obtenerPuntosCarta = (carta: number) => {
  if (carta > 7) {
    return 0.5;
  }

  return carta;
};

export const sumarPuntuacion = (puntos: number) => {
  return partida.puntuacion + puntos;
};

export const actualizarPuntuacion = (nuevosPuntos: number) => {
  partida.puntuacion = nuevosPuntos;
};

// GAME OVER
export const verificarGameOver = (puntuacion: number): boolean => {
  return puntuacion > 7.5;
};

// ME PLANTO
export const obtenerMensajeFinal = (puntuacion: number) => {
  if (puntuacion <= 4) {
    return "Has sido muy conservador";
  } else if (puntuacion <= 5) {
    return "Te ha entrado el canguelo eh?";
  } else if (puntuacion <= 7) {
    return "Casi, casi...";
  } else if (puntuacion === 7.5) {
    return "¡Lo has clavado!¡Enhorabuena!";
  } else {
    return `Tu puntuación final es ${puntuacion}.`;
  }
};

// QUÉ HABRÍA PASADO
export const obtenerMensajeFuturo = (puntuacion: number) => {
  if (puntuacion === 7.5) {
    return "¡Lo habrías clavado!¡El que no arriesga no gana!";
  } else if (puntuacion > 7.5) {
    return "Habrías superado el 7,5. A veces vale más una retirada a tiempo.";
  } else {
    return `Tu puntuación final es ${puntuacion}.`;
  }
};
