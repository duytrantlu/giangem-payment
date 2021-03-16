import {Provider} from "@nestjs/common";
import * as dotenv from "dotenv";

export const CONFIG = "PaymentConfigProvider";

export const configProvider: Provider = {
  provide: CONFIG,
  useFactory: () => {
    dotenv.config();
    return import("config");
  },
};
