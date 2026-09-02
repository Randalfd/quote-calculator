const calculateQuote = require("../src/quoteCalculator.js");

test("calcula la prima básica como el 5% del valor del vehículo, si no hubo siniestros en los últimos años reducir la prima un 10%", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 40,
    },
    history: {
      yearsWithoutAccidents: 6,
    },
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(450_000);
});
