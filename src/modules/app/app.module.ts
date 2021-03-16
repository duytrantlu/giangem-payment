import * as winston from "winston";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "../config/config.module";
import { CONFIG } from "../config/config.provider";
import { WinstonModule } from "../winston/winston.module";
import { DatabaseModule } from "modules/database/database.module";
import { Authentication } from "modules/middlewares/middleware";
import { PaymentsModule } from "modules/payments/payments.module";

@Module({
  imports: [
    ConfigModule,
    PaymentsModule,
    DatabaseModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      useFactory: () => {
        return {
          level: process.env.NODE_ENV !== "production" ? "debug" : "info",
          format: winston.format.json(),
          defaultMeta: { service: "payments-service" },
          transports: [
            new winston.transports.Console({
              format: winston.format.simple(),
            }),
          ],
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).forRoutes({path: "*", method: RequestMethod.ALL});
  }
}
