import {
  calcularTicket,
  calcularTotalTicket,
  calcularDesglosePorTipoDeIva,
} from "./calcula-ticket.business";

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

const calcularTicketFinal = (lineasTicket: LineaTicket[]): TicketFinal => {
  const { lineas } = calcularTicket(lineasTicket);
  const total = calcularTotalTicket(lineasTicket);
  const desgloseIva = calcularDesglosePorTipoDeIva(lineasTicket);

  return {
    lineas,
    total,
    desgloseIva,
  };
};

console.log("El ticket final es", calcularTicketFinal(productos));
