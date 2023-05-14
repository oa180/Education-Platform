import { Body, Controller, Post } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: 'sandbox', // Set to 'live' for production
  client_id:
    'AUw0U0r1gC70nBh7EaIApmRvLFAvU3LAOCb2mvH8Sl3isB9_knhUI5CJebnHFIcOpC4oTYSA0Mf96c-e',
  client_secret:
    'EHb0JGkjIfoLbr71mlFxudVMXNskD6BOWDt3sT1E9EMHK5NTWtQo6FT0Ftjo4SQsEkGCItf4zBXLMvYr',
});

@Controller('payment')
export class PaymentController {
  @Post()
  async createPayment(@Body() data: any): Promise<any> {
    const paymentRequest = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://google.com',
        cancel_url: 'https://google.com',
      },
      transactions: [
        {
          amount: {
            total: 500,
            currency: 'USD', // Change to your currency code
          },
          description: 'data.description',
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentRequest, (error, payment) => {
        if (error) {
          console.log('e', error);
          reject(error);
        } else {
          console.log(payment);
          const redirectUrl = payment.links.find(
            (link) => link.rel === 'approval_url',
          ).href;
          resolve(redirectUrl);
        }
      });
    });
  }
}
