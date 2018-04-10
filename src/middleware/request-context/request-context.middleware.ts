import { RequestContext } from './request-context';
import { Middleware, NestMiddleware } from '@nestjs/common';

@Middleware()
export class RequestContextMiddleware implements NestMiddleware {
  resolve() {
    return (req, res, next) => {
      const requestContext = new RequestContext(req, res);
      Zone.current
        .fork({
          name: RequestContext.name,
          properties: {
            [RequestContext.name]: requestContext
          }
        })
        .fork(Zone['longStackTraceZoneSpec'])
        .run(async () => {
          await next();
        });
    };
  }
}
