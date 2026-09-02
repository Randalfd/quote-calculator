const calculateQuote = require("../src/quoteCalculator");

test("calcula la prima básica como el 5% del valor del vehículo, si hay siniestro en el último año aumentar la prima aumenta un 30%", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 40,
    },
    history: {
      accidentsLastYear: 1,
    },
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(650_000);
});
