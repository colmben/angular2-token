import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse
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