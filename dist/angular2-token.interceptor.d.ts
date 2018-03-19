import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Angular2TokenService } from './angular2-token.service';
import { Observable } from 'rxjs/Observable';
export declare class Angular2TokenInteceptor implements HttpInterceptor {
    private _tokenService;
    apiPath: string;
    constructor(_tokenService: Angular2TokenService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private getAuthHeadersFromResponse(data);
}
