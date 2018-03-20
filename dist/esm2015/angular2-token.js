import { Injectable, NgModule, Optional, EventEmitter, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import { tap } from 'rxjs/operators';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Function Data
/**
 * @record
 */

/**
 * @record
 */


/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const TOKEN_INTERCEPTOR_PROVIDER = {
    provide: HTTP_INTERCEPTORS,
    useClass: Angular2TokenInteceptor,
    multi: true
};
class Angular2TokenService {
    /**
     * @param {?} http
     * @param {?} activatedRoute
     * @param {?} router
     */
    constructor(http, activatedRoute, router) {
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: Angular2TokenService,
            providers: [Angular2TokenService,
                TOKEN_INTERCEPTOR_PROVIDER]
        };
    }
    /**
     * @return {?}
     */
    get currentUserType() {
        if (this.atCurrentUserType != null)
            return this.atCurrentUserType.name;
        else
            return null;
    }
    /**
     * @return {?}
     */
    get currentUserData() {
        return this.atCurrentUserData;
    }
    /**
     * @return {?}
     */
    get currentAuthData() {
        return this.atCurrentAuthData;
    }
    /**
     * @return {?}
     */
    get currentAuthHeaders() {
        if (this.atCurrentAuthData != null) {
            return new HttpHeaders({
                'access-token': this.atCurrentAuthData.accessToken,
                'client': this.atCurrentAuthData.client,
                'expiry': this.atCurrentAuthData.expiry,
                'token-type': this.atCurrentAuthData.tokenType,
                'uid': this.atCurrentAuthData.uid
            });
        }
        return new HttpHeaders;
    }
    /**
     * @return {?}
     */
    get apiPath() {
        return this.getApiPath();
    }
    /**
     * @param {?} authData
     * @return {?}
     */
    set currentAuthData(authData) {
        this.setAuthData(authData);
    }
    /**
     * @return {?}
     */
    userSignedIn() {
        return !!this.atCurrentAuthData;
    }
    /**
     * @return {?}
     */
    canActivate() {
        if (this.userSignedIn())
            return true;
        else {
            // Store current location in storage (usefull for redirection after signing in)
            if (this.atOptions.signInStoredUrlStorageKey) {
                localStorage.setItem(this.atOptions.signInStoredUrlStorageKey, window.location.pathname + window.location.search);
            }
            // Redirect user to sign in if signInRedirect is set
            if (this.router && this.atOptions.signInRedirect)
                this.router.navigate([this.atOptions.signInRedirect]);
            return false;
        }
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    init(options) {
        let /** @type {?} */ defaultOptions = {
            apiPath: null,
            apiBase: null,
            signInPath: 'auth/sign_in',
            signInRedirect: null,
            signInStoredUrlStorageKey: null,
            signOutPath: 'auth/sign_out',
            validateTokenPath: 'auth/validate_token',
            signOutFailedValidate: false,
            registerAccountPath: 'auth',
            deleteAccountPath: 'auth',
            registerAccountCallback: window.location.href,
            updatePasswordPath: 'auth',
            resetPasswordPath: 'auth/password',
            resetPasswordCallback: window.location.href,
            userTypes: null,
            oAuthBase: window.location.origin,
            oAuthPaths: {
                github: 'auth/github'
            },
            oAuthCallbackPath: 'oauth_callback',
            oAuthWindowType: 'newWindow',
            oAuthWindowOptions: null,
            globalOptions: {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        };
        this.atOptions = (/** @type {?} */ (Object)).assign(defaultOptions, options);
        this.tryLoadAuthData();
    }
    /**
     *
     * Actions
     *
     * @param {?} registerData
     * @return {?}
     */
    registerAccount(registerData) {
        if (registerData["userType"] == null)
            this.atCurrentUserType = null;
        else {
            this.atCurrentUserType = this.getUserTypeByName(registerData["userType"]);
            delete registerData["userType"];
        }
        registerData["password_confirmation"] = registerData["passwordConfirmation"];
        delete registerData["passwordConfirmation"];
        registerData["confirm_success_url"] = this.atOptions.registerAccountCallback;
        return this.request('POST', this.getUserPath() + this.atOptions.registerAccountPath, JSON.stringify(registerData));
    }
    /**
     * @return {?}
     */
    deleteAccount() {
        return this.request('DELETE', this.getUserPath() + this.atOptions.deleteAccountPath);
    }
    /**
     * @param {?} signInData
     * @return {?}
     */
    signIn(signInData) {
        console.log('In singIn tap!');
        if (signInData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(signInData.userType);
        let /** @type {?} */ body = JSON.stringify({
            email: signInData.email,
            password: signInData.password
        });
        let /** @type {?} */ observ = this.request('POST', this.getUserPath() + this.atOptions.signInPath, body);
        console.log('In singIn tap, returned observ : ', observ);
        return observ.pipe(tap(res => {
            console.log('In singIn tap, res  : ', res);
            this.atCurrentUserData = res.data;
            console.log('In singIn tap, this.atCurrentUserData  : ', this.atCurrentUserData);
        }, err => {
            console.log('In singIn tap, error : ', err);
        }));
    }
    /**
     * @param {?} oAuthType
     * @return {?}
     */
    signInOAuth(oAuthType) {
        let /** @type {?} */ oAuthPath = this.getOAuthPath(oAuthType);
        let /** @type {?} */ callbackUrl = `${window.location.origin}/${this.atOptions.oAuthCallbackPath}`;
        let /** @type {?} */ oAuthWindowType = this.atOptions.oAuthWindowType;
        let /** @type {?} */ authUrl = this.getOAuthUrl(oAuthPath, callbackUrl, oAuthWindowType);
        if (oAuthWindowType == 'newWindow') {
            let /** @type {?} */ oAuthWindowOptions = this.atOptions.oAuthWindowOptions;
            let /** @type {?} */ windowOptions = '';
            if (oAuthWindowOptions) {
                for (let /** @type {?} */ key in oAuthWindowOptions) {
                    windowOptions += `,${key}=${oAuthWindowOptions[key]}`;
                }
            }
            let /** @type {?} */ popup = window.open(authUrl, '_blank', `closebuttoncaption=Cancel${windowOptions}`);
            return this.requestCredentialsViaPostMessage(popup);
        }
        else if (oAuthWindowType == 'sameWindow') {
            window.location.href = authUrl;
        }
        else {
            throw `Unsupported oAuthWindowType "${oAuthWindowType}"`;
        }
    }
    /**
     * @return {?}
     */
    processOAuthCallback() {
        this.getAuthDataFromParams();
    }
    /**
     * @return {?}
     */
    signOut() {
        let /** @type {?} */ observ = this.request('DELETE', this.getUserPath() + this.atOptions.signOutPath);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('client');
        localStorage.removeItem('expiry');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('uid');
        this.atCurrentAuthData = null;
        this.atCurrentUserType = null;
        this.atCurrentUserData = null;
        return observ;
    }
    /**
     * @return {?}
     */
    validateToken() {
        let /** @type {?} */ observ = this.request('GET', this.getUserPath() + this.atOptions.validateTokenPath);
        observ.pipe(tap(res => {
            if (res instanceof HttpResponse) {
                this.atCurrentUserData = res.data;
            }
        }, error => {
            if (error.status === 401 && this.atOptions.signOutFailedValidate) {
                this.signOut();
            }
        }));
        return observ;
    }
    /**
     * @param {?} updatePasswordData
     * @return {?}
     */
    updatePassword(updatePasswordData) {
        if (updatePasswordData.userType != null)
            this.atCurrentUserType = this.getUserTypeByName(updatePasswordData.userType);
        let /** @type {?} */ args;
        if (updatePasswordData.passwordCurrent == null) {
            args = {
                password: updatePasswordData.password,
                password_confirmation: updatePasswordData.passwordConfirmation
            };
        }
        else {
            args = {
                current_password: updatePasswordData.passwordCurrent,
                password: updatePasswordData.password,
                password_confirmation: updatePasswordData.passwordConfirmation
            };
        }
        if (updatePasswordData.resetPasswordToken) {
            args.reset_password_token = updatePasswordData.resetPasswordToken;
        }
        let /** @type {?} */ body = JSON.stringify(args);
        return this.request('PUT', this.getUserPath() + this.atOptions.updatePasswordPath, body);
    }
    /**
     * @param {?} resetPasswordData
     * @return {?}
     */
    resetPassword(resetPasswordData) {
        if (resetPasswordData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(resetPasswordData.userType);
        let /** @type {?} */ body = JSON.stringify({
            email: resetPasswordData.email,
            redirect_url: this.atOptions.resetPasswordCallback
        });
        return this.request('POST', this.getUserPath() + this.atOptions.resetPasswordPath, body);
    }
    /**
     * @template T
     * @param {?} method
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    request(method, url, body) {
        const /** @type {?} */ options = {};
        let /** @type {?} */ baseHeaders = this.atOptions.globalOptions.headers;
        options["headers"] = new HttpHeaders(baseHeaders);
        options["body"] = body;
        const /** @type {?} */ response = this.http.request(method, this.getApiPath() + url, options);
        return response;
    }
    /**
     *
     * Get Auth Data
     *
     * @return {?}
     */
    tryLoadAuthData() {
        let /** @type {?} */ userType = this.getUserTypeByName(localStorage.getItem('userType'));
        if (userType)
            this.atCurrentUserType = userType;
        this.getAuthDataFromStorage();
        if (this.activatedRoute)
            this.getAuthDataFromParams();
        if (this.atCurrentAuthData)
            this.validateToken();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getAuthDataFromPostMessage(data) {
        let /** @type {?} */ authData = {
            accessToken: data['auth_token'],
            client: data['client_id'],
            expiry: data['expiry'],
            tokenType: 'Bearer',
            uid: data['uid']
        };
        this.setAuthData(authData);
    }
    /**
     * @return {?}
     */
    getAuthDataFromStorage() {
        let /** @type {?} */ authData = {
            accessToken: localStorage.getItem('accessToken'),
            client: localStorage.getItem('client'),
            expiry: localStorage.getItem('expiry'),
            tokenType: localStorage.getItem('tokenType'),
            uid: localStorage.getItem('uid')
        };
        if (this.checkAuthData(authData))
            this.atCurrentAuthData = authData;
    }
    /**
     * @return {?}
     */
    getAuthDataFromParams() {
        if (this.activatedRoute.queryParams)
            // Fix for Testing, needs to be removed later
            this.activatedRoute.queryParams.subscribe(queryParams => {
                let /** @type {?} */ authData = {
                    accessToken: queryParams['token'] || queryParams['auth_token'],
                    client: queryParams['client_id'],
                    expiry: queryParams['expiry'],
                    tokenType: 'Bearer',
                    uid: queryParams['uid']
                };
                if (this.checkAuthData(authData))
                    this.atCurrentAuthData = authData;
            });
    }
    /**
     *
     * Set Auth Data
     *
     * @param {?} authData
     * @return {?}
     */
    setAuthData(authData) {
        if (this.checkAuthData(authData)) {
            this.atCurrentAuthData = authData;
            localStorage.setItem('accessToken', authData.accessToken);
            localStorage.setItem('client', authData.client);
            localStorage.setItem('expiry', authData.expiry);
            localStorage.setItem('tokenType', authData.tokenType);
            localStorage.setItem('uid', authData.uid);
            if (this.atCurrentUserType != null)
                localStorage.setItem('userType', this.atCurrentUserType.name);
        }
    }
    /**
     *
     * Validate Auth Data
     *
     * @param {?} authData
     * @return {?}
     */
    checkAuthData(authData) {
        if (authData.accessToken != null &&
            authData.client != null &&
            authData.expiry != null &&
            authData.tokenType != null &&
            authData.uid != null) {
            if (this.atCurrentAuthData != null)
                return authData.expiry >= this.atCurrentAuthData.expiry;
            else
                return true;
        }
        else {
            return false;
        }
    }
    /**
     *
     * Construct Paths / Urls
     *
     * @return {?}
     */
    getUserPath() {
        if (this.atCurrentUserType == null)
            return '';
        else
            return this.atCurrentUserType.path + '/';
    }
    /**
     * @return {?}
     */
    getApiPath() {
        let /** @type {?} */ constructedPath = '';
        if (this.atOptions.apiBase != null)
            constructedPath += this.atOptions.apiBase + '/';
        if (this.atOptions.apiPath != null)
            constructedPath += this.atOptions.apiPath + '/';
        return constructedPath;
    }
    /**
     * @param {?} oAuthType
     * @return {?}
     */
    getOAuthPath(oAuthType) {
        let /** @type {?} */ oAuthPath;
        oAuthPath = this.atOptions.oAuthPaths[oAuthType];
        if (oAuthPath == null)
            oAuthPath = `/auth/${oAuthType}`;
        return oAuthPath;
    }
    /**
     * @param {?} oAuthPath
     * @param {?} callbackUrl
     * @param {?} windowType
     * @return {?}
     */
    getOAuthUrl(oAuthPath, callbackUrl, windowType) {
        let /** @type {?} */ url;
        url = `${this.atOptions.oAuthBase}/${oAuthPath}`;
        url += `?omniauth_window_type=${windowType}`;
        url += `&auth_origin_url=${encodeURIComponent(callbackUrl)}`;
        if (this.atCurrentUserType != null)
            url += `&resource_class=${this.atCurrentUserType.name}`;
        return url;
    }
    /**
     *
     * OAuth
     *
     * @param {?} authWindow
     * @return {?}
     */
    requestCredentialsViaPostMessage(authWindow) {
        let /** @type {?} */ pollerObserv = Observable.interval(500);
        let /** @type {?} */ responseObserv = Observable.fromEvent(window, 'message').pluck('data')
            .filter(this.oAuthWindowResponseFilter);
        let /** @type {?} */ responseSubscription = responseObserv.subscribe(this.getAuthDataFromPostMessage.bind(this));
        let /** @type {?} */ pollerSubscription = pollerObserv.subscribe(() => {
            if (authWindow.closed)
                pollerSubscription.unsubscribe();
            else
                authWindow.postMessage('requestCredentials', '*');
        });
        return responseObserv;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    oAuthWindowResponseFilter(data) {
        if (data.message == 'deliverCredentials' || data.message == 'authFailure')
            return data;
    }
    /**
     *
     * Utilities
     *
     * @param {?} name
     * @return {?}
     */
    getUserTypeByName(name) {
        if (name == null || this.atOptions.userTypes == null)
            return null;
        return this.atOptions.userTypes.find(userType => userType.name === name);
    }
}
Angular2TokenService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angular2TokenService.ctorParameters = () => [
    { type: HttpClient, },
    { type: ActivatedRoute, decorators: [{ type: Optional },] },
    { type: Router, decorators: [{ type: Optional },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Angular2TokenInteceptor {
    /**
     * @param {?} _tokenService
     */
    constructor(_tokenService) {
        this._tokenService = _tokenService;
        this.apiPath = this._tokenService.apiPath;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        console.log('In token interceptor, request : ', req, this._tokenService.currentAuthHeaders);
        let /** @type {?} */ headersWithAuth = this._tokenService.currentAuthHeaders;
        const /** @type {?} */ apiPath = req.headers.keys().forEach(key => {
            headersWithAuth = headersWithAuth.append(key, req.headers.get(key));
        });
        console.log('In intercept request, new headers : ', headersWithAuth);
        if (req.url.match(this.apiPath)) {
            req = req.clone({ headers: headersWithAuth });
            const /** @type {?} */ authHeaders = this._tokenService.currentAuthHeaders;
            authHeaders.keys().forEach(key => {
                req.headers.append(key, authHeaders.get(key));
            });
        }
        return next.handle(req)
            .pipe(tap(res => {
            console.log('In token interceptor, evt : ', res);
            if (res instanceof HttpResponse && res.url.match(this.apiPath)) {
                console.log('---> status:', res.status);
                console.log('---> filter:', req.params.get('filter'));
                this.getAuthHeadersFromResponse(/** @type {?} */ (res));
            }
        }, err => {
            if (err instanceof HttpErrorResponse && err.url.match(this.apiPath)) {
                console.log('In token interceptor, err : ', err);
                this.getAuthHeadersFromResponse(/** @type {?} */ (err));
            }
            else {
                console.log("Auth Interceptor, non HTTP error - ", err);
            }
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getAuthHeadersFromResponse(data) {
        let /** @type {?} */ headers = data.headers;
        let /** @type {?} */ authData = {
            accessToken: headers.get('access-token'),
            client: headers.get('client'),
            expiry: headers.get('expiry'),
            tokenType: headers.get('token-type'),
            uid: headers.get('uid')
        };
        this._tokenService.currentAuthData = authData;
    }
}
Angular2TokenInteceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angular2TokenInteceptor.ctorParameters = () => [
    { type: Angular2TokenService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BaseField {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators === undefined ? [] : options.validators;
        this.type = options.type || '';
    }
}
const SIGN_IN_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    })
];
const SIGN_UP_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordConfirmation',
        label: 'Password Confirmation',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    })
];
const RESET_PASSWORD_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    })
];
const UPDATE_PASSWORD_FORM = [
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordConfirmation',
        label: 'Password Confirmation',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordCurrent',
        label: 'Old Password',
        type: 'password',
        validators: [
            Validators.required,
            Validators.minLength(8)
        ]
    })
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tFormService {
    constructor() {
        this.submit$ = new EventEmitter();
        this.submitLock = false;
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    initForm(fields) {
        this.fields = fields;
        this._createFormGroup();
    }
    /**
     * @return {?}
     */
    submit() {
        this.submitLock = true;
        this.submit$.emit(this.formGroup.value);
    }
    /**
     * @return {?}
     */
    unlockSubmit() {
        this.formGroup.reset();
        this.submitLock = false;
    }
    ;
    /**
     * @return {?}
     */
    _createFormGroup() {
        let /** @type {?} */ group = {};
        this.fields.forEach(question => {
            group[question.key] = new FormControl(null, question.validators);
        });
        this.formGroup = new FormGroup(group);
    }
}
A2tFormService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
A2tFormService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tFormFieldComponent {
    /**
     * @return {?}
     */
    ngOnInit() {
        this._control = this.form.controls[this.question.key];
    }
    /**
     * @return {?}
     */
    get isValid() {
        return this._control.valid;
    }
}
A2tFormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-form-field',
                template: `
        <div class="a2t-input-group"
            [formGroup]="form">
            <label
                [attr.for]="question.key"
                [style.color]="labelColor"
                *ngIf="_control.pristine">
                {{question.label}}
            </label>
            <label class="a2t-error"
                [attr.for]="question.key"
                *ngIf="_control.hasError('required') && !_control.pristine">
                {{question.label}} is required
            </label>
            <label class="a2t-error"
                [attr.for]="question.key"
                *ngIf="_control.hasError('minlength')">
                {{question.label}} is too short
            </label>
            <label class="a2t-error"
                [attr.for]="question.key"
                *ngIf="_control.hasError('maxlength')">
                {{question.label}} is too long
            </label>
            <label class="a2t-valid"
                [attr.for]="question.key"
                *ngIf="_control.valid && !_control.pristine">
                {{question.label}}
            </label>
            <input
                [formControlName]="question.key"
                [id]="question.key"
                [type]="question.type">
        </div>
    `,
                styles: [`
        .a2t-input-group {
            padding-bottom: 40px;
            padding-right: 20px;
            padding-left: 20px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }
        .a2t-input-group input {
            width: 100%;
            outline: none;
            border: none;
            background-color: #eee;
            line-height: 40px;
            padding-left: 10px;
            padding-right: 10px;
        }
        .a2t-input-group label {
            color: #666;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 0;
        }
        .a2t-error {
            color: #df6564 !important;
        }
        .a2t-valid {
            color: #72c380 !important;
        }
    `]
            },] },
];
/** @nocollapse */
A2tFormFieldComponent.ctorParameters = () => [];
A2tFormFieldComponent.propDecorators = {
    "question": [{ type: Input },],
    "form": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tFormComponent {
    /**
     * @param {?} _formService
     */
    constructor(_formService) {
        this._formService = _formService;
    }
}
A2tFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-form',
                template: `
        <form class="a2t-form"
            (ngSubmit)="_formService.submit()"
            [formGroup]="_formService.formGroup">
            <a2t-form-field
                *ngFor="let field of this._formService.fields"
                [question]="field"
                [form]="_formService.formGroup">
            </a2t-form-field>
            <button type="submit" [disabled]="!_formService.formGroup.valid || _formService.formGroup.pristine || _formService.submitLock">
                <ng-content *ngIf="!_formService.submitLock"></ng-content>
                <span *ngIf="_formService.submitLock">Submitting ...</span>
            </button>
        </form>
    `,
                styles: [`
        .a2t-form {
            background-color: white;
            border-radius: 3px;
            box-shadow: 0px 1px 5px 0 rgba(0,0,0,0.3);
            padding-top: 20px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }
        .a2t-form button {
            width: 100%;
            transition: .3s;
            background-color: #72c380;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            outline: none;
            text-align: center;
            font-weight: 400;
            border: none;
            font-size: 16px;
            line-height: 30px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
            color: white;
            border-bottom: 3px solid transparent;
        }
        .a2t-form button:disabled {
            background-color: #eee !important;
            cursor: not-allowed;
            color: #999;
            text-shadow: none;
        }
        .a2t-form button:hover {
            background-color: #a6d9ae;
        }
    `]
            },] },
];
/** @nocollapse */
A2tFormComponent.ctorParameters = () => [
    { type: A2tFormService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tLinksComponent {
    constructor() { }
}
A2tLinksComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-links',
                template: `
        <div class="a2t-wrapper">
            <p><a routerLink="/session/reset-password" *ngIf="case != 'reset-password'">Forgot Password?</a></p>
            <p><a routerLink="/session/sign-up" *ngIf="case != 'sign-up'">Sign Up</a></p>
            <p><a routerLink="/session/sign-in" *ngIf="case != 'sign-in'">Sign In</a></p>
        </div>
    `,
                styles: [`
        .a2t-wrapper {
            margin-top: 20px;
        }
        p {
            margin-bottom: 0;
        }
        a {
            color: #eee !important;
            transition: .3s;
            text-decoration: none;
            font-size: 15px;
            font-weight: 300;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }
        a:hover {
            color: white;
        }
    `]
            },] },
];
/** @nocollapse */
A2tLinksComponent.ctorParameters = () => [];
A2tLinksComponent.propDecorators = {
    "case": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tErrorComponent {
    constructor() { }
}
A2tErrorComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-error',
                template: '<div *ngFor="let error of errors"><p>{{error}}</p></div>',
                styles: [`
        div {
            width: 100%;
            background-color: #df6564;
            color: white;
            font-weight: 300;
            font-size: 15px;
            padding: 10px 20px;
            border-radius: 3px;
            margin-bottom: 15px;
        }
        div > p {
            margin-bottom: 0;
        }
    `]
            },] },
];
/** @nocollapse */
A2tErrorComponent.ctorParameters = () => [];
A2tErrorComponent.propDecorators = {
    "errors": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tHeadlineComponent {
    constructor() { }
}
A2tHeadlineComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-headline',
                template: '<p><ng-content></ng-content></p>',
                styles: [`
        p {
            text-align: center;
            color: white;
            font-size: 30px;
        }
    `]
            },] },
];
/** @nocollapse */
A2tHeadlineComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tSharedModule {
}
A2tSharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterModule
                ],
                declarations: [
                    A2tFormFieldComponent,
                    A2tFormComponent,
                    A2tLinksComponent,
                    A2tErrorComponent,
                    A2tHeadlineComponent
                ],
                exports: [
                    A2tFormComponent,
                    A2tLinksComponent,
                    A2tErrorComponent,
                    A2tHeadlineComponent
                ]
            },] },
];
/** @nocollapse */
A2tSharedModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tUiComponent {
    constructor() { }
}
A2tUiComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-ui',
                template: `
        <div class="a2t-wrapper">
            <div class="a2t-container">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
                styles: [`
        .a2t-wrapper {
            width: 100%;
            height: 100vh;
            min-height: 500px;
            padding-top: 100px;
            display: flex;
            justify-content: center;
            background-color: #3270a0;
        }
        .a2t-logo {
            text-align: center;
            color: white;
            font-size: 30px;
        }
        .a2t-container {
            width: 400px;
        }
    `]
            },] },
];
/** @nocollapse */
A2tUiComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tSignInComponent {
    /**
     * @param {?} _formService
     * @param {?} _sessionService
     * @param {?} _router
     */
    constructor(_formService, _sessionService, _router) {
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(SIGN_IN_FORM);
        this._formService.submit$.subscribe((data) => this._sessionService.signIn(data).subscribe((res) => this._handleSuccess(res), (error) => this._handleError(error)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _handleSuccess(data) {
        this._errors = null;
        this._formService.unlockSubmit();
        this._router.navigate(['restricted']);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _handleError(error) {
        this._errors = error.json().errors;
        this._formService.unlockSubmit();
    }
}
A2tSignInComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-sign-in',
                providers: [A2tFormService],
                template: `
        <a2t-headline>Sign In</a2t-headline>
        <a2t-error [errors]="_errors"></a2t-error>
        <a2t-form>Sign In</a2t-form>
        <a2t-links case="sign-in"></a2t-links>
    `
            },] },
];
/** @nocollapse */
A2tSignInComponent.ctorParameters = () => [
    { type: A2tFormService, },
    { type: Angular2TokenService, },
    { type: Router, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tSignUpComponent {
    /**
     * @param {?} _formService
     * @param {?} _sessionService
     * @param {?} _router
     */
    constructor(_formService, _sessionService, _router) {
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(SIGN_UP_FORM);
        this._formService.submit$.subscribe((data) => this._sessionService.registerAccount(data).subscribe(res => this._handleSuccess(res), error => this._handleError(error)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _handleSuccess(data) {
        this._errors = null;
        this._formService.unlockSubmit();
        this._router.navigate(['restricted']);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _handleError(error) {
        this._errors = error.json().errors.full_messages;
        this._formService.unlockSubmit();
    }
}
A2tSignUpComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-sign-up',
                providers: [A2tFormService],
                template: `
        <a2t-headline>Sign Up</a2t-headline>
        <a2t-error [errors]="_errors"></a2t-error>
        <a2t-form>Sign Up</a2t-form>
        <a2t-links case="sign-up"></a2t-links>
    `
            },] },
];
/** @nocollapse */
A2tSignUpComponent.ctorParameters = () => [
    { type: A2tFormService, },
    { type: Angular2TokenService, },
    { type: Router, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tResetPasswordComponent {
    /**
     * @param {?} _formService
     * @param {?} _sessionService
     */
    constructor(_formService, _sessionService) {
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._emailSend = false;
        this._formService.initForm(RESET_PASSWORD_FORM);
        this._formService.submit$.subscribe((data) => this._sessionService.resetPassword(data).subscribe(res => this._handleSuccess(), error => this._handleError()));
    }
    /**
     * @return {?}
     */
    _handleSuccess() {
        this._emailSend = true;
    }
    /**
     * @return {?}
     */
    _handleError() {
        this._emailSend = true;
    }
}
A2tResetPasswordComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-reset-password',
                providers: [A2tFormService],
                template: `
        <a2t-headline *ngIf="!_emailSend">Reset your Password</a2t-headline>
        <a2t-form *ngIf="!_emailSend">Reset Password</a2t-form>
        <p class="email-send-text" *ngIf="_emailSend">
            If the entered email is registered we will send instruction on how to reset your password.
        </p>
        <a2t-links *ngIf="!_emailSend" case="reset-password"></a2t-links>
    `,
                styles: [`
        .email-send-text {
            background-color: #72c380;
            color: white;
            font-size: 16pt;
            text-align: center;
            padding: 20px;
            border-radius: 3px;
        }
    `]
            },] },
];
/** @nocollapse */
A2tResetPasswordComponent.ctorParameters = () => [
    { type: A2tFormService, },
    { type: Angular2TokenService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tUpdatePasswordComponent {
    /**
     * @param {?} _formService
     * @param {?} _sessionService
     * @param {?} _router
     */
    constructor(_formService, _sessionService, _router) {
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(UPDATE_PASSWORD_FORM);
        this._formService.submit$.subscribe((data) => this._sessionService.updatePassword(data).subscribe(res => this._handleSuccess(res), error => this._handleError(error)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _handleSuccess(data) {
        this._router.navigate(['session/sign-in']);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _handleError(error) {
        this._errors = error.json().errors;
        this._formService.unlockSubmit();
    }
}
A2tUpdatePasswordComponent.decorators = [
    { type: Component, args: [{
                selector: 'a2t-update-password',
                providers: [A2tFormService],
                template: `
        <a2t-headline>Update your Password</a2t-headline>
        <a2t-error [errors]="_errors"></a2t-error>
        <a2t-form>Update Password</a2t-form>
    `
            },] },
];
/** @nocollapse */
A2tUpdatePasswordComponent.ctorParameters = () => [
    { type: A2tFormService, },
    { type: Angular2TokenService, },
    { type: Router, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const routes = [{
        path: 'session',
        component: A2tUiComponent,
        children: [
            { path: 'sign-in', component: A2tSignInComponent },
            { path: 'sign-up', component: A2tSignUpComponent },
            { path: 'reset-password', component: A2tResetPasswordComponent },
            {
                path: 'update-password',
                component: A2tUpdatePasswordComponent,
                canActivate: [Angular2TokenService]
            }
        ]
    }];
const a2tRoutes = RouterModule.forChild(routes);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class A2tUiModule {
}
A2tUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    A2tSharedModule,
                    a2tRoutes
                ],
                declarations: [
                    A2tUiComponent,
                    A2tSignInComponent,
                    A2tSignUpComponent,
                    A2tResetPasswordComponent,
                    A2tUpdatePasswordComponent
                ]
            },] },
];
/** @nocollapse */
A2tUiModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { A2tUiModule, Angular2TokenService, Angular2TokenInteceptor };
//# sourceMappingURL=angular2-token.js.map
