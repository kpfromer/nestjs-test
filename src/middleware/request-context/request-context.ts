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

  public static currentRequest() {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  public static currentUser(): Token {
    const request = RequestContext.currentRequest();

    return get(request, 'user', null);
  }

  public static currentIp(): string {
    const request = RequestContext.currentRequest();

    return get(request, 'info.ip', null);
  }
}
