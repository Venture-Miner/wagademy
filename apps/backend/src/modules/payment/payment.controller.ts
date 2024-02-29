import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CognitoUserGuard } from '../../infra';
import { User } from '@wagademy/types';
import { DBUser } from '../../shared/decorators';
import {
  BuyCreditsDto,
  CreateSubscriptionDto,
  StripeCustomerPortalDto,
  UpdateSubscriptionDto,
} from './dto';
import {
  CheckoutSessionEntity,
  FindManyPlansResponseEntity,
  GetStripeCustomerPortalResponseEntity,
  GetUserCurrentCreditsResponseEntity,
} from './entities';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Initiate user checkout and payment creation',
    description:
      'This endpoint is specifically designed for users upgrading from the standard or free plan to a paid plan for the first time.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The checkout process has been initiated and a payment record has been successfully created.',
    type: CheckoutSessionEntity,
  })
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.paymentService.createSubscription(
      userId,
      createSubscriptionDto
    );
  }

  @Post('buy-credits')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Initiate purchase of credits and payment creation',
    description:
      'This endpoint is used when a user wants to purchase credits and create a payment for a specific product.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The purchase of credits has been initiated and a payment record has been successfully created.',
    type: CheckoutSessionEntity,
  })
  buyCredits(
    @Body() buyCreditsDto: BuyCreditsDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.paymentService.buyCredits(userId, buyCreditsDto);
  }

  @Post('customer-portal')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve Customer Portal',
    description:
      'This endpoint retrieves the Stripe Customer Portal for the authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stripe Customer Portal has been successfully retrieved.',
    type: GetStripeCustomerPortalResponseEntity,
  })
  getStripeCustomerPortal(
    @Body() { callbackUrl }: StripeCustomerPortalDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.paymentService.getStripeCustomerPortal(userId, callbackUrl);
  }

  @Patch('update-subscription')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Update user subscription and payment',
    description:
      'This endpoint is used when a user wants to update their subscription and corresponding payment for a specific product.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "The user's subscription and payment have been successfully updated.",
    type: Boolean,
  })
  updateSubscription(
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @DBUser()
    { id: userId }: User
  ) {
    return this.paymentService.updateSubscription(
      userId,
      updateSubscriptionDto
    );
  }

  @Get('user-credits')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Retrieve current credit balance of user',
    description:
      'This endpoint is used to fetch the current credit balance of a user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The current credit balance of the user has been successfully retrieved.',
    type: GetUserCurrentCreditsResponseEntity,
  })
  getUserCurrentCredits(
    @DBUser()
    { id: userId }: User
  ) {
    return this.paymentService.getUserCurrentCredits(userId);
  }

  @Get('plans')
  @ApiBearerAuth()
  @UseGuards(CognitoUserGuard)
  @ApiOperation({
    summary: 'Fetch all available subscription plans',
    description:
      'This endpoint is used to fetch all the subscription plans that are currently available.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'All available subscription plans have been successfully retrieved.',
    type: FindManyPlansResponseEntity,
  })
  findManyPlans() {
    return this.paymentService.findManyPlans();
  }
}
