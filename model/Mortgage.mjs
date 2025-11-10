export class Mortgage {
  constructor(amount, termInYears, rateEveryYear, calculator) {
    this.amount = amount;
    this.termInYears = termInYears;
    this.rateEveryYear = rateEveryYear;
    this.rateEveryMonth = this.rateEveryYear / (100*12);
    this.numberOfRates = this.termInYears * 12;
    this.calculator = calculator;

    this.paymentEveryMonth = 0;
    this.paymentTotal = 0;
  }

  getRateEveryMonth() {
    return this.rateEveryMonth;
  }

  getNumberOfRates() {
    return this.numberOfRates;
  }

  getPaymentEveryMonth() {
    return this.paymentEveryMonth;
  }

  getPaymentTotal() {
    return this.paymentTotal;
  }

  setRateEveryMonth(value) {
    this.rateEveryMonth = value;
  }

  setNumberOfRates(value) {
    this.numberOfRates = value;
  }

  setPaymentEveryMonth(value) {
    this.paymentEveryMonth = value;
    this.calculator.setPaymentEveryMonth(this.paymentEveryMonth);
  }

  setPaymentTotal(value) {
    this.paymentTotal = value;
    this.calculator.setPaymentTotal(this.paymentTotal);
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

  setAmount(value) {
    this.amount = value;
  }

  setTermInYears(value) {
    this.termInYears = value;
  }

  setRateEveryYear(value) {
    this.rateEveryYear = value;
  }

  countPayments() {
    throw new Error("Must be overridden in the subclass");
  }
}