import {
  Controller,
  Headers,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { StripeWebhookService } from './stripe-webhook.service';

@ApiBearerAuth()
@ApiTags('Stripe Webhook')
@Controller()
export class StripeController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post('webhook')
  @ApiOperation({
    description: 'Endpoint for handling incoming Stripe webhook events.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stripe webhook event processed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Request rejected due to invalid Stripe signature.',
  })
  stripeWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature
  ) {
    const raw = request.rawBody as Buffer;
    return this.stripeWebhookService.stripeWebhooks(raw, signature);
  }
}
