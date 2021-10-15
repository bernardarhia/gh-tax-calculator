const express = require("express");
const router = express.Router();
const taxCalculator = require("../utils/tax");
const { payeValidation } = require("../validation/paye");
router.post("/calculate-paye", async (req, res) => {
  const { income, allowance = 0, taxRelief = 0, isAnnual = false } = req.body;
  const { error } =  payeValidation(req.body);

  if (error)return res.status(400).json({ error: error.details[0].message });

  try {
    const calculatedIncome = taxCalculator.calculatePaye(
        parseFloat(income),
        parseFloat(allowance),
       parseFloat(taxRelief),
        Boolean(isAnnual)
      );
      return res.status(200).json({ data: calculatedIncome });
    } catch (error) {
      return res.status(500).json({ error:"Something went wrong" });
  }
});

module.exports = router;
