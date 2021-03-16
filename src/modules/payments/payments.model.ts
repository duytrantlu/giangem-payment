import { Schema, Document } from "mongoose";
import { ORDER_CURRENCY, PAYMENT_STATUS} from "./enum/payments.enum";

export const PaymentSchema = new Schema({
  customer: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: ORDER_CURRENCY.USD,
    enum: Object.values(ORDER_CURRENCY)
  },
  deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(PAYMENT_STATUS)
  }
}, {
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate"
  }
});

export interface IPayment extends Document {
  readonly _id: string;
  readonly customer: string;
  readonly orderId: string;
  readonly totalAmount: number;
  currency: string;
  status: string;
}