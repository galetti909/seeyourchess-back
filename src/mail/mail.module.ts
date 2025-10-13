import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const port = config.MAIL_PORT ?? 587;
        const secure = port === 465;
        const templatesDir = path.join(
          process.cwd(),
          'src',
          'mail',
          'templates',
        );
        return {
          transport: {
            host: config.MAIL_HOST,
            port,
            secure,
            auth: {
              user: config.MAIL_USER,
              pass: config.MAIL_PASS,
            },
          },
          defaults: {
            from:
              config.MAIL_FROM ??
              `"${config.MAIL_FROM_NAME ?? 'No Reply'}" <no-reply@example.com>`,
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
