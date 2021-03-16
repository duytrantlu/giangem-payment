import {Test, TestingModule} from '@nestjs/testing';
import {ConfigModule} from '../config/config.module';
import {DatabaseModule} from '../database/database.module';
import {getModelToken, MongooseModule} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { IPayment, PaymentSchema } from './payments.model';
import { PaymentService } from './payments.service';



describe('Payment Service', () => {
  let service: PaymentService;
  let paymentModel: Model<IPayment>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        DatabaseModule,
        MongooseModule.forFeature(
          [{name: 'Payment', schema: PaymentSchema}],
          'payments',
        ),
      ],
      providers: [
        PaymentService,
      ],
    })
    .compile();

    service = module.get<PaymentService>(PaymentService);

    paymentModel = module.get(getModelToken('Payment'));

    await paymentModel.deleteMany({}).exec();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Payments service', () => {
    describe('createPayment', () => {
      it('[Success-Expected] - Create new Payment successfully', async (done) => {
        const data = {
          "customer": "mock customer",
          "orderId": "mock id order",
          "currency": "USD",
          "totalAmount": 2000
        }
        await service.createPayment(data);
        const payment = await (await paymentModel.findOne({})).execPopulate();
        expect(payment.customer).toBe(data.customer);
        expect(payment.status).toBe('CONFIRMED');
        done();
      });

      it('[Success-Expected] - Create new Payment successfully with status DECLINED', async (done) => {
        const data = {
          "customer": "mock customer",
          "orderId": "mock id order",
          "currency": "USD",
          "totalAmount": 10
        }
        await service.createPayment(data);
        const payment = await (await paymentModel.findOne({})).execPopulate();
        expect(payment.customer).toBe(data.customer);
        expect(payment.status).toBe('DECLINED');
        done();
      });
    });
  });
});
