const calculateQuote = require("../src/quoteCalculator.js");

test("Calcular la prima básica y dar recarga en caso que sea un vehículo de alta gama", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
      highEnd: true,
    },
    client: {},
    history: {},
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(575_000);
});
