// MOSTRAR LA PUNTUACIÓN DEL USUARIO
let puntuacion: number = 0;
const elementoPuntuacion = document.querySelector(".puntuacion-numero");

const muestraPuntuacion = () => {
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `${puntuacion}`;
  } else {
    console.error(
      "muestraPuntuacion: No se ha encontrado el elemento con id puntuacion"
    );
  }
};

// PEDIR CARTA
const numerosGenerados = new Set<number>(); // Conjunto para almacenar los números que ya han salido y que no se pueda repetir una misma carta

const pedirCarta = (): number => {
  let numeroCarta;

  do {
    numeroCarta = Math.floor(Math.random() * 10) + 1; // Multiplicando *10 conseguiríamos un número entre el 0 y el 10 sin incluir el 10. Sumando +1 incluimos el 10 y excluimos el 0
    if (numeroCarta > 7) {
      numeroCarta += 2; // Si el número resultante es mayor a 7, se le suma +2. Con esto en combinación al rango 1-10 de nuestro Math.random evitamos obtener el 8 y el 9, que no existen en nuestra baraja española
    }
  } while (numerosGenerados.has(numeroCarta));

  numerosGenerados.add(numeroCarta);

  return numeroCarta;
};

const pedirBtn = document.querySelector(".pedir-btn");

if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
  pedirBtn.addEventListener("click", () => {
    const carta = pedirCarta(); // Obtenemos el número de la carta aleatoriamente
    mostrarCarta(carta); // Sustituimos la imagen de la carta con la que corresponda al número obtenido
    actualizarPuntuacion(carta); // Actualizamos la puntuación con el valor de la carta obtenida
    muestraPuntuacion(); // Mostramos la puntuación en el div puntuacion
    gameOver(); // Verificamos si el jugador ha superado los 7.5 puntos
  });
}

// MOSTRAR CARTA
const imagenCarta = document.querySelector(".carta");

const mostrarCarta = (numeroCarta: number): void => {
  if (imagenCarta !== null && imagenCarta instanceof HTMLImageElement) {
    // Equivalencia de cada número con la carta que le correspondería como imagen
    switch (numeroCarta) {
      case 1:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
        imagenCarta.alt = "As de copas";
        break;
      case 2:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
        imagenCarta.alt = "Dos de copas";
        break;
      case 3:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
        imagenCarta.alt = "Tres de copas";
        break;
      case 4:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
        imagenCarta.alt = "Cuatro de copas";
        break;
      case 5:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
        imagenCarta.alt = "5 de copas";
        break;
      case 6:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
        imagenCarta.alt = "6 de copas";
        break;
      case 7:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
        imagenCarta.alt = "7 de copas";
        break;
      case 10:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
        imagenCarta.alt = "Sota de copas";
        break;
      case 11:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
        imagenCarta.alt = "Caballo de copas";
        break;
      case 12:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
        imagenCarta.alt = "Rey de copas";
        break;
      default:
        console.error("Número de carta no válido");
        imagenCarta.src = ""; // Reestablece la imagen con el reverso de la carta si hubiese un error al obtener el número y no fuese válido
        imagenCarta.alt = "Número de carta no válido";
        break;
    }
  } else {
    console.error("mostrarCarta: No se ha encontrado el elemento con id carta");
  }
};

// ACTUALIZAR LA PUNTUACIÓN DEL USUARIO
const actualizarPuntuacion = (carta: number) => {
  if (carta === 10 || carta === 11 || carta === 12) {
    puntuacion += 0.5; // Si la carta es 10, 11 o 12, se suma +0.5 en la puntuación
  } else {
    puntuacion += carta; // Si es cualquier otro número, se suma su valor íntegro a la puntuación
  }
};

// GAME OVER
const elementoGameOver = document.querySelector(".game-over");

const gameOver = () => {
  if (puntuacion > 7.5) {
    if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
      pedirBtn.disabled = true; // He deshabilitado el botón por cumplir con las condiciones de la práctica, aunque en este caso no sería estrictamente necesario deshabilitarlo porque lo tapa el game over
    }
    if (elementoGameOver) {
      elementoGameOver.classList.add("game-over--desplegado"); // Si se da el game over, se añade esta class que establece los estilos que hacen que el game over se despliegue
    } else {
      console.error(
        "gameOver: No se ha encontrado el elemento con el id game-over"
      );
    }
  }
};

// ME PLANTO
const contenedorMensajeFinal = document.querySelector(".mensaje-final");

const mostrarMensajeFinal = () => {
  const elementoMensajeFinal = document.querySelector(".mensaje-final-texto");

  if (
    elementoMensajeFinal !== null &&
    elementoMensajeFinal instanceof HTMLDivElement
  ) {
    switch (
      true // Usamos switch (true) para expresar booleanos
    ) {
      case puntuacion <= 4:
        elementoMensajeFinal.innerText = "Has sido muy conservador";
        break;
      case puntuacion <= 5:
        elementoMensajeFinal.innerText = "Te ha entrado el canguelo eh?";
        break;
      case puntuacion <= 7:
        elementoMensajeFinal.innerText = "Casi, casi...";
        break;
      case puntuacion === 7.5:
        elementoMensajeFinal.innerText = "¡Lo has clavado!¡Enhorabuena!";
        break;
      default:
        elementoMensajeFinal.innerText = `Tu puntuación final es ${puntuacion}.`;
        break;
    }
  } else {
    console.error(
      "mostrarMensajeFinal: No se ha encontrado el elemento con id mensaje-final"
    );
  }

  if (contenedorMensajeFinal) {
    contenedorMensajeFinal.classList.add("mensaje-final--desplegado"); // Añade la class .mensaje-final--desplegado que establece los estilos que hacen que el game over se despliegue
  } else {
    console.error(
      "contenedorMensajeFinal: No se ha encontrado el elemento con id mensaje-final"
    );
  }
};

const quieroPlantarme = () => {
  const plantarseBtn = document.querySelector(".plantarse-btn");

  if (plantarseBtn !== null && plantarseBtn instanceof HTMLButtonElement) {
    plantarseBtn.addEventListener("click", () => {
      mostrarMensajeFinal();
    });
  }
};

quieroPlantarme();

// REINICIAR PARTIDA
const reiniciarPartida = () => {
  puntuacion = 0;
  numerosGenerados.clear(); // Vacía el conjunto de números generados

  if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = false; // Vuelve a habilitar el botón que habíamos desactivado previamente
  }

  if (elementoGameOver) {
    elementoGameOver.classList.remove("game-over--desplegado"); // Elimina la class que desplegaba el game over
  }

  if (contenedorMensajeFinal) {
    contenedorMensajeFinal.classList.remove("mensaje-final--desplegado"); // Elimina la class que desplegaba el quiero plantarme
  }

  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = ""; // Vacía el marcador de puntos
  }

  if (imagenCarta !== null && imagenCarta instanceof HTMLImageElement) {
    // Elimina la imagen de la última carta que se sacó antes de reiniciar la partida
    imagenCarta.src = "";
    imagenCarta.alt = "";
  }
};

const nuevaPartidaBtnGameOver = document.querySelector(
  ".nueva-partida-btn--gameover"
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
  ".nueva-partida-btn--plantarse"
);

if (
  nuevaPartidaBtnPlantarse !== null &&
  nuevaPartidaBtnPlantarse instanceof HTMLButtonElement
) {
  nuevaPartidaBtnPlantarse.addEventListener("click", () => {
    reiniciarPartida();
  });
}
