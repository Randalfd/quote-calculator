const calculateQuote = require("../src/quoteCalculator.js");

test("Calcular la prima básica, no menor a 100.000$", () => {
  const context = {
    vehicle: {
      value: 1_000_000,
    },
    client: {},
    history: {
      yearsWithoutAccidents: 6,
    },
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(100_000);
});
