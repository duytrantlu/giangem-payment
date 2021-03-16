import { IParamPaymentCheckout } from "./payload/payments.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPayment } from "./payments.model";
import { THRESOLD } from "./payments.const";
import { PAYMENT_STATUS } from "./enum/payments.enum";

export class PaymentService {
  constructor(
    @InjectModel("Payment") private readonly paymentModel: Model<IPayment>,
  ){}
  async createPayment(paymentBody: IParamPaymentCheckout): Promise<IPayment> {
    const mockStatusPayment = paymentBody.totalAmount >= THRESOLD ? PAYMENT_STATUS.CONFIRMED : PAYMENT_STATUS.DECLINED;
    const createdPayment = new this.paymentModel({
      customer: paymentBody.customer,
      orderId: paymentBody.orderId,
      totalAmount: paymentBody.totalAmount,
      currency: paymentBody.currency,
      status: mockStatusPayment})
    return createdPayment.save();
  }
}