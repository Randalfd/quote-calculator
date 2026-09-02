# Quote Calculator

Calculadora de primas para seguros de vehículos. A partir de un conjunto de
factores de riesgo (edad del conductor, historial de accidentes, tipo de
vehículo y número de pólizas), calcula la prima de un seguro de auto.

Es un módulo de lógica de negocio pura, sin dependencias de ejecución, y
cuenta con una suite de pruebas que cubre cada una de las reglas de cálculo.

## Características

El cálculo de la prima aplica las siguientes reglas, en orden, de forma
**acumulativa** (cada ajuste se aplica sobre el valor resultante del paso
anterior):

| Regla                             | Ajuste                      | Condición                              |
| --------------------------------- | --------------------------- | -------------------------------------- |
| Prima base                        | `5%` del valor del vehículo | Siempre                                |
| Recargo por conductor joven       | `+20%`                      | Edad < 25 años                         |
| Recargo por accidentes            | `+30%`                      | Al menos un accidente en el último año |
| Recargo por vehículo de gama alta | `+15%`                      | Vehículo `highEnd`                     |
| Descuento por buen historial      | `-10%`                      | 5 o más años sin accidentes            |
| Descuento multipóliza             | `-5%`                       | 2 o más pólizas adicionales            |
| Prima mínima                      | `100.000`                   | Si el resultado queda por debajo       |

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión compatible con Jest 30)
- [pnpm](https://pnpm.io/) 10.x

## Instalación

Instala las dependencias con pnpm:

```bash
pnpm install
```

## Uso

```js
const calculateQuote = require("./src/quoteCalculator");

const context = {
  vehicle: {
    value: 10000000, // valor del vehículo (moneda)
    highEnd: false,
  },
  client: {
    age: 40,
    otherPolicies: 0,
  },
  history: {
    accidentsLastYear: 0,
    yearsWithoutAccidents: 0,
  },
};

const result = calculateQuote(context);
console.log(result.premium); // 500000
```

## API

### `calculateQuote(context)`

Función exportada por defecto que calcula la prima de un seguro.

| Parámetro                               | Tipo      | Descripción                     |
| --------------------------------------- | --------- | ------------------------------- |
| `context.vehicle.value`                 | `number`  | Valor del vehículo.             |
| `context.vehicle.highEnd`               | `boolean` | Si el vehículo es de gama alta. |
| `context.client.age`                    | `number`  | Edad del conductor.             |
| `context.client.otherPolicies`          | `number`  | Cantidad de otras pólizas.      |
| `context.history.accidentsLastYear`     | `number`  | Accidentes en el último año.    |
| `context.history.yearsWithoutAccidents` | `number`  | Años sin accidentes.            |

**Retorno:** un objeto `{ premium: number }` con la prima calculada.

> **Nota:** la función tolera campos faltantes (por ejemplo, `history: {}`),
> tratando los valores ausentes como neutros (sin recargos ni descuentos).

### Constantes de configuración

Los porcentajes y umbrales están definidos como constantes al inicio del
archivo `src/quoteCalculator.js` y pueden ajustarse sin tocar la lógica:

```js
const YOUNG_DRIVER_RECHARGE = 0.2;
const ACCIDENTS_LAST_YEAR_RECHARGE = 0.3;
const HIGH_END_VEHICLE_RECHARGE = 0.15;
const YEARS_WITHOUT_ACCIDENTS_DISCOUNT = 0.1;
const MULTI_POLICY_DISCOUNT = 0.05;
const YOUNG_DRIVER_AGE_THRESHOLD = 25;
const MIN_YEARS_WITHOUT_ACCIDENTS_TO_DISCOUNT = 5;
const BASE_PREMIUM_RATE = 0.05;
const MIN_PREMIUM = 100_000;
const MIN_POLICIES_TO_DISCOUNT = 2;
```

## Tests

Ejecuta la suite de pruebas con:

```bash
pnpm test
```

Las pruebas usan [Jest](https://jestjs.io/) y están organizadas en
`test/`, un archivo por escenario:

| Archivo                                          | Escenario cubierto                |
| ------------------------------------------------ | --------------------------------- |
| `quoteCalculator.test.js`                        | Caso base                         |
| `quoteCalculatorAccidents.test.js`               | Recargo por accidentes            |
| `quoteCalculatorAccidentsAndYoungDriver.test.js` | Joven conductor + accidentes      |
| `quoteCalculatorGoodHistory.test.js`             | Descuento por buen historial      |
| `quoteCalculatorHighEndVehicle.test.js`          | Recargo por vehículo de gama alta |
| `quoteCalculatorInsuranceDiscount.test.js`       | Descuento multipóliza             |
| `quoteCalculatorMinPolicy.test.js`               | Prima mínima                      |
| `quoteCalculatorYoungDriver.test.js`             | Recargo por conductor joven       |

## Estructura del proyecto

```
├── src/
│   └── quoteCalculator.js   # Lógica de cálculo de primas
├── test/                    # Suites de prueba (un escenario por archivo)
├── package.json
├── pnpm-lock.yaml           # Lockfile de pnpm
└── README.md
```

## Licencia

ISC
