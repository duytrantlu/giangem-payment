import { Module} from "@nestjs/common";
import { PaymentService } from "./payments.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentSchema } from "./payments.model";
import { PaymentController } from "./payments.controller";
import {ConfigModule} from "../config/config.module";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: "Payment", schema: PaymentSchema }], "payments")
  ],
  providers: [PaymentService],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentsModule  {}
