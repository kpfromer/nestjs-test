import { Token } from 'dto/token.dto';
import { get } from 'lodash';

export class RequestContext {
  public readonly id: number;
  public request;
  public response: Response;

  constructor(request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    return Zone.current.get(RequestContext.name);
  }

  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  public static currentUser(): Token {
    const requestContext = RequestContext.currentRequestContext();

    // TODO: kiss
    if (requestContext) {
      return requestContext.request.user;
    }

    return null;
  }

  public static currentIp(): string {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return get(requestContext, 'request.info.ip');
    }

    return null;
  }
}
