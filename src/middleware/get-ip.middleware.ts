import { NestMiddleware } from '@nestjs/common';
import * as requestIp from 'request-ip';

export class GetIpMiddleware implements NestMiddleware {
  resolve() {
    return (req, res, next) => {
      req.info = { ip: requestIp.getClientIp(req) };
      return next();
    };
  }
}
