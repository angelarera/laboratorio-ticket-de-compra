// PUNTUACION
interface Partida {
  puntuacion: number;
  numerosGenerados: Set<number>;
}

export const partida: Partida = {
  puntuacion: 0,
  numerosGenerados: new Set<number>(),
};

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
  switch (true) {
    case puntuacion <= 4:
      return "Has sido muy conservador";
    case puntuacion <= 5:
      return "Te ha entrado el canguelo eh?";
    case puntuacion <= 7:
      return "Casi, casi...";
    case puntuacion === 7.5:
      return "¡Lo has clavado!¡Enhorabuena!";
    default:
      return `Tu puntuación final es ${puntuacion}.`;
  }
};

// REINICIAR PARTIDA
export const reiniciarModeloPartida = () => {
  partida.puntuacion = 0;
  partida.numerosGenerados.clear();
};

// QUÉ HABRÍA PASADO
export const obtenerMensajeFuturo = (puntuacion: number) => {
  switch (true) {
    case puntuacion === 7.5:
      return "¡Lo habrías clavado!¡El que no arriesga no gana!";
    case puntuacion > 7.5:
      return "Habrías superado el 7,5. A veces vale más una retirada a tiempo.";
    default:
      return `Tu puntuación final es ${puntuacion}.`;
  }
};
