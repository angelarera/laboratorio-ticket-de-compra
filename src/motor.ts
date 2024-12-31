import { partida, obtenerNumeroAleatorio, obtenerNumeroCarta } from "./modelo";

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
