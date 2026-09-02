const calculateQuote = require("../src/quoteCalculator.js");

test("Calcular la prima básica y si hubo siniestros el último año y/o que el conductor sea menor a 25 años aumentar el importe", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 22,
    },
    history: {
      accidentsLastYear: 1,
    },
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(780_000);
});
