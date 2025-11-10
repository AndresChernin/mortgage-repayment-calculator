import { Mortgage } from './Mortgage.mjs';

export class Repayment extends Mortgage {
  constructor(amount, termInYears, rateEveryYear, calculator) {
    super(amount, termInYears, rateEveryYear, calculator);
    this.countPayments();
  }

  countPayments() {
    const i = this.getRateEveryMonth();
    const n = this.getNumberOfRates();
    const paymentEveryMonth =
      this.getAmount() *
      ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
    const paymentTotal = paymentEveryMonth * n;

    this.setPaymentEveryMonth(paymentEveryMonth);
    this.setPaymentTotal(paymentTotal);
  }
}