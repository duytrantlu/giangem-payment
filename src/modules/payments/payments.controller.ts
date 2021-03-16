import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { ErrorDto } from "../base/error.dto";
import {PaymentService} from "./payments.service";
import {roundNumber} from "./payments.utils";
import { PaymentDto, PaymentRequestDto } from "./dto/payments.dto";

/**
 * Payment Controller
 */
@ApiBearerAuth()
@ApiTags("Payment")
@Controller("")
export class PaymentController {
  /**
   * Constructor
   * @param paymentService
   */
  constructor(private readonly paymentService: PaymentService) {}

  @Post("checkout")
  @ApiOperation({
    operationId: "createPayment",
    description: "Create new payment",
  })
  @ApiCreatedResponse({
    description: "The record has been successfully created",
    type: PaymentDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: ErrorDto,
  })
  @ApiBadRequestResponse({
    description: "Something error in business",
    type: ErrorDto,
  })
  @ApiServiceUnavailableResponse({
    description: "Service Unavailable",
    type: ErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server Error",
    type: ErrorDto,
  })
  async createPayment(
      @Body() paymentDto: PaymentRequestDto,
    ): Promise<PaymentDto> {
    const paymentBody = {
      customer: paymentDto.customer,
      orderId: paymentDto.orderId,
      currency: paymentDto.currency,
      totalAmount: roundNumber(Number(paymentDto.totalAmount)),
    }
    return this.paymentService.createPayment(paymentBody);
  }
}