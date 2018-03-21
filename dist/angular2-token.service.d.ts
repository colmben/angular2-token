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
    registerAccount(registerData: RegisterData): Observable<any>;
    deleteAccount(): Observable<any>;
    signIn(signInData: SignInData): Observable<any>;
    signInOAuth(oAuthType: string): Observable<any>;
    processOAuthCallback(): void;
    signOut(): Observable<any>;
    validateToken(): Observable<any>;
    updatePassword(updatePasswordData: UpdatePasswordData): Observable<any>;
    resetPassword(resetPasswordData: ResetPasswordData): Observable<any>;
    request<T>(method: string, url: string, body?: any): Observable<T>;
    /**
     *
     * Get Auth Data
     *
     */
    private tryLoadAuthData();
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
