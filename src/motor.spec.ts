import { vi } from "vitest";
import { partida } from "./modelo";
import {
  actualizarPuntuacion,
  obtenerMensajeFinal,
  obtenerPuntosCarta,
  sumarPuntuacion,
  verificarGameOver,
  obtenerMensajeFuturo,
  obtenerNumeroAleatorio,
  obtenerNumeroCarta,
} from "./motor";

describe("generarNumeroAleatorio", () => {
  it("MathRandom lo forzamos a que devuelva 0, y debería dar el número 1", () => {
    // Arrange
    const numeroEsperado = 1;
    vi.spyOn(global.Math, "random").mockReturnValue(0);

    // Act
    const resultado = obtenerNumeroAleatorio();

    // Assert
    expect(resultado).toBe(numeroEsperado);
  });

  it("MathRandom lo forzamos a que devuelva 0.9, y debería dar el número 10", () => {
    // Arrange
    const numeroEsperado = 10;
    vi.spyOn(global.Math, "random").mockReturnValue(0.9);

    // Act
    const resultado = obtenerNumeroAleatorio();

    // Assert
    expect(resultado).toBe(numeroEsperado);
  });

  it("El número aleatorio obtenido es mayor que 7, por lo que se le suma +2 para que coincida con la numeración de la baraja española", () => {
    // Arrange
    const numeroAleatorio = 8;
    const resultadoEsperado = 10;

    // Act
    const resultado = obtenerNumeroCarta(numeroAleatorio);

    // Assert
    expect(resultado).toBe(resultadoEsperado);
  });

  it("El número aleatorio obtenido es menor que 7, por lo que tiene su equivalente exacto en la baraja española y no es necesario sumarle nada", () => {
    // Arrange
    const numeroAleatorio = 4;

    // Act
    const resultado = obtenerNumeroCarta(numeroAleatorio);

    // Assert
    expect(resultado).toBe(numeroAleatorio);
  });
});

describe("comprobarVictoriaPartida", () => {
  it("El número de la carta es mayor que 7, por lo que debe sumar 0.5 puntos", () => {
    // Arrange
    const cartaMayor: number = 8;
    const puntosEsperados: number = 0.5;

    // Act
    const resultado = obtenerPuntosCarta(cartaMayor);

    // Assert
    expect(resultado).toBe(puntosEsperados);
  });

  it("El número de la carta es menor que 7, por lo que su valor se debe sumar tal cual a la puntuación", () => {
    // Arrange
    const cartaMenor: number = 4;
    const puntosEsperados: number = 4;

    // Act
    const resultado = obtenerPuntosCarta(cartaMenor);

    // Assert
    expect(resultado).toBe(puntosEsperados);
  });

  it("La puntuación del usuario se actualiza", () => {
    // Arrange
    const nuevosPuntos: number = 2;

    // Act
    actualizarPuntuacion(nuevosPuntos);

    // Assert
    expect(partida.puntuacion).toBe(nuevosPuntos);
  });

  it("La carta obtenida se suma a la puntuación del jugador", () => {
    // Arrange
    const cartaObtenida: number = 2;
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(0);

    // Act
    const resultado = sumarPuntuacion(cartaObtenida);

    // Assert
    expect(resultado).toBe(cartaObtenida);
  });

  it("El usuario no ha superado los 7.5 puntos, por lo que aún no ha perdido la partida", () => {
    // Arrange
    const puntuacion = 6;

    // Act
    const resultado = verificarGameOver(puntuacion);

    // Assert
    expect(resultado).toBe(false);
  });

  it("El usuario ha superado los 7.5 puntos, por lo que ha perdido la partida", () => {
    // Arrange
    const puntuacion = 9;

    // Act
    const resultado = verificarGameOver(puntuacion);

    // Assert
    expect(resultado).toBe(true);
  });
});

describe("obtenerMensajeMePlanto", () => {
  it("El usuario se ha plantado con menos de 4 puntos, por lo que obtiene el mensaje que corresponde a su caso", () => {
    // Arrange
    const puntuacion = 3;
    const mensajeEsperado = "Has sido muy conservador";

    // Act
    const resultado = obtenerMensajeFinal(puntuacion);

    // Assert
    expect(resultado).toBe(mensajeEsperado);
  });

  it("El usuario se ha plantado con 7.5 puntos, por lo que obtiene el mensaje que corresponde a su caso", () => {
    // Arrange
    const puntuacion = 7.5;
    const mensajeEsperado = "¡Lo has clavado!¡Enhorabuena!";

    // Act
    const resultado = obtenerMensajeFinal(puntuacion);

    // Assert
    expect(resultado).toBe(mensajeEsperado);
  });
});

describe("obtenerMensajeFuturo", () => {
  it("El usuario habría obtenido 7.5 puntos de haber seguido jugando, por lo que obtiene el mensaje que corresponde a su caso", () => {
    // Arrange
    const puntuacion = 7.5;
    const mensajeEsperado = "¡Lo habrías clavado!¡El que no arriesga no gana!";

    // Act
    const resultado = obtenerMensajeFuturo(puntuacion);

    // Assert
    expect(resultado).toBe(mensajeEsperado);
  });

  it("El usuario se habría pasado de los 7.5 puntos de haber seguido jugando, por lo que obtiene el mensaje que corresponde a su caso", () => {
    // Arrange
    const puntuacion = 9;
    const mensajeEsperado =
      "Habrías superado el 7,5. A veces vale más una retirada a tiempo.";

    // Act
    const resultado = obtenerMensajeFuturo(puntuacion);

    // Assert
    expect(resultado).toBe(mensajeEsperado);
  });
});
