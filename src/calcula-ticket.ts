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

export const calcularPrecioSinIva = (
  precioUnitario: number,
  cantidad: number
): number => {
  return precioUnitario * cantidad;
};

export const obtenerPorcentajeIva = (tipoIva: TipoIva): number => {
  switch (tipoIva) {
    case "general":
      return 21;
    case "reducido":
      return 10;
    case "superreducidoA":
      return 5;
    case "superreducidoB":
      return 4;
    case "superreducidoC":
      return 0;
    case "sinIva":
      return 0;
    default:
      return 0;
  }
};

export const calcularPrecioConIva = (
  precioUnitario: number,
  cantidad: number,
  tipoIva: TipoIva
): number => {
  const porcentajeIva = obtenerPorcentajeIva(tipoIva);
  const precioSinIva = calcularPrecioSinIva(precioUnitario, cantidad);

  return parseFloat(
    (precioSinIva + (precioSinIva * porcentajeIva) / 100).toFixed(2)
  );
};

const calcularTicket = (lineasTicket: LineaTicket[]) => {
  const lineas: ResultadoLineaTicket[] = [];

  for (let i = 0; i < lineasTicket.length; i++) {
    const linea = lineasTicket[i];
    const { producto, cantidad } = linea;
    const precioSinIva = calcularPrecioSinIva(producto.precio, cantidad);
    const precioConIva = calcularPrecioConIva(
      producto.precio,
      cantidad,
      producto.tipoIva
    );

    lineas.push({
      nombre: producto.nombre,
      cantidad,
      precionSinIva: precioSinIva,
      tipoIva: producto.tipoIva,
      precioConIva: precioConIva,
    });
  }

  return { lineas };
};

export const calcularTotalTicket = (
  lineasTicket: LineaTicket[]
): ResultadoTotalTicket => {
  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;

  for (let i = 0; i < lineasTicket.length; i++) {
    const linea = lineasTicket[i];
    const { producto, cantidad } = linea;

    const precioSinIva = calcularPrecioSinIva(producto.precio, cantidad);
    totalSinIva += precioSinIva;

    const precioConIva = calcularPrecioConIva(
      producto.precio,
      cantidad,
      producto.tipoIva
    );
    totalConIva += precioConIva;

    totalIva += parseFloat((precioConIva - precioSinIva).toFixed(2));
  }

  return {
    totalSinIva: totalSinIva,
    totalConIva: totalConIva,
    totalIva: totalIva,
  };
};

export const calcularDesglosePorTipoDeIva = (
  lineasTicket: LineaTicket[]
): TotalPorTipoIva[] => {
  const desglosePorTipoIva: TotalPorTipoIva[] = [];

  for (let i = 0; i < lineasTicket.length; i++) {
    const linea = lineasTicket[i];
    const { producto, cantidad } = linea;

    const precioSinIva = calcularPrecioSinIva(producto.precio, cantidad);
    const precioConIva = calcularPrecioConIva(
      producto.precio,
      cantidad,
      producto.tipoIva
    );
    const totalIva = parseFloat((precioConIva - precioSinIva).toFixed(2));

    const tipoIvaExistente = desglosePorTipoIva.find(
      (item) => item.tipoIva === producto.tipoIva
    ); // Buscamos si ya se ha registrado ese tipo de IVA

    if (tipoIvaExistente) {
      tipoIvaExistente.cuantia += totalIva;
    } else {
      desglosePorTipoIva.push({
        tipoIva: producto.tipoIva,
        cuantia: totalIva,
      });
    }
  }

  return desglosePorTipoIva;
};

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
