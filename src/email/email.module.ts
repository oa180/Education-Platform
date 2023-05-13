import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
