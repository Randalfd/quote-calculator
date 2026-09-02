const calculateQuote = require("../src/quoteCalculator.js");

test("calcula la prima básica como el 5% del valor del vehículo", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 40,
    },
    history: {},
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(500_000);
});
