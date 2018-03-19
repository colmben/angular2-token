import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders
}
    from '@angular/common/http';
import { Angular2TokenService } from './angular2-token.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class Angular2TokenInteceptor implements HttpInterceptor {
    constructor(
        private _tokenService: Angular2TokenService,
    ){

    }
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('In token interceptor, request : ', req,
            this._tokenService.currentAuthHeaders);
        let headersWithAuth = this._tokenService.currentAuthHeaders;
        req.headers.keys().forEach(key => {
            headersWithAuth = headersWithAuth.append(key, req.headers.get(key) )
        });
        console.log('In intercept request, new headers : ', headersWithAuth);
        if(req.url.match(this._tokenService.apiPath)){
            req = req.clone({headers: headersWithAuth});
            const authHeaders = this._tokenService.currentAuthHeaders;
            authHeaders.keys().forEach(key => {
                req.headers.append(key, authHeaders.get(key) )
            });
        }


        return next.handle(req)
            .pipe(
                tap((evt => {
                        console.log('In token interceptor, evt : ', evt);
                        if (evt instanceof HttpResponse) {
                            console.log('---> status:', evt.status);
                            console.log('---> filter:', req.params.get('filter'));
                        }
                    }),
                    (err => {
                        console.log('In token interceptor, err : ', err);

                    })
                )
            )

    }
}