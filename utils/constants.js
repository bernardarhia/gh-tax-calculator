
const SSNIT_RATE = 5.5;
const NUM_OF_MONTHS = 12;
const monthlyTaxRates = [
  [0, 319],
  [5, 100],
  [10, 120],
  [17.5, 3000],
  [25, 16461],
  [30, Number.POSITIVE_INFINITY], // anything above GHC 20,000
];

module.exports = {SSNIT_RATE, monthlyTaxRates, NUM_OF_MONTHS}