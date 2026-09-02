const calculateQuote = require("../src/quoteCalculator.js");

test("Calcular la prima básica y dar descuento en caso que el cliente tenga otro seguro", () => {
  const context = {
    vehicle: {
      value: 10_000_000,
    },
    client: {
      age: 40,
      otherPolicies: 2,
    },
    history: {},
  };

  const result = calculateQuote(context);

  expect(result.premium).toBe(475_000);
});
