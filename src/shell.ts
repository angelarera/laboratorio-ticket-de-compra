import { funcionPedirCarta, mostrarMensajeFinal, queHabriaPasado } from "./ui";

// PEDIR CARTA
const pedirBtn = document.querySelector(".seccion-principal__pedir-btn");

if (pedirBtn !== null && pedirBtn instanceof HTMLButtonElement) {
  pedirBtn.addEventListener("click", () => {
    funcionPedirCarta();
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

const futuroBtn = document.querySelector(".mensaje-final__futuro-btn");
if (futuroBtn !== null && futuroBtn instanceof HTMLButtonElement) {
  futuroBtn.addEventListener("click", () => {
    queHabriaPasado();
  });
}
