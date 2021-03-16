import {Module} from "@nestjs/common";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {IConfig} from "config";
import {ConfigModule} from "../config/config.module";
import {CONFIG} from "../config/config.provider";
import {MONGO_PAYMENT_CONNECTION_NAME} from "./database.const";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: MONGO_PAYMENT_CONNECTION_NAME,
      useFactory: (config: IConfig): MongooseModuleOptions => ({
        uri: config.get("mongodb.payments.uri"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
      inject: [CONFIG],
    }),
  ],
})
export class DatabaseModule {}
