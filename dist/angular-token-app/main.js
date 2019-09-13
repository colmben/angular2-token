(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/angular-token/src/lib/angular-token.interceptor.ts":
/*!*********************************************************************!*\
  !*** ./projects/angular-token/src/lib/angular-token.interceptor.ts ***!
  \*********************************************************************/
/*! exports provided: AngularTokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularTokenInterceptor", function() { return AngularTokenInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_token_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./angular-token.service */ "./projects/angular-token/src/lib/angular-token.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var AngularTokenInterceptor = /** @class */ (function () {
    function AngularTokenInterceptor(tokenService) {
        this.tokenService = tokenService;
    }
    AngularTokenInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // Get auth data from local storage
        this.tokenService.getAuthDataFromStorage();
        // Add the headers if the request is going to the configured server
        var authData = this.tokenService.authData.value;
        if (authData &&
            (this.tokenService.tokenOptions.apiBase === null || req.url.match(this.tokenService.tokenOptions.apiBase))) {
            var headers = {
                'access-token': authData.accessToken,
                'client': authData.client,
                'expiry': authData.expiry,
                'token-type': authData.tokenType,
                'uid': authData.uid
            };
            req = req.clone({
                setHeaders: headers
            });
        }
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) { return _this.handleResponse(res); }, function (err) { return _this.handleResponse(err); }));
    };
    // Parse Auth data from response
    AngularTokenInterceptor.prototype.handleResponse = function (res) {
        if (res instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"] || res instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
            if (this.tokenService.tokenOptions.apiBase === null || (res.url && res.url.match(this.tokenService.tokenOptions.apiBase))) {
                this.tokenService.getAuthHeadersFromResponse(res);
            }
        }
    };
    AngularTokenInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_token_service__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]])
    ], AngularTokenInterceptor);
    return AngularTokenInterceptor;
}());



/***/ }),

/***/ "./projects/angular-token/src/lib/angular-token.module.ts":
/*!****************************************************************!*\
  !*** ./projects/angular-token/src/lib/angular-token.module.ts ***!
  \****************************************************************/
/*! exports provided: AngularTokenService, AngularTokenModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularTokenModule", function() { return AngularTokenModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_token_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./angular-token.service */ "./projects/angular-token/src/lib/angular-token.service.ts");
/* harmony import */ var _angular_token_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./angular-token.interceptor */ "./projects/angular-token/src/lib/angular-token.interceptor.ts");
/* harmony import */ var _angular_token_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./angular-token.token */ "./projects/angular-token/src/lib/angular-token.token.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AngularTokenService", function() { return _angular_token_service__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]; });








var AngularTokenModule = /** @class */ (function () {
    function AngularTokenModule(parentModule) {
        if (parentModule) {
            throw new Error('AngularToken is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    AngularTokenModule_1 = AngularTokenModule;
    AngularTokenModule.forRoot = function (options) {
        return {
            ngModule: AngularTokenModule_1,
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
                    useClass: _angular_token_interceptor__WEBPACK_IMPORTED_MODULE_4__["AngularTokenInterceptor"],
                    multi: true
                },
                options.angularTokenOptionsProvider ||
                    {
                        provide: _angular_token_token__WEBPACK_IMPORTED_MODULE_5__["ANGULAR_TOKEN_OPTIONS"],
                        useValue: options
                    },
                _angular_token_service__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]
            ]
        };
    };
    var AngularTokenModule_1;
    AngularTokenModule = AngularTokenModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [AngularTokenModule])
    ], AngularTokenModule);
    return AngularTokenModule;
}());



/***/ }),

/***/ "./projects/angular-token/src/lib/angular-token.service.ts":
/*!*****************************************************************!*\
  !*** ./projects/angular-token/src/lib/angular-token.service.ts ***!
  \*****************************************************************/
/*! exports provided: AngularTokenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularTokenService", function() { return AngularTokenService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_token_token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./angular-token.token */ "./projects/angular-token/src/lib/angular-token.token.ts");








var AngularTokenService = /** @class */ (function () {
    function AngularTokenService(http, config, platformId, activatedRoute, router) {
        this.http = http;
        this.platformId = platformId;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.userType = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](null);
        this.authData = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](null);
        this.userData = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](null);
        this.localStorage = {};
        this.global = (typeof window !== 'undefined') ? window : {};
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["isPlatformServer"])(this.platformId)) {
            // Bad pratice, needs fixing
            this.global = {
                open: function () { return null; },
                location: {
                    href: '/',
                    origin: '/'
                }
            };
            // Bad pratice, needs fixing
            this.localStorage.setItem = function () { return null; };
            this.localStorage.getItem = function () { return null; };
            this.localStorage.removeItem = function () { return null; };
        }
        else {
            this.localStorage = localStorage;
        }
        var defaultOptions = {
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
            registerAccountCallback: this.global.location.href,
            updatePasswordPath: 'auth',
            resetPasswordPath: 'auth/password',
            resetPasswordCallback: this.global.location.href,
            userTypes: null,
            loginField: 'email',
            oAuthBase: this.global.location.origin,
            oAuthPaths: {
                github: 'auth/github'
            },
            oAuthCallbackPath: 'oauth_callback',
            oAuthWindowType: 'newWindow',
            oAuthWindowOptions: null,
            oAuthBrowserCallbacks: {
                github: 'auth/github/callback',
            },
        };
        var mergedOptions = Object.assign(defaultOptions, config);
        this.options = mergedOptions;
        if (this.options.apiBase === null) {
            console.warn("[angular-token] You have not configured 'apiBase', which may result in security issues. " +
                "Please refer to the documentation at https://github.com/neroniaky/angular-token/wiki");
        }
        this.tryLoadAuthData();
    }
    Object.defineProperty(AngularTokenService.prototype, "currentUserType", {
        get: function () {
            if (this.userType.value != null) {
                return this.userType.value.name;
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularTokenService.prototype, "currentUserData", {
        get: function () {
            return this.userData.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularTokenService.prototype, "currentAuthData", {
        get: function () {
            return this.authData.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularTokenService.prototype, "apiBase", {
        get: function () {
            console.warn('[angular-token] The attribute .apiBase will be removed in the next major release, please use' +
                '.tokenOptions.apiBase instead');
            return this.options.apiBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularTokenService.prototype, "tokenOptions", {
        get: function () {
            return this.options;
        },
        set: function (options) {
            this.options = Object.assign(this.options, options);
        },
        enumerable: true,
        configurable: true
    });
    AngularTokenService.prototype.userSignedIn = function () {
        if (this.authData.value == null) {
            return false;
        }
        else {
            return true;
        }
    };
    AngularTokenService.prototype.canActivate = function (route, state) {
        if (this.userSignedIn()) {
            return true;
        }
        else {
            // Store current location in storage (usefull for redirection after signing in)
            if (this.options.signInStoredUrlStorageKey) {
                this.localStorage.setItem(this.options.signInStoredUrlStorageKey, state.url);
            }
            // Redirect user to sign in if signInRedirect is set
            if (this.router && this.options.signInRedirect) {
                this.router.navigate([this.options.signInRedirect]);
            }
            return false;
        }
    };
    /**
     *
     * Actions
     *
     */
    // Register request
    AngularTokenService.prototype.registerAccount = function (registerData, additionalData) {
        registerData = Object.assign({}, registerData);
        if (registerData.userType == null) {
            this.userType.next(null);
        }
        else {
            this.userType.next(this.getUserTypeByName(registerData.userType));
            delete registerData.userType;
        }
        if (registerData.password_confirmation == null &&
            registerData.passwordConfirmation != null) {
            registerData.password_confirmation = registerData.passwordConfirmation;
            delete registerData.passwordConfirmation;
        }
        if (additionalData !== undefined) {
            registerData.additionalData = additionalData;
        }
        var login = registerData.login;
        delete registerData.login;
        registerData[this.options.loginField] = login;
        registerData.confirm_success_url = this.options.registerAccountCallback;
        return this.http.post(this.getServerPath() + this.options.registerAccountPath, registerData);
    };
    // Delete Account
    AngularTokenService.prototype.deleteAccount = function () {
        return this.http.delete(this.getServerPath() + this.options.deleteAccountPath);
    };
    // Sign in request and set storage
    AngularTokenService.prototype.signIn = function (signInData, additionalData) {
        var _this = this;
        var _a;
        this.userType.next((signInData.userType == null) ? null : this.getUserTypeByName(signInData.userType));
        var body = (_a = {},
            _a[this.options.loginField] = signInData.login,
            _a.password = signInData.password,
            _a);
        if (additionalData !== undefined) {
            body.additionalData = additionalData;
        }
        var observ = this.http.post(this.getServerPath() + this.options.signInPath, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["share"])());
        observ.subscribe(function (res) { return _this.userData.next(res.data); });
        return observ;
    };
    AngularTokenService.prototype.signInOAuth = function (oAuthType, inAppBrowser, platform) {
        var _this = this;
        var oAuthPath = this.getOAuthPath(oAuthType);
        var callbackUrl = this.global.location.origin + "/" + this.options.oAuthCallbackPath;
        var oAuthWindowType = this.options.oAuthWindowType;
        var authUrl = this.getOAuthUrl(oAuthPath, callbackUrl, oAuthWindowType);
        if (oAuthWindowType === 'newWindow' ||
            (oAuthWindowType == 'inAppBrowser' && (!platform || !platform.is('cordova') || !(platform.is('ios') || platform.is('android'))))) {
            var oAuthWindowOptions = this.options.oAuthWindowOptions;
            var windowOptions = '';
            if (oAuthWindowOptions) {
                for (var key in oAuthWindowOptions) {
                    if (oAuthWindowOptions.hasOwnProperty(key)) {
                        windowOptions += "," + key + "=" + oAuthWindowOptions[key];
                    }
                }
            }
            var popup = window.open(authUrl, '_blank', "closebuttoncaption=Cancel" + windowOptions);
            return this.requestCredentialsViaPostMessage(popup);
        }
        else if (oAuthWindowType == 'inAppBrowser') {
            var oAuthBrowserCallback_1 = this.options.oAuthBrowserCallbacks[oAuthType];
            if (!oAuthBrowserCallback_1) {
                throw new Error("To login with oAuth provider " + oAuthType + " using inAppBrowser the callback (in oAuthBrowserCallbacks) is required.");
            }
            // let oAuthWindowOptions = this.options.oAuthWindowOptions;
            // let windowOptions = '';
            //  if (oAuthWindowOptions) {
            //     for (let key in oAuthWindowOptions) {
            //         windowOptions += `,${key}=${oAuthWindowOptions[key]}`;
            //     }
            // }
            var browser_1 = inAppBrowser.create(authUrl, '_blank', 'location=no');
            return new rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"](function (observer) {
                browser_1.on('loadstop').subscribe(function (ev) {
                    if (ev.url.indexOf(oAuthBrowserCallback_1) > -1) {
                        browser_1.executeScript({ code: "requestCredentials();" }).then(function (credentials) {
                            _this.getAuthDataFromPostMessage(credentials[0]);
                            var pollerObserv = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["interval"])(400);
                            var pollerSubscription = pollerObserv.subscribe(function () {
                                if (_this.userSignedIn()) {
                                    observer.next(_this.authData);
                                    observer.complete();
                                    pollerSubscription.unsubscribe();
                                    browser_1.close();
                                }
                            }, function (error) {
                                observer.error(error);
                                observer.complete();
                            });
                        }, function (error) {
                            observer.error(error);
                            observer.complete();
                        });
                    }
                }, function (error) {
                    observer.error(error);
                    observer.complete();
                });
            });
        }
        else if (oAuthWindowType === 'sameWindow') {
            this.global.location.href = authUrl;
            return undefined;
        }
        else {
            throw new Error("Unsupported oAuthWindowType \"" + oAuthWindowType + "\"");
        }
    };
    AngularTokenService.prototype.processOAuthCallback = function () {
        this.getAuthDataFromParams();
    };
    // Sign out request and delete storage
    AngularTokenService.prototype.signOut = function () {
        var _this = this;
        return this.http.delete(this.getServerPath() + this.options.signOutPath)
            // Only remove the localStorage and clear the data after the call
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["finalize"])(function () {
            _this.localStorage.removeItem('accessToken');
            _this.localStorage.removeItem('client');
            _this.localStorage.removeItem('expiry');
            _this.localStorage.removeItem('tokenType');
            _this.localStorage.removeItem('uid');
            _this.authData.next(null);
            _this.userType.next(null);
            _this.userData.next(null);
        }));
    };
    // Validate token request
    AngularTokenService.prototype.validateToken = function () {
        var _this = this;
        var observ = this.http.get(this.getServerPath() + this.options.validateTokenPath).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["share"])());
        observ.subscribe(function (res) { return _this.userData.next(res.data); }, function (error) {
            if (error.status === 401 && _this.options.signOutFailedValidate) {
                _this.signOut();
            }
        });
        return observ;
    };
    // Update password request
    AngularTokenService.prototype.updatePassword = function (updatePasswordData) {
        if (updatePasswordData.userType != null) {
            this.userType.next(this.getUserTypeByName(updatePasswordData.userType));
        }
        var args;
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
            this.tryLoadAuthData();
        }
        var body = args;
        return this.http.put(this.getServerPath() + this.options.updatePasswordPath, body);
    };
    // Reset password request
    AngularTokenService.prototype.resetPassword = function (resetPasswordData) {
        var _a;
        this.userType.next((resetPasswordData.userType == null) ? null : this.getUserTypeByName(resetPasswordData.userType));
        var body = (_a = {},
            _a[this.options.loginField] = resetPasswordData.login,
            _a.redirect_url = this.options.resetPasswordCallback,
            _a);
        return this.http.post(this.getServerPath() + this.options.resetPasswordPath, body);
    };
    /**
     *
     * Construct Paths / Urls
     *
     */
    AngularTokenService.prototype.getUserPath = function () {
        return (this.userType.value == null) ? '' : this.userType.value.path + '/';
    };
    AngularTokenService.prototype.getApiPath = function () {
        var constructedPath = '';
        if (this.options.apiBase != null) {
            constructedPath += this.options.apiBase + '/';
        }
        if (this.options.apiPath != null) {
            constructedPath += this.options.apiPath + '/';
        }
        return constructedPath;
    };
    AngularTokenService.prototype.getServerPath = function () {
        return this.getApiPath() + this.getUserPath();
    };
    AngularTokenService.prototype.getOAuthPath = function (oAuthType) {
        var oAuthPath;
        oAuthPath = this.options.oAuthPaths[oAuthType];
        if (oAuthPath == null) {
            oAuthPath = "/auth/" + oAuthType;
        }
        return oAuthPath;
    };
    AngularTokenService.prototype.getOAuthUrl = function (oAuthPath, callbackUrl, windowType) {
        var url;
        url = this.options.oAuthBase + "/" + oAuthPath;
        url += "?omniauth_window_type=" + windowType;
        url += "&auth_origin_url=" + encodeURIComponent(callbackUrl);
        if (this.userType.value != null) {
            url += "&resource_class=" + this.userType.value.name;
        }
        return url;
    };
    /**
     *
     * Get Auth Data
     *
     */
    // Try to load auth data
    AngularTokenService.prototype.tryLoadAuthData = function () {
        var userType = this.getUserTypeByName(this.localStorage.getItem('userType'));
        if (userType) {
            this.userType.next(userType);
        }
        this.getAuthDataFromStorage();
        if (this.activatedRoute) {
            this.getAuthDataFromParams();
        }
        // if (this.authData) {
        //     this.validateToken();
        // }
    };
    // Parse Auth data from response
    AngularTokenService.prototype.getAuthHeadersFromResponse = function (data) {
        var headers = data.headers;
        var authData = {
            accessToken: headers.get('access-token'),
            client: headers.get('client'),
            expiry: headers.get('expiry'),
            tokenType: headers.get('token-type'),
            uid: headers.get('uid')
        };
        this.setAuthData(authData);
    };
    // Parse Auth data from post message
    AngularTokenService.prototype.getAuthDataFromPostMessage = function (data) {
        var authData = {
            accessToken: data['auth_token'],
            client: data['client_id'],
            expiry: data['expiry'],
            tokenType: 'Bearer',
            uid: data['uid']
        };
        this.setAuthData(authData);
    };
    // Try to get auth data from storage.
    AngularTokenService.prototype.getAuthDataFromStorage = function () {
        var authData = {
            accessToken: this.localStorage.getItem('accessToken'),
            client: this.localStorage.getItem('client'),
            expiry: this.localStorage.getItem('expiry'),
            tokenType: this.localStorage.getItem('tokenType'),
            uid: this.localStorage.getItem('uid')
        };
        if (this.checkAuthData(authData)) {
            this.authData.next(authData);
        }
    };
    // Try to get auth data from url parameters.
    AngularTokenService.prototype.getAuthDataFromParams = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (queryParams) {
            var authData = {
                accessToken: queryParams['token'] || queryParams['auth_token'],
                client: queryParams['client_id'],
                expiry: queryParams['expiry'],
                tokenType: 'Bearer',
                uid: queryParams['uid']
            };
            if (_this.checkAuthData(authData)) {
                _this.authData.next(authData);
            }
        });
    };
    /**
     *
     * Set Auth Data
     *
     */
    // Write auth data to storage
    AngularTokenService.prototype.setAuthData = function (authData) {
        if (this.checkAuthData(authData)) {
            this.authData.next(authData);
            this.localStorage.setItem('accessToken', authData.accessToken);
            this.localStorage.setItem('client', authData.client);
            this.localStorage.setItem('expiry', authData.expiry);
            this.localStorage.setItem('tokenType', authData.tokenType);
            this.localStorage.setItem('uid', authData.uid);
            if (this.userType.value != null) {
                this.localStorage.setItem('userType', this.userType.value.name);
            }
        }
    };
    /**
     *
     * Validate Auth Data
     *
     */
    // Check if auth data complete and if response token is newer
    AngularTokenService.prototype.checkAuthData = function (authData) {
        if (authData.accessToken != null &&
            authData.client != null &&
            authData.expiry != null &&
            authData.tokenType != null &&
            authData.uid != null) {
            if (this.authData.value != null) {
                return authData.expiry >= this.authData.value.expiry;
            }
            return true;
        }
        return false;
    };
    /**
     *
     * OAuth
     *
     */
    AngularTokenService.prototype.requestCredentialsViaPostMessage = function (authWindow) {
        var pollerObserv = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["interval"])(500);
        var responseObserv = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(this.global, 'message').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["pluck"])('data'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(this.oAuthWindowResponseFilter));
        responseObserv.subscribe(this.getAuthDataFromPostMessage.bind(this));
        var pollerSubscription = pollerObserv.subscribe(function () {
            if (authWindow.closed) {
                pollerSubscription.unsubscribe();
            }
            else {
                authWindow.postMessage('requestCredentials', '*');
            }
        });
        return responseObserv;
    };
    AngularTokenService.prototype.oAuthWindowResponseFilter = function (data) {
        if (data.message === 'deliverCredentials' || data.message === 'authFailure') {
            return data;
        }
    };
    /**
     *
     * Utilities
     *
     */
    // Match user config by user config name
    AngularTokenService.prototype.getUserTypeByName = function (name) {
        if (name == null || this.options.userTypes == null) {
            return null;
        }
        return this.options.userTypes.find(function (userType) { return userType.name === name; });
    };
    AngularTokenService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_token_token__WEBPACK_IMPORTED_MODULE_7__["ANGULAR_TOKEN_OPTIONS"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], Object, Object,
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AngularTokenService);
    return AngularTokenService;
}());



/***/ }),

/***/ "./projects/angular-token/src/lib/angular-token.token.ts":
/*!***************************************************************!*\
  !*** ./projects/angular-token/src/lib/angular-token.token.ts ***!
  \***************************************************************/
/*! exports provided: ANGULAR_TOKEN_OPTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANGULAR_TOKEN_OPTIONS", function() { return ANGULAR_TOKEN_OPTIONS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var ANGULAR_TOKEN_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ANGULAR_TOKEN_OPTIONS');


/***/ }),

/***/ "./projects/angular-token/src/public_api.ts":
/*!**************************************************!*\
  !*** ./projects/angular-token/src/public_api.ts ***!
  \**************************************************/
/*! exports provided: ANGULAR_TOKEN_OPTIONS, AngularTokenService, AngularTokenModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_angular_token_token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/angular-token.token */ "./projects/angular-token/src/lib/angular-token.token.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ANGULAR_TOKEN_OPTIONS", function() { return _lib_angular_token_token__WEBPACK_IMPORTED_MODULE_0__["ANGULAR_TOKEN_OPTIONS"]; });

/* harmony import */ var _lib_angular_token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/angular-token.service */ "./projects/angular-token/src/lib/angular-token.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AngularTokenService", function() { return _lib_angular_token_service__WEBPACK_IMPORTED_MODULE_1__["AngularTokenService"]; });

/* harmony import */ var _lib_angular_token_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/angular-token.module */ "./projects/angular-token/src/lib/angular-token.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AngularTokenModule", function() { return _lib_angular_token_module__WEBPACK_IMPORTED_MODULE_2__["AngularTokenModule"]; });






/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header title mat-elevation-z6\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n          <a>Angular-Token Example</a>\n          <a mat-stroked-button href=\"https://github.com/neroniaky/angular-token\">\n            <mat-icon>assignment</mat-icon>\n            View on Github\n          </a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"header current-user mat-elevation-z6\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n        <div class=\"row current-user\">\n          <div class=\"col-md-3\">\n            <p class=\"title\">Current User Status</p>\n          </div>\n          <div class=\"col-md-3\">\n            <p>Signed In?: <code>{{tokenService.userSignedIn()}}</code></p>\n          </div>\n          <div class=\"col-md-3\" *ngIf=\"tokenService.currentUserData\">\n            <p>Email: <code>{{tokenService.currentUserData.email}}</code></p>\n          </div>\n          <div class=\"col-md-3\"*ngIf=\"tokenService.currentUserType\">\n            <p>UserType: <code>{{tokenService.currentUserType}}</code></p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container header-text\">\n  <div class=\"row\">\n      <div class=\"col\">\n      <p>\n        This is an example for Angular-Token. Angular-Token is a token based authentication service for Angular with multiple user support. It works best with the devise token auth gem for Rails.\n      </p>\n    </div>\n  </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  position: fixed;\n  left: 0;\n  width: 100%; }\n  .header.title {\n    color: white;\n    z-index: 999;\n    background-color: #3f51b5;\n    top: 0;\n    height: 60px; }\n  .header.title .col {\n      display: flex;\n      height: 60px; }\n  .header.title .col a {\n        font-size: 14px;\n        font-weight: 500;\n        margin-top: auto;\n        margin-bottom: auto; }\n  .header.title .col a.mat-stroked-button {\n          margin-left: auto; }\n  .header.current-user {\n    z-index: 998;\n    top: 60px;\n    background-color: #333;\n    padding-top: 10px;\n    padding-bottom: 10px; }\n  .header.current-user p {\n      color: #999;\n      font-size: 14px;\n      line-height: 24px;\n      -webkit-margin-before: 0;\n              margin-block-start: 0;\n      -webkit-margin-after: 0;\n              margin-block-end: 0; }\n  .header.current-user p.title {\n        color: white; }\n  .header-text {\n  padding-top: 140px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NvbG0vUnVieW1pbmVQcm9qZWN0cy9hbmd1bGFyMi10b2tlbi9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixPQUFPO0VBQ1AsV0FBVyxFQUFBO0VBSGI7SUFNSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixNQUFNO0lBQ04sWUFBWSxFQUFBO0VBVmhCO01BYU0sYUFBYTtNQUNiLFlBQVksRUFBQTtFQWRsQjtRQWlCUSxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixtQkFBbUIsRUFBQTtFQXBCM0I7VUF1QlUsaUJBQWlCLEVBQUE7RUF2QjNCO0lBOEJJLFlBQVk7SUFDWixTQUFTO0lBQ1Qsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixvQkFBb0IsRUFBQTtFQWxDeEI7TUFxQ00sV0FBVztNQUNYLGVBQWU7TUFDZixpQkFBaUI7TUFDakIsd0JBQXFCO2NBQXJCLHFCQUFxQjtNQUNyQix1QkFBbUI7Y0FBbkIsbUJBQW1CLEVBQUE7RUF6Q3pCO1FBNENRLFlBQVksRUFBQTtFQU1wQjtFQUNFLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgJi50aXRsZSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHotaW5kZXg6IDk5OTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Y1MWI1O1xuICAgIHRvcDogMDtcbiAgICBoZWlnaHQ6IDYwcHg7XG5cbiAgICAuY29sIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBoZWlnaHQ6IDYwcHg7XG5cbiAgICAgIGEge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG5cbiAgICAgICAgJi5tYXQtc3Ryb2tlZC1idXR0b24ge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi5jdXJyZW50LXVzZXIge1xuICAgIHotaW5kZXg6IDk5ODtcbiAgICB0b3A6IDYwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcblxuICAgIHAge1xuICAgICAgY29sb3I6ICM5OTk7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMjRweDtcbiAgICAgIG1hcmdpbi1ibG9jay1zdGFydDogMDtcbiAgICAgIG1hcmdpbi1ibG9jay1lbmQ6IDA7XG5cbiAgICAgICYudGl0bGUge1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5oZWFkZXItdGV4dCB7XG4gIHBhZGRpbmctdG9wOiAxNDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(tokenService) {
        this.tokenService = tokenService;
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__["AngularTokenService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _example_example_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./example/example.module */ "./src/app/example/example.module.ts");
/* harmony import */ var _restricted_restricted_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./restricted/restricted.module */ "./src/app/restricted/restricted.module.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _fake_backend__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fake-backend */ "./src/app/fake-backend.ts");















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _app_routes__WEBPACK_IMPORTED_MODULE_13__["routes"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _example_example_module__WEBPACK_IMPORTED_MODULE_11__["ExampleModule"],
                _restricted_restricted_module__WEBPACK_IMPORTED_MODULE_12__["RestrictedModule"],
                _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_9__["AngularTokenModule"].forRoot({
                    // Change to your local dev environment example: 'http://localhost:3000'
                    apiBase: 'https://mock-api-server',
                }),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"]
            ],
            providers: [
                _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_9__["AngularTokenModule"],
                _fake_backend__WEBPACK_IMPORTED_MODULE_14__["fakeBackendProvider"]
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");
/* harmony import */ var _example_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./example/example.component */ "./src/app/example/example.component.ts");
/* harmony import */ var _restricted_restricted_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restricted/restricted.component */ "./src/app/restricted/restricted.component.ts");




var routerConfig = [
    { path: '', component: _example_example_component__WEBPACK_IMPORTED_MODULE_2__["ExampleComponent"] },
    { path: 'restricted', component: _restricted_restricted_component__WEBPACK_IMPORTED_MODULE_3__["RestrictedComponent"], canActivate: [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_1__["AngularTokenService"]] }
];
var routes = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routerConfig);


/***/ }),

/***/ "./src/app/example/access-resource/access-resource.component.html":
/*!************************************************************************!*\
  !*** ./src/app/example/access-resource/access-resource.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">lock</mat-icon>\n\t\t\tAccess Private Resource\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tTry to access a private Rescource\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #accessResourceForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\"\n\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\tAccess Private Resource\n\t\t\t\t</button>\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>"

/***/ }),

/***/ "./src/app/example/access-resource/access-resource.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/example/access-resource/access-resource.component.ts ***!
  \**********************************************************************/
/*! exports provided: AccessResourceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessResourceComponent", function() { return AccessResourceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");




var AccessResourceComponent = /** @class */ (function () {
    function AccessResourceComponent(tokenService, http) {
        this.tokenService = tokenService;
        this.http = http;
    }
    // Submit Data to Backend
    AccessResourceComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.http.get(this.tokenService.tokenOptions.apiBase + '/private_resource').subscribe(function (res) { return _this.output = res; }, function (error) { return _this.output = error; });
    };
    AccessResourceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-access-resource',
            template: __webpack_require__(/*! ./access-resource.component.html */ "./src/app/example/access-resource/access-resource.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AccessResourceComponent);
    return AccessResourceComponent;
}());



/***/ }),

/***/ "./src/app/example/can-activate/can-activate.component.html":
/*!******************************************************************!*\
  !*** ./src/app/example/can-activate/can-activate.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">lock</mat-icon>\n\t\t\tAccess Private Route\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tTry to access a private route\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<a mat-raised-button color=\"primary\" routerLink=\"/restricted\" routerLinkActive=\"active\">\n\t\t\t\tAccess Private Route\n\t\t\t</a>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/example/can-activate/can-activate.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/example/can-activate/can-activate.component.ts ***!
  \****************************************************************/
/*! exports provided: CanActivateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanActivateComponent", function() { return CanActivateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CanActivateComponent = /** @class */ (function () {
    function CanActivateComponent() {
    }
    CanActivateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-can-activate',
            template: __webpack_require__(/*! ./can-activate.component.html */ "./src/app/example/can-activate/can-activate.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CanActivateComponent);
    return CanActivateComponent;
}());



/***/ }),

/***/ "./src/app/example/change-password/change-password.component.html":
/*!************************************************************************!*\
  !*** ./src/app/example/change-password/change-password.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">vpn_key</mat-icon>\n\t\t\tUpdate Password\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tUpdate the password of the currently signed in user\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #changePasswordForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\tplaceholder=\"Current Password\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"updatePasswordData.passwordCurrent\"\n\t\t\t\t\t\tname=\"current-password\">\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input \n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\tplaceholder=\"New Password\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"updatePasswordData.password\"\n\t\t\t\t\t\tname=\"password\">\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\tplaceholder=\"New Password Confirmation\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"updatePasswordData.passwordConfirmation\"\n\t\t\t\t\t\tname=\"password-confirmation\">\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\ttype=\"submit\"\n\t\t\t\t\t[disabled]=\"!changePasswordForm.form.valid\">\n\t\t\t\t\tUpdate Password\n\t\t\t\t</button>\n\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>"

/***/ }),

/***/ "./src/app/example/change-password/change-password.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/example/change-password/change-password.component.ts ***!
  \**********************************************************************/
/*! exports provided: ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");




var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(tokenService) {
        this.tokenService = tokenService;
        this.updatePasswordData = {};
    }
    // Submit Data to Backend
    ChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.tokenService.updatePassword(this.updatePasswordData).subscribe(function (res) {
            _this.output = res;
            _this.changePasswordForm.resetForm();
        }, function (error) {
            _this.output = error;
            _this.changePasswordForm.resetForm();
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('changePasswordForm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], ChangePasswordComponent.prototype, "changePasswordForm", void 0);
    ChangePasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-change-password',
            template: __webpack_require__(/*! ./change-password.component.html */ "./src/app/example/change-password/change-password.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());



/***/ }),

/***/ "./src/app/example/example.component.html":
/*!************************************************!*\
  !*** ./src/app/example/example.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <app-register class=\"row\"></app-register>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-sign-in class=\"row\"></app-sign-in>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-access-resource class=\"row\"></app-access-resource>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-can-activate class=\"row\"></app-can-activate>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-change-password class=\"row\"></app-change-password>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-validate-token class=\"row\"></app-validate-token>\n</div>\n\n<mat-divider></mat-divider>\n\n<div class=\"container\">\n  <app-sign-out class=\"row\"></app-sign-out>\n</div>\n"

/***/ }),

/***/ "./src/app/example/example.component.scss":
/*!************************************************!*\
  !*** ./src/app/example/example.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  background-color: #eee; }\n\n.row {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  margin-top: 20px;\n  margin-bottom: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NvbG0vUnVieW1pbmVQcm9qZWN0cy9hbmd1bGFyMi10b2tlbi9zcmMvYXBwL2V4YW1wbGUvZXhhbXBsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHNCQUFzQixFQUFBOztBQUd4QjtFQUNFLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvZXhhbXBsZS9leGFtcGxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xufVxuXG4ucm93IHtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/example/example.component.ts":
/*!**********************************************!*\
  !*** ./src/app/example/example.component.ts ***!
  \**********************************************/
/*! exports provided: ExampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleComponent", function() { return ExampleComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ExampleComponent = /** @class */ (function () {
    function ExampleComponent() {
    }
    ExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-example',
            template: __webpack_require__(/*! ./example.component.html */ "./src/app/example/example.component.html"),
            styles: [__webpack_require__(/*! ./example.component.scss */ "./src/app/example/example.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ExampleComponent);
    return ExampleComponent;
}());



/***/ }),

/***/ "./src/app/example/example.module.ts":
/*!*******************************************!*\
  !*** ./src/app/example/example.module.ts ***!
  \*******************************************/
/*! exports provided: ExampleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleModule", function() { return ExampleModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _example_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./example.component */ "./src/app/example/example.component.ts");
/* harmony import */ var _output_output_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./output/output.component */ "./src/app/example/output/output.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./register/register.component */ "./src/app/example/register/register.component.ts");
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sign-in/sign-in.component */ "./src/app/example/sign-in/sign-in.component.ts");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./change-password/change-password.component */ "./src/app/example/change-password/change-password.component.ts");
/* harmony import */ var _access_resource_access_resource_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./access-resource/access-resource.component */ "./src/app/example/access-resource/access-resource.component.ts");
/* harmony import */ var _validate_token_validate_token_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./validate-token/validate-token.component */ "./src/app/example/validate-token/validate-token.component.ts");
/* harmony import */ var _sign_out_sign_out_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sign-out/sign-out.component */ "./src/app/example/sign-out/sign-out.component.ts");
/* harmony import */ var _can_activate_can_activate_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./can-activate/can-activate.component */ "./src/app/example/can-activate/can-activate.component.ts");



















var ExampleModule = /** @class */ (function () {
    function ExampleModule() {
    }
    ExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__["MatDividerModule"]
            ],
            declarations: [
                _example_component__WEBPACK_IMPORTED_MODULE_10__["ExampleComponent"],
                _output_output_component__WEBPACK_IMPORTED_MODULE_11__["OutputComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_12__["RegisterComponent"],
                _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_13__["SignInComponent"],
                _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_14__["ChangePasswordComponent"],
                _sign_out_sign_out_component__WEBPACK_IMPORTED_MODULE_17__["SignOutComponent"],
                _access_resource_access_resource_component__WEBPACK_IMPORTED_MODULE_15__["AccessResourceComponent"],
                _validate_token_validate_token_component__WEBPACK_IMPORTED_MODULE_16__["ValidateTokenComponent"],
                _can_activate_can_activate_component__WEBPACK_IMPORTED_MODULE_18__["CanActivateComponent"]
            ],
            exports: [
                _example_component__WEBPACK_IMPORTED_MODULE_10__["ExampleComponent"]
            ]
        })
    ], ExampleModule);
    return ExampleModule;
}());



/***/ }),

/***/ "./src/app/example/output/output.component.html":
/*!******************************************************!*\
  !*** ./src/app/example/output/output.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n\n  <mat-card-title>Response</mat-card-title>\n  <mat-card-subtitle>\n    Display the reponse for the request\n  </mat-card-subtitle>\n\n  <mat-card-footer>\n\n    <div *ngIf=\"response\">\n      <div *ngIf=\"response.status != null\">\n        <p>Status</p>\n        <pre><code>{{response.status}}</code></pre>\n      </div>\n\n      <div *ngIf=\"response.success != null\">\n        <p>Success</p>\n        <pre><code>{{response.success}}</code></pre>\n      </div>\n\n      <div *ngIf=\"response.statusText != null\">\n        <p>Status Text</p>\n        <pre><code>{{response.statusText}}</code></pre>\n      </div>\n\n      <div *ngIf=\"response.data\">\n          <p>Data</p>\n        <pre><code>{{response.data | json}}</code></pre>\n      </div>\n\n      <div *ngIf=\"response.errors\">\n        <p>Errors</p>\n        <pre><code>{{response.errors | json}}</code></pre>\n      </div>\n    </div>\n\n    <div *ngIf=\"!response\">\n      <p class=\"empty-icon\"><mat-icon>block</mat-icon></p>\n      <p class=\"empty-icon\">Nothing to display</p>\n    </div>\n  </mat-card-footer>\n</mat-card>"

/***/ }),

/***/ "./src/app/example/output/output.component.scss":
/*!******************************************************!*\
  !*** ./src/app/example/output/output.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%; }\n\nmat-card {\n  overflow: hidden; }\n\nmat-card mat-card-footer {\n    background-color: #333;\n    padding: 5px 20px;\n    color: white; }\n\nmat-card mat-card-footer p {\n      -webkit-margin-after: 3px;\n              margin-block-end: 3px; }\n\nmat-card mat-card-footer pre {\n      margin-top: 0; }\n\nmat-card mat-card-footer .empty-icon {\n      color: #666;\n      text-align: center;\n      margin-bottom: 20px; }\n\nmat-card mat-card-footer .empty-icon mat-icon {\n        height: 60px;\n        width: 60px;\n        font-size: 60px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NvbG0vUnVieW1pbmVQcm9qZWN0cy9hbmd1bGFyMi10b2tlbi9zcmMvYXBwL2V4YW1wbGUvb3V0cHV0L291dHB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGdCQUFnQixFQUFBOztBQURsQjtJQUlJLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsWUFBWSxFQUFBOztBQU5oQjtNQVNNLHlCQUFxQjtjQUFyQixxQkFBcUIsRUFBQTs7QUFUM0I7TUFhTSxhQUFhLEVBQUE7O0FBYm5CO01BaUJNLFdBQVc7TUFDWCxrQkFBa0I7TUFDbEIsbUJBQW1CLEVBQUE7O0FBbkJ6QjtRQXNCUSxZQUFZO1FBQ1osV0FBVztRQUNYLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2V4YW1wbGUvb3V0cHV0L291dHB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1jYXJkIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBtYXQtY2FyZC1mb290ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gICAgcGFkZGluZzogNXB4IDIwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuXG4gICAgcCB7XG4gICAgICBtYXJnaW4tYmxvY2stZW5kOiAzcHg7XG4gICAgfVxuXG4gICAgcHJlIHtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuXG4gICAgLmVtcHR5LWljb24ge1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogNjBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/example/output/output.component.ts":
/*!****************************************************!*\
  !*** ./src/app/example/output/output.component.ts ***!
  \****************************************************/
/*! exports provided: OutputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputComponent", function() { return OutputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OutputComponent = /** @class */ (function () {
    function OutputComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], OutputComponent.prototype, "response", void 0);
    OutputComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-output',
            template: __webpack_require__(/*! ./output.component.html */ "./src/app/example/output/output.component.html"),
            styles: [__webpack_require__(/*! ./output.component.scss */ "./src/app/example/output/output.component.scss")]
        })
    ], OutputComponent);
    return OutputComponent;
}());



/***/ }),

/***/ "./src/app/example/register/register.component.html":
/*!**********************************************************!*\
  !*** ./src/app/example/register/register.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">account_circle</mat-icon>\n\t\t\tRegister\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tRegister a new Account\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #registerForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\tplaceholder=\"Email\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"registerData.login\"\n\t\t\t\t\t\tname=\"login\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\tplaceholder=\"Password\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"registerData.password\"\n\t\t\t\t\t\tname=\"password\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\tplaceholder=\"Password Confirmation\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"registerData.passwordConfirmation\"\n\t\t\t\t\t\tname=\"passwordConfirmation\">\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\"\n\t\t\t\t\ttype=\"submit\"\n\t\t\t\t\t[disabled]=\"!registerForm.form.valid\">Register</button>\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>"

/***/ }),

/***/ "./src/app/example/register/register.component.ts":
/*!********************************************************!*\
  !*** ./src/app/example/register/register.component.ts ***!
  \********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(tokenService) {
        this.tokenService = tokenService;
        this.registerData = {};
    }
    // Submit Data to Backend
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.tokenService.registerAccount(this.registerData).subscribe(function (res) {
            _this.output = res;
            _this.registerForm.resetForm();
        }, function (error) {
            _this.output = error;
            _this.registerForm.resetForm();
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('registerForm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], RegisterComponent.prototype, "registerForm", void 0);
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/example/register/register.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/example/sign-in/sign-in.component.html":
/*!********************************************************!*\
  !*** ./src/app/example/sign-in/sign-in.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">lock</mat-icon>\n\t\t\tSign In\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tSign into a previously registered Account\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #signInForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"email\"\n\t\t\t\t\t\tplaceholder=\"Email\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"signInData.login\"\n\t\t\t\t\t\tname=\"email\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input \n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\ttype=\"password\"\n\t\t\t\t\t\tplaceholder=\"Password\"\n\t\t\t\t\t\trequired\n\t\t\t\t\t\t[(ngModel)]=\"signInData.password\"\n\t\t\t\t\t\tname=\"password\">\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\"\n\t\t\t\t\ttype=\"submit\"\n\t\t\t\t\t[disabled]=\"!signInForm.form.valid\">Sign In</button>\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>"

/***/ }),

/***/ "./src/app/example/sign-in/sign-in.component.ts":
/*!******************************************************!*\
  !*** ./src/app/example/sign-in/sign-in.component.ts ***!
  \******************************************************/
/*! exports provided: SignInComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignInComponent", function() { return SignInComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");




var SignInComponent = /** @class */ (function () {
    function SignInComponent(tokenService) {
        this.tokenService = tokenService;
        this.signInData = {};
    }
    // Submit Data to Backend
    SignInComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.tokenService.signIn(this.signInData).subscribe(function (res) {
            _this.output = res;
            _this.signInForm.resetForm();
        }, function (error) {
            _this.output = error;
            _this.signInForm.resetForm();
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('signInForm'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], SignInComponent.prototype, "signInForm", void 0);
    SignInComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sign-in',
            template: __webpack_require__(/*! ./sign-in.component.html */ "./src/app/example/sign-in/sign-in.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_3__["AngularTokenService"]])
    ], SignInComponent);
    return SignInComponent;
}());



/***/ }),

/***/ "./src/app/example/sign-out/sign-out.component.html":
/*!**********************************************************!*\
  !*** ./src/app/example/sign-out/sign-out.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">lock</mat-icon>\n\t\t\tSign Out\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tSign out current user\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #signOutForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\"\n\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\tSign Out\n\t\t\t\t</button>\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>\n"

/***/ }),

/***/ "./src/app/example/sign-out/sign-out.component.ts":
/*!********************************************************!*\
  !*** ./src/app/example/sign-out/sign-out.component.ts ***!
  \********************************************************/
/*! exports provided: SignOutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignOutComponent", function() { return SignOutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");



var SignOutComponent = /** @class */ (function () {
    function SignOutComponent(tokenService) {
        this.tokenService = tokenService;
    }
    // Submit Data to Backend
    SignOutComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.tokenService.signOut().subscribe(function (res) { return _this.output = res; }, function (error) { return _this.output = error; });
    };
    SignOutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sign-out',
            template: __webpack_require__(/*! ./sign-out.component.html */ "./src/app/example/sign-out/sign-out.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__["AngularTokenService"]])
    ], SignOutComponent);
    return SignOutComponent;
}());



/***/ }),

/***/ "./src/app/example/validate-token/validate-token.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/example/validate-token/validate-token.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6\">\n\t<mat-card>\n\t\t<mat-card-title>\n\t\t\t<mat-icon color=\"primary\">lock</mat-icon>\n\t\t\tValidate Token\n\t\t</mat-card-title>\n\t\t<mat-card-subtitle>\n\t\t\tValidate the current users token\n\t\t</mat-card-subtitle>\n\n\t\t<mat-card-content>\n\t\t\t<form #validateTokenForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<button\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\" \n\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\tValidate Token\n\t\t\t\t</button>\n\t\t\t</form>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div class=\"col-md-6\">\n\t<app-output [response]=\"output\"></app-output>\n</div>"

/***/ }),

/***/ "./src/app/example/validate-token/validate-token.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/example/validate-token/validate-token.component.ts ***!
  \********************************************************************/
/*! exports provided: ValidateTokenComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidateTokenComponent", function() { return ValidateTokenComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../projects/angular-token/src/public_api */ "./projects/angular-token/src/public_api.ts");



var ValidateTokenComponent = /** @class */ (function () {
    function ValidateTokenComponent(tokenService) {
        this.tokenService = tokenService;
    }
    // Submit Data to Backend
    ValidateTokenComponent.prototype.onSubmit = function () {
        var _this = this;
        this.output = null;
        this.tokenService.validateToken().subscribe(function (res) { return _this.output = res; }, function (error) { return _this.output = error; });
    };
    ValidateTokenComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-validate-token',
            template: __webpack_require__(/*! ./validate-token.component.html */ "./src/app/example/validate-token/validate-token.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_projects_angular_token_src_public_api__WEBPACK_IMPORTED_MODULE_2__["AngularTokenService"]])
    ], ValidateTokenComponent);
    return ValidateTokenComponent;
}());



/***/ }),

/***/ "./src/app/fake-backend.ts":
/*!*********************************!*\
  !*** ./src/app/fake-backend.ts ***!
  \*********************************/
/*! exports provided: FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return FakeBackendInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return fakeBackendProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor() {
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        // array in local storage for registered users
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        // wrap in delayed observable to simulate server api call
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function () {
            /*
            *
            * Register
            *
            */
            if (request.url === 'https://mock-api-server/auth' && request.method === 'POST') {
                // Get new user object from post body
                var body_1 = request.body;
                // Check if all inputs provided
                if (body_1.email === null && body_1.password === null && body_1.password_confirmation === null) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.registerError(body_1.email, 'Please submit proper sign up data in request body.'));
                }
                // Check if password matches password confimation
                if (body_1.password !== body_1.password_confirmation) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.registerError(body_1.email, { password_confirmation: ['does not match Password'] }));
                }
                // Check if login is email
                var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!re.test(body_1.email)) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.registerError(body_1.email, { email: ['is not an email'] }));
                }
                // Check if login already exists
                var duplicateUser = _this.users.filter(function (user) {
                    return user.email === body_1.email;
                }).length;
                if (duplicateUser) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.registerError(body_1.email, { email: ['has already been taken'] }));
                }
                var newUser = {
                    id: _this.users.length + 1,
                    email: body_1.email,
                    password: body_1.password
                };
                _this.users.push(newUser);
                localStorage.setItem('users', JSON.stringify(_this.users));
                // respond 200 OK
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                    status: 200,
                    url: 'https://mock-api-server/auth',
                    body: {
                        status: 'success',
                        data: {
                            uid: body_1.email,
                            id: _this.users.length + 1,
                            email: body_1.email,
                            provider: 'email',
                            name: null,
                            nickname: null,
                            image: null,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }
                    }
                }));
            }
            /*
            *
            * Sign In
            *
            */
            if (request.url.match('https://mock-api-server/auth/sign_in') && request.method === 'POST') {
                var filteredUsers = _this.users.filter(function (user) {
                    return user.email === request.body.email && user.password === request.body.password;
                });
                if (filteredUsers.length) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        headers: _this.getHeaders(filteredUsers[0].email),
                        status: 200,
                        url: 'https://mock-api-server/auth/sign_in',
                        body: {
                            data: {
                                id: filteredUsers[0].id,
                                email: filteredUsers[0].email,
                                provider: 'email',
                                uid: filteredUsers[0].email,
                                name: null,
                                nickname: null,
                                image: null
                            }
                        }
                    }));
                }
                else {
                    // else return 400 bad request
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 401,
                        url: 'https://mock-api-server/auth/sign_in',
                        body: {
                            status: 'false',
                            errors: ['Invalid login credentials. Please try again.']
                        }
                    }));
                }
            }
            /*
            *
            * Sign Out
            *
            */
            if (request.url.match('https://mock-api-server/auth/sign_out') && request.method === 'DELETE') {
                if (request.headers.get('access-token') === 'fake-access-token') {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 200,
                        url: 'https://mock-api-server/auth/sign_out',
                        body: {
                            success: true
                        }
                    }));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 404,
                        url: 'https://mock-api-server/auth/sign_out',
                        body: {
                            status: 'false',
                            errors: ['User was not found or was not logged in.']
                        }
                    }));
                }
            }
            /*
            *
            * Validate Token
            *
            */
            if (request.url.match('https://mock-api-server/auth/validate_token') && request.method === 'GET') {
                var user = _this.getAuthUser(request);
                if (user) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        headers: _this.getHeaders(user.email),
                        status: 200,
                        url: 'https://mock-api-server/auth/validate_token',
                        body: {
                            success: true,
                            data: {
                                id: user.id,
                                provider: 'email',
                                uid: user.email,
                                name: null,
                                nickname: null,
                                image: null,
                                email: user.email
                            }
                        }
                    }));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 401,
                        url: 'https://mock-api-server/auth/validate_token',
                        body: {
                            success: false,
                            errors: ['Invalid login credentials']
                        }
                    }));
                }
            }
            /*
            *
            * Update Password
            *
            */
            if (request.url.match('https://mock-api-server/auth') && request.method === 'PUT') {
                // Check if password matches password confimation
                if (request.body.password !== request.body.password_confirmation) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_this.registerError(request.body.email, { password_confirmation: ['does not match Password'] }));
                }
                var user = _this.getAuthUser(request);
                if (user && user.password === request.body.password) {
                    _this.users[(user.id - 1)].password = request.body.password;
                    localStorage.setItem('users', JSON.stringify(_this.users));
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        headers: _this.getHeaders(user.email),
                        status: 200,
                        url: 'https://mock-api-server/auth',
                        body: {
                            status: 'success',
                            data: {
                                id: user.id,
                                email: user.email,
                                uid: user.email,
                                provider: 'email',
                                name: null,
                                nickname: null,
                                image: null,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString()
                            }
                        }
                    }));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 401,
                        url: 'https://mock-api-server/auth',
                        body: {
                            success: false,
                            errors: ['Invalid login credentials']
                        }
                    }));
                }
            }
            /*
            *
            * Access Private Resouce
            *
            */
            if (request.url.match('https://mock-api-server/private_resource') && request.method === 'GET') {
                var user = _this.getAuthUser(request);
                if (user) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        headers: _this.getHeaders(user.email),
                        status: 200,
                        url: 'https://mock-api-server/auth/private_resource',
                        body: {
                            data: 'Private Content for ' + user.email
                        }
                    }));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                        status: 401,
                        url: 'https://mock-api-server/auth/private_resource',
                        body: {
                            success: false,
                            errors: ['Invalid login credentials']
                        }
                    }));
                }
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an
            // error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["materialize"])())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(500))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["dematerialize"])());
    };
    FakeBackendInterceptor.prototype.getAuthUser = function (request) {
        var filteredUsers = this.users.filter(function (user) { return user.email === request.headers.get('uid'); });
        if (filteredUsers.length && request.headers.get('access-token') === 'fake-access-token') {
            return filteredUsers[0];
        }
        else {
            return undefined;
        }
    };
    FakeBackendInterceptor.prototype.getHeaders = function (uid) {
        var timestamp = String(Math.floor(Date.now() / 1000) + 600);
        // if login details are valid return 200 OK with user details and fake jwt token
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'access-token': 'fake-access-token',
            'client': 'fake-client-id',
            'expiry': timestamp,
            'token-type': 'Bearer',
            'uid': uid
        });
    };
    FakeBackendInterceptor.prototype.registerError = function (email, errorMsg) {
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
            status: 422, url: 'https://mock-api-server/auth', body: {
                status: 'error',
                data: {
                    id: null,
                    provider: 'email',
                    uid: '',
                    name: null,
                    nickname: null,
                    image: null,
                    email: email,
                    created_at: null,
                    updated_at: null
                },
                errors: errorMsg
            }
        });
    };
    FakeBackendInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());

var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/restricted/restricted.component.html":
/*!******************************************************!*\
  !*** ./src/app/restricted/restricted.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 50px;\">\n  \n  <mat-card>\n    <mat-card-title>\n      Restricted Site\n    </mat-card-title>\n\n    <mat-card-content>\n      <p>This Site is available for logged in users only.</p>\n      <a mat-raised-button color=\"primary\" routerLink=\"/\" routerLinkActive=\"active\">\n        Return\n      </a>\n    </mat-card-content>\n  </mat-card>\n\n</div>"

/***/ }),

/***/ "./src/app/restricted/restricted.component.ts":
/*!****************************************************!*\
  !*** ./src/app/restricted/restricted.component.ts ***!
  \****************************************************/
/*! exports provided: RestrictedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestrictedComponent", function() { return RestrictedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RestrictedComponent = /** @class */ (function () {
    function RestrictedComponent() {
    }
    RestrictedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-restricted',
            template: __webpack_require__(/*! ./restricted.component.html */ "./src/app/restricted/restricted.component.html")
        })
    ], RestrictedComponent);
    return RestrictedComponent;
}());



/***/ }),

/***/ "./src/app/restricted/restricted.module.ts":
/*!*************************************************!*\
  !*** ./src/app/restricted/restricted.module.ts ***!
  \*************************************************/
/*! exports provided: RestrictedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestrictedModule", function() { return RestrictedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _restricted_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./restricted.component */ "./src/app/restricted/restricted.component.ts");







var RestrictedModule = /** @class */ (function () {
    function RestrictedModule() {
    }
    RestrictedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"]
            ],
            declarations: [
                _restricted_component__WEBPACK_IMPORTED_MODULE_6__["RestrictedComponent"]
            ],
            exports: [
                _restricted_component__WEBPACK_IMPORTED_MODULE_6__["RestrictedComponent"]
            ]
        })
    ], RestrictedModule);
    return RestrictedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/colm/RubymineProjects/angular2-token/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map