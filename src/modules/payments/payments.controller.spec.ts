import {Test, TestingModule} from '@nestjs/testing';
import {PaymentController} from './payments.controller';
import {PaymentService} from './payments.service';

describe('Payment Controller', () => {
  let controller: PaymentController;
  const mockedPaymentService = {
    createPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
      controllers: [PaymentController],
    })
      .overrideProvider(PaymentService)
      .useValue(mockedPaymentService)
      .compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('payments', () => {
    it('[Success-Expescted] - create new payment successfully', async () => {
      const data = {
        "customer": "string",
        "orderId": "string",
        "currency": "USD",
        "totalAmount": 2000
      }
      mockedPaymentService.createPayment.mockImplementation(() => Promise.resolve({
        ...data,
        status: 'CONFIRMED'
      }));
      const result = await controller.createPayment(data);
      expect(result.orderId).toBe(data.orderId);
      expect(mockedPaymentService.createPayment).toHaveBeenCalled();
    })
  })

});
