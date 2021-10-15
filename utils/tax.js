const {SSNIT_RATE, monthlyTaxRates, NUM_OF_MONTHS} = require("./constants")


class TaxCalculator{

 calculatePaye(
    grossInput,
    allowancesInput,
    taxReliefInput,
    isAnnual = false
  ) {
    const grossIncome = isAnnual ? grossInput / NUM_OF_MONTHS : grossInput;
    const allowances = isAnnual ? allowancesInput / NUM_OF_MONTHS: allowancesInput;
    const taxRelief = isAnnual ? taxReliefInput / NUM_OF_MONTHS : taxReliefInput;
  
    return this.computePay({
      grossIncome,
      allowances,
      taxRelief,
      taxRates: monthlyTaxRates,
    });
  }
  
  computePay({ grossIncome, allowances, taxRelief, taxRates }) {
    let totalTax = 0;
  
    const ssnitContribution = (grossIncome * SSNIT_RATE) / 100;
  
    const totalTaxRelief = ssnitContribution + taxRelief;
  
    let taxableRemaining = grossIncome - totalTaxRelief + allowances;
  
    const computationTaxBreakdown = [
      {
        taxRate: 0,
        taxAmount: 0,
        amountTaxed: 0,
      },
    ];
  
    for (let i = 0; i < taxRates.length; i++) {
      if (taxableRemaining > 0) {
        const [taxRate, taxableAmount] = taxRates[i];
        const actualTaxableAmount =
          taxableRemaining > taxableAmount ? taxableAmount : taxableRemaining;
  
        const trancheTax = (taxRate * actualTaxableAmount) / 100;
  
        totalTax = totalTax + trancheTax;
  
        computationTaxBreakdown[i] = {
          taxRate,
          taxAmount: trancheTax.toFixed(2),
          amountTaxed: actualTaxableAmount.toFixed(2),
        };
  
        taxableRemaining = taxableRemaining - actualTaxableAmount;
      }
    }
  
    const netIncome = grossIncome + allowances - totalTax - ssnitContribution;
  
    return {
      incomeTax: totalTax.toFixed(2),
      ssnit: ssnitContribution.toFixed(2),
      netIncome: netIncome.toFixed(2),
      computationTaxBreakdown,
    };
  }
  
 isPositiveNumber(number) {
    const positiveNumberRegex = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;
    return positiveNumberRegex.test(number);
  }
  
 isPositive(val) {
    if (val === "") return false;
    return isPositiveNumber(val);
  }
  
}

module.exports = new TaxCalculator