import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse
}
    from '@angular/common/http';
import { Angular2TokenService } from './angular2-token.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {AuthData} from "./angular2-token.model";

@Injectable()
export class Angular2TokenInteceptor implements HttpInterceptor {
    apiPath: string;
    constructor(
        private _tokenService: Angular2TokenService,
    ){
        this.apiPath = this._tokenService.apiPath;
    }
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('In token interceptor, request : ', req,
            this._tokenService.currentAuthHeaders);
        let headersWithAuth = this._tokenService.currentAuthHeaders;
        const apiPath =
        req.headers.keys().forEach(key => {
            headersWithAuth = headersWithAuth.append(key, req.headers.get(key) )
        });
        console.log('In intercept request, new headers : ', headersWithAuth);
        if(req.url.match(this.apiPath)){
            req = req.clone({headers: headersWithAuth});
            const authHeaders = this._tokenService.currentAuthHeaders;
            authHeaders.keys().forEach(key => {
                req.headers.append(key, authHeaders.get(key) )
            });
        }


        return next.handle(req)
            .pipe(
                tap((res => {
                        console.log('In token interceptor, evt : ', res);
                        if(res instanceof HttpResponse && res.url.match(this.apiPath)){
                            console.log('---> status:', res.status);
                            console.log('---> filter:', req.params.get('filter'));
                            //this.getAuthHeadersFromResponse(<any>res);
                        }
                    }),
                    (err => {
                        if(err instanceof HttpErrorResponse && err.url.match(this.apiPath)){
                            console.log('In token interceptor, err : ', err);
                            //this.getAuthHeadersFromResponse(<any>err);
                        } else {
                            console.log("Auth Interceptor, non HTTP error - ", err)
                        }


                    })
                )
            )
    }


    // Parse Auth data from response
    private getAuthHeadersFromResponse(data: any): void {
        let headers = data.headers;

        let authData: AuthData = {
            accessToken: headers.get('access-token'),
            client: headers.get('client'),
            expiry: headers.get('expiry'),
            tokenType: headers.get('token-type'),
            uid: headers.get('uid')
        };

        this._tokenService.currentAuthData = authData;
    }

}