import { Repayment } from "./Repayment.mjs";
import { InterestsOnly } from "./InterestsOnly.mjs";
export class MortgageCalculator {
  constructor(amount, termInYears, rateEveryYear) {
    this.amount = amount;
    this.termInYears = termInYears;
    this.rateEveryYear = rateEveryYear;

    this.paymentEveryMonth = 0;
    this.paymentTotal = 0;
    this.typeOfMortgage = null;
    this.aktuellMortgage = null;
  }

  countMortgage() {
    if (this.typeOfMortgage === "Repayment") {
      this.aktuellMortgage = new Repayment(
        this.amount,
        this.termInYears,
        this.rateEveryYear,
        this
      );
    } else if (this.typeOfMortgage === "Interests") {
      this.aktuellMortgage = new InterestsOnly(
        this.amount,
        this.termInYears,
        this.rateEveryYear,
        this
      );
    }
  }

  getPaymentEveryMonth() {
    return this.paymentEveryMonth;
  }

  getPaymentTotal() {
    return this.paymentTotal;
  }

  setPaymentEveryMonth(value) {
    this.paymentEveryMonth = value;
  }

  setPaymentTotal(value) {
    this.paymentTotal = value;
  }

  getAmount() {
    return this.amount;
  }

  getTermInYears() {
    return this.termInYears;
  }

  getRateEveryYear() {
    return this.rateEveryYear;
  }
 

  getTypeOfMortgage() {
    return this.typeOfMortgage;
  }

  getAktuellMortgage() {
    return this.aktuellMortgage;
  }

  setAmount(value) {
    this.amount = value;
  }

  setTermInYears(value) {
    this.termInYears = value;
  }

  setRateEveryYear(value) {
    this.rateEveryYear = value;
  }

  setTypeOfMortgage(value) {
    this.typeOfMortgage = value;
  }

  setAktuellMortgage(m) {
    this.aktuellMortgage = m;
  }
}
