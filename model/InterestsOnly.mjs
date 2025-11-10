import { Mortgage } from './Mortgage.mjs';

export class InterestsOnly extends Mortgage {
  constructor(amount, termInYears, rateEveryYear, calculator) {
    super(amount, termInYears, rateEveryYear, calculator);
    this.countPayments();
  }

  countPayments() {
    const paymentEveryMonth = this.getAmount() * this.getRateEveryMonth();
    const paymentTotal =
      paymentEveryMonth * this.getNumberOfRates() + this.getAmount();

    this.setPaymentEveryMonth(paymentEveryMonth);
    this.setPaymentTotal(paymentTotal);
  }
}