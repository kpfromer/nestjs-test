"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestContext {
    constructor(request, response) {
        this.id = Math.random();
        this.request = request;
        this.response = response;
    }
    static currentRequestContext() {
        return Zone.current.get(RequestContext.name);
    }
    static currentRequest() {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            return requestContext.request;
        }
        return null;
    }
    static currentUser() {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            return requestContext.request.user;
        }
        return null;
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map