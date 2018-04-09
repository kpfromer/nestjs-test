import {Token} from '../../dto/token.dto';

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

    if (requestContext) {
      return requestContext.request.user;
    }

    return null;
  }
}