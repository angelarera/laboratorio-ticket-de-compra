import {
  calcularPrecioSinIva,
  obtenerPorcentajeIva,
  calcularPrecioConIva,
  calcularTotalTicket,
  calcularDesglosePorTipoDeIva,
} from "./calcula-ticket.business";

describe("calcularPrecioSinIva", () => {
  it("el precio total del producto sin IVA es igual a su precio unitario multiplicado por el número de unidades del producto", () => {
    // Arrange
    const precioUnitario = 3;
    const cantidad = 2;

    // Act
    const resultado = calcularPrecioSinIva(precioUnitario, cantidad);

    // Assert
    const resultadoEsperado = 6;
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("obtenerPorcentajeIva", () => {
  it("si el producto tiene tipo de IVA general, debería devolver un 21", () => {
    // Arrange
    const tipoIva = "general";

    // Act
    const resultado = obtenerPorcentajeIva(tipoIva);

    // Assert
    const resultadoEsperado = 21;
    expect(resultado).toBe(resultadoEsperado);
  });

  it("si el producto tiene IVA reducido, debería devolver un 10", () => {
    // Arrange
    const tipoIva = "reducido";

    // Act
    const resultado = obtenerPorcentajeIva(tipoIva);

    // Assert
    const resultadoEsperado = 10;
    expect(resultado).toBe(resultadoEsperado);
  });

  it("si el producto tiene IVA super reducido A, debería devolver un 5", () => {
    // Arrange
    const tipoIva = "superreducidoA";

    // Act
    const resultado = obtenerPorcentajeIva(tipoIva);

    // Assert
    const resultadoEsperado = 5;
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("calcularPrecioConIva", () => {
  it("si el producto vale 10, tiene IVA general (21%) y solo se compra una unidad, debe valer 12.1", () => {
    // Arrange
    const precioUnitario = 10;
    const cantidad = 1;
    const tipoIva = "general";

    // Act
    const resultado = calcularPrecioConIva(precioUnitario, cantidad, tipoIva);

    // Assert
    const resultadoEsperado = 12.1;
    expect(resultado).toBe(resultadoEsperado);
  });
});

describe("calcularTotalTicket", () => {
  it("debe calcular el total sin IVA, con IVA y el total del IVA de los productos", () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
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
    ];

    // Act
    const resultado = calcularTotalTicket(lineasTicket);

    // Assert
    const resultadoEsperado = {
      totalSinIva: 2 * 2 + 20 * 3,
      totalConIva: 2.42 * 2 + 24.2 * 3,
      totalIva: 2.42 * 2 + 24.2 * 3 - (2 * 2 + 20 * 3),
    };

    expect(resultado.totalSinIva).toBeCloseTo(resultadoEsperado.totalSinIva);
    expect(resultado.totalConIva).toBeCloseTo(resultadoEsperado.totalConIva);
    expect(resultado.totalIva).toBeCloseTo(resultadoEsperado.totalIva);
  });
});

describe("calculardesglosePorTipoDeIva", () => {
  it("debe desglosar el tipo de IVA del ticket y la cuantía total", () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
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
          nombre: "Lasaña",
          precio: 5,
          tipoIva: "superreducidoA",
        },
        cantidad: 1,
      },
    ];

    // Act
    const resultado = calcularDesglosePorTipoDeIva(lineasTicket);

    // Assert
    const resultadoEsperado = [
      {
        tipoIva: "general",
        cuantia: 0.42 * 2,
      },
      {
        tipoIva: "superreducidoA",
        cuantia: 0.25,
      },
    ];

    expect(resultado).toEqual(resultadoEsperado);
  });
});
