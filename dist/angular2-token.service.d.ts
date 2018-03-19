import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import { SignInData, RegisterData, UpdatePasswordData, ResetPasswordData, UserData, AuthData, Angular2TokenOptions } from './angular2-token.model';
export declare class Angular2TokenService implements CanActivate {
    private http;
    private activatedRoute;
    private router;
    readonly currentUserType: string;
    readonly currentUserData: UserData;
    currentAuthData: AuthData;
    readonly currentAuthHeaders: HttpHeaders;
    readonly apiPath: string;
    private atOptions;
    private atCurrentUserType;
    private atCurrentAuthData;
    private atCurrentUserData;
    constructor(http: HttpClient, activatedRoute: ActivatedRoute, router: Router);
    userSignedIn(): boolean;
    canActivate(): boolean;
    init(options?: Angular2TokenOptions): void;
    /**
     *
     * Actions
     *
     */
    registerAccount(registerData: RegisterData): Observable<Object>;
    deleteAccount(): Observable<Object>;
    signIn(signInData: SignInData): Observable<Object>;
    signInOAuth(oAuthType: string): Observable<any>;
    processOAuthCallback(): void;
    signOut(): Observable<Object>;
    validateToken(): Observable<Object>;
    updatePassword(updatePasswordData: UpdatePasswordData): Observable<Object>;
    resetPassword(resetPasswordData: ResetPasswordData): Observable<Object>;
    /**
     *
     * HTTP Wrappers
     *
     */
    request(method: string, url: string, body?: any): Observable<Object>;
    private handleResponse(response);
    /**
     *
     * Get Auth Data
     *
     */
    private tryLoadAuthData();
    private getAuthHeadersFromResponse(data);
    private getAuthDataFromPostMessage(data);
    private getAuthDataFromStorage();
    private getAuthDataFromParams();
    /**
     *
     * Set Auth Data
     *
     */
    private setAuthData(authData);
    /**
     *
     * Validate Auth Data
     *
     */
    private checkAuthData(authData);
    /**
     *
     * Construct Paths / Urls
     *
     */
    private getUserPath();
    private getApiPath();
    private getOAuthPath(oAuthType);
    private getOAuthUrl(oAuthPath, callbackUrl, windowType);
    /**
     *
     * OAuth
     *
     */
    private requestCredentialsViaPostMessage(authWindow);
    private oAuthWindowResponseFilter(data);
    /**
     *
     * Utilities
     *
     */
    private getUserTypeByName(name);
}
