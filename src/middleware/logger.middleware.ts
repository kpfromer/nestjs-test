import { NestMiddleware } from '@nestjs/common';
import { transports } from 'winston';
import * as expressWinston from 'express-winston';

export class LoggerMiddleware implements NestMiddleware {
  resolve() {
    // TODO: use config values
    return expressWinston.logger({
      transports: [
        new transports.File({
          filename: 'combined.log',
          level: 'info'
        })
      ],
      meta: true,
      msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
      expressFormat: true,
      colorize: false
    });
  }
}
