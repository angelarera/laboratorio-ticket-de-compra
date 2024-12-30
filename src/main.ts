// MOSTRAR LA PUNTUACIÓN DEL USUARIO
let puntuacion: number = 0;
const elementoPuntuacion = document.querySelector(".puntuacion__numero");

const muestraPuntuacion = () => {
  if (elementoPuntuacion && elementoPuntuacion instanceof HTMLDivElement) {
    elementoPuntuacion.innerHTML = `${puntuacion}`;
  } else {
    console.error(
      "muestraPuntuacion: No se ha encontrado el elemento con class puntuacion"
    );
  }
};

// PEDIR CARTA
const numerosGenerados = new Set<number>(); // Conjunto para almacenar los números que ya han salido y que no se pueda repetir una misma carta

const obtenerNumeroAleatorio = () => {
  return Math.floor(Math.random() * 10) + 1; // Multiplicando *10 conseguiríamos un número entre el 0 y el 10 sin incluir el 10. Sumando +1 incluimos el 10 y excluimos el 0
};

const obtenerNumeroCarta = (numeroAleatorio: number) => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }

  return numeroAleatorio;
};

const pedirCarta = (): number => {
  let numeroCarta: number;

  do {
    const numeroAleatorio = obtenerNumeroAleatorio();
    numeroCarta = obtenerNumeroCarta(numeroAleatorio);
  } while (numerosGenerados.has(numeroCarta));

  numerosGenerados.add(numeroCarta);

  return numeroCarta;
};

const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");
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
    gameOver(puntuacion); // Verificamos si el jugador ha superado los 7.5 puntos
  });
}

// MOSTRAR CARTA
const elementoImg = document.querySelector(".seccion-principal__carta");
const pintarUrlCarta = (urlCarta: string) => {
  if (elementoImg && elementoImg instanceof HTMLImageElement) {
    elementoImg.src = urlCarta;
  }
};

const obtenerUrlCarta = (numeroCarta: number): string => {
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

// ACTUALIZAR LA PUNTUACIÓN DEL USUARIO
const obtenerPuntosCarta = (carta: number) => {
  if (carta > 7) {
    return 0.5;
  }

  return carta;
};

const sumarPuntuacion = (puntos: number) => {
  return puntuacion + puntos;
};

const actualizarPuntuacion = (nuevosPuntos: number) => {
  puntuacion = nuevosPuntos;
};

// GAME OVER
const verificarGameOver = (puntuacion: number): boolean => {
  return puntuacion > 7.5;
};

const elementoGameOver = document.querySelector(".game-over");
const actualizarDOMGameOver = () => {
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

const gameOver = (puntuacion: number) => {
  if (verificarGameOver(puntuacion)) {
    actualizarDOMGameOver();
  }
};

// ME PLANTO
const obtenerMensajeFinal = (puntuacion: number) => {
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

const actualizarMensajeFinal = (mensaje: string) => {
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

const contenedorMensajeFinal = document.querySelector(".mensaje-final");
const mostrarContenedorMensajeFinal = () => {
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

const mostrarMensajeFinal = () => {
  const mensaje = obtenerMensajeFinal(puntuacion); // Obtener el mensaje de acuerdo con la puntuación
  actualizarMensajeFinal(mensaje); // Actualizar el mensaje en el DOM
  mostrarContenedorMensajeFinal(); // Mostrar el contenedor del mensaje final
};

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
// Función para restaurar la visibilidad de elementos en el DOM
const restaurarElemento = (elemento: HTMLElement | null, clase: string) => {
  if (elemento && elemento instanceof HTMLDivElement) {
    elemento.classList.remove(clase);
  } else {
    console.error(
      `restaurarElemento: No se ha encontrado el elemento con clase ${clase}`
    );
  }
};

const reiniciarPuntuacion = () => {
  if (elementoPuntuacion && elementoPuntuacion instanceof HTMLDivElement) {
    elementoPuntuacion.innerHTML = ""; // Vacía el marcador de puntos
  }
};

const reiniciarImagenCarta = () => {
  if (elementoImg !== null && elementoImg instanceof HTMLImageElement) {
    elementoImg.src = "";
  }
};

const reiniciarPartida = () => {
  puntuacion = 0;
  numerosGenerados.clear(); // Vacía el conjunto de números generados

  if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = false; // Vuelve a habilitar el botón que habíamos desactivado previamente
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
const obtenerMensajeFuturo = (puntuacion: number) => {
  switch (true) {
    case puntuacion === 7.5:
      return "¡Lo habrías clavado!¡El que no arriesga no gana!";
    case puntuacion > 7.5:
      return "Habrías superado el 7,5. A veces vale más una retirada a tiempo.";
    default:
      return `Tu puntuación final es ${puntuacion}.`;
  }
};

const mostrarMensajeFuturo = () => {
  const queHabriaPasado = document.querySelector(".que-habria-pasado__texto");

  if (queHabriaPasado !== null && queHabriaPasado instanceof HTMLDivElement) {
    queHabriaPasado.innerText = obtenerMensajeFuturo(puntuacion);
  } else {
    console.error(
      "mostrarMensajeFuturo: No se ha encontrado el elemento con class que-habria-pasado__texto"
    );
  }
};

const habilitarBotonPedirCarta = () => {
  const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");

  if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
    pedirBtn.disabled = false;
  }
};

const elementoQueHabriaPasado = document.querySelector(".que-habria-pasado");
const desplegarQueHabriaPasado = () => {
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

const pedirCartaQueHabriaPasado = () => {
  const carta = pedirCarta();
  const urlCarta = obtenerUrlCarta(carta);
  pintarUrlCarta(urlCarta);
  const puntuacionCarta = obtenerPuntosCarta(carta);
  const puntosSumados = sumarPuntuacion(puntuacionCarta);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();

  if (puntuacion >= 7.5) {
    clearInterval(intervalId); // Para el intervalo si la puntuación alcanza 7.5 o lo supera
    desplegarQueHabriaPasado();
    mostrarMensajeFuturo();
  }
};

// Función para el intervalo que va enseñando las cartas que habrían salido
let intervalId: number | undefined; // Declara un intervalo que usaremos para pulsar el botón de pedir carta y mostrar las que habrían salido de seguir jugando
const iniciarIntervalo = () => {
  if (intervalId === undefined && puntuacion < 7.5) {
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
