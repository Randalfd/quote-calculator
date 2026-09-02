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

function calculateQuote(context) {
  let premium = context.vehicle.value * BASE_PREMIUM_RATE;

  if (context.client.age < YOUNG_DRIVER_AGE_THRESHOLD) {
    premium += premium * YOUNG_DRIVER_RECHARGE;
  }

  if (context.history.accidentsLastYear) {
    premium += premium * ACCIDENTS_LAST_YEAR_RECHARGE;
  }

  if (context.vehicle.highEnd) {
    premium += premium * HIGH_END_VEHICLE_RECHARGE;
  }

  if (
    context.history.yearsWithoutAccidents >=
    MIN_YEARS_WITHOUT_ACCIDENTS_TO_DISCOUNT
  ) {
    premium -= premium * YEARS_WITHOUT_ACCIDENTS_DISCOUNT;
  }

  if (context.client.otherPolicies >= MIN_POLICIES_TO_DISCOUNT) {
    premium -= premium * MULTI_POLICY_DISCOUNT;
  }

  if (premium < MIN_PREMIUM) {
    premium = MIN_PREMIUM;
  }

  const result = {
    premium: premium,
  };

  return result;
}
module.exports = calculateQuote;
