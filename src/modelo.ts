// PUNTUACION
interface Partida {
  puntuacion: number;
  numerosGenerados: Set<number>;
}

export const partida: Partida = {
  puntuacion: 0,
  numerosGenerados: new Set<number>(),
};

// REINICIAR PARTIDA
export const reiniciarModeloPartida = () => {
  partida.puntuacion = 0;
  partida.numerosGenerados.clear();
};
