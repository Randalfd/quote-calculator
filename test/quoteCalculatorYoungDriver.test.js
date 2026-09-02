const calculateQuote = require("../src/quoteCalculator.js");

test("Calcular la prima básica y dar una recarga en caso que el conductor sea menor a 25 años", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 24,
    },
    history: {},
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(600_000);
});
