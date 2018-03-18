import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse
}
    from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class Angular2TokenInteceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                tap((evt => {
                        console.log('In token interceptor, evt : ', evt);
                        if (evt instanceof HttpResponse) {
                            console.log('---> status:', evt.status);
                            console.log('---> filter:', req.params.get('filter'));
                        }
                    })
                )
            )

    }
}