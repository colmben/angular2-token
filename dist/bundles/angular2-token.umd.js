(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/router'), require('@angular/common/http'), require('rxjs'), require('url-parse'), require('rxjs/operators'), require('rxjs/add/operator/finally')) :
	typeof define === 'function' && define.amd ? define('angular2-token', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/router', '@angular/common/http', 'rxjs', 'url-parse', 'rxjs/operators', 'rxjs/add/operator/finally'], factory) :
	(factory((global['angular2-token'] = {}),global.ng.core,global.ng.forms,global.ng.common,global.ng.router,global.ng.common.http,global.rxjs,global.urlParse,global.Rx.Observable.prototype));
}(this, (function (exports,core,forms,common,router,http,rxjs,urlParse,operators) { 'use strict';

var A2tFormService = /** @class */ (function () {
    function A2tFormService() {
        this.submit$ = new core.EventEmitter();
        this.submitLock = false;
    }
    A2tFormService.prototype.initForm = function (fields) {
        this.fields = fields;
        this._createFormGroup();
    };
    A2tFormService.prototype.submit = function () {
        this.submitLock = true;
        this.submit$.emit(this.formGroup.value);
    };
    A2tFormService.prototype.unlockSubmit = function () {
        this.formGroup.reset();
        this.submitLock = false;
    };
    A2tFormService.prototype._createFormGroup = function () {
        var group = {};
        this.fields.forEach((function (question) {
            group[question.key] = new forms.FormControl(null, question.validators);
        }));
        this.formGroup = new forms.FormGroup(group);
    };
    return A2tFormService;
}());
A2tFormService.decorators = [
    { type: core.Injectable },
];
A2tFormService.ctorParameters = function () { return []; };
var BaseField = /** @class */ (function () {
    function BaseField(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators === undefined ? [] : options.validators;
        this.type = options.type || '';
    }
    return BaseField;
}());
var SIGN_IN_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    })
];
var SIGN_UP_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordConfirmation',
        label: 'Password Confirmation',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    })
];
var RESET_PASSWORD_FORM = [
    new BaseField({
        key: 'email',
        label: 'Email',
        type: 'text',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    })
];
var UPDATE_PASSWORD_FORM = [
    new BaseField({
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordConfirmation',
        label: 'Password Confirmation',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    }),
    new BaseField({
        key: 'passwordCurrent',
        label: 'Old Password',
        type: 'password',
        validators: [
            forms.Validators.required,
            forms.Validators.minLength(8)
        ]
    })
];
var A2tFormFieldComponent = /** @class */ (function () {
    function A2tFormFieldComponent() {
    }
    A2tFormFieldComponent.prototype.ngOnInit = function () {
        this._control = this.form.controls[this.question.key];
    };
    Object.defineProperty(A2tFormFieldComponent.prototype, "isValid", {
        get: function () {
            return this._control.valid;
        },
        enumerable: true,
        configurable: true
    });
    return A2tFormFieldComponent;
}());
A2tFormFieldComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-form-field',
                template: "\n        <div class=\"a2t-input-group\"\n            [formGroup]=\"form\">\n\n            <label\n                [attr.for]=\"question.key\"\n                [style.color]=\"labelColor\"\n                *ngIf=\"_control.pristine\">\n                {{question.label}}\n            </label>\n\n            <label class=\"a2t-error\"\n                [attr.for]=\"question.key\"\n                *ngIf=\"_control.hasError('required') && !_control.pristine\">\n                {{question.label}} is required\n            </label>\n\n            <label class=\"a2t-error\"\n                [attr.for]=\"question.key\"\n                *ngIf=\"_control.hasError('minlength')\">\n                {{question.label}} is too short\n            </label>\n\n            <label class=\"a2t-error\"\n                [attr.for]=\"question.key\"\n                *ngIf=\"_control.hasError('maxlength')\">\n                {{question.label}} is too long\n            </label>\n\n            <label class=\"a2t-valid\"\n                [attr.for]=\"question.key\"\n                *ngIf=\"_control.valid && !_control.pristine\">\n                {{question.label}}\n            </label>\n\n            <input\n                [formControlName]=\"question.key\"\n                [id]=\"question.key\"\n                [type]=\"question.type\">\n        </div>\n    ",
                styles: ["\n        .a2t-input-group {\n            padding-bottom: 40px;\n            padding-right: 20px;\n            padding-left: 20px;\n            font-family: \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif;\n        }\n\n        .a2t-input-group input {\n            width: 100%;\n            outline: none;\n            border: none;\n            background-color: #eee;\n            line-height: 40px;\n\n            padding-left: 10px;\n            padding-right: 10px;\n        }\n\n        .a2t-input-group label {\n            color: #666;\n            font-weight: 600;\n            font-size: 13px;\n            margin-bottom: 0;\n        }\n\n        .a2t-error {\n            color: #df6564 !important;\n        }\n\n        .a2t-valid {\n            color: #72c380 !important;\n        }\n    "]
            },] },
];
A2tFormFieldComponent.propDecorators = {
    question: [{ type: core.Input }],
    form: [{ type: core.Input }]
};
var A2tFormComponent = /** @class */ (function () {
    function A2tFormComponent(_formService) {
        this._formService = _formService;
    }
    return A2tFormComponent;
}());
A2tFormComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-form',
                template: "\n        <form class=\"a2t-form\"\n            (ngSubmit)=\"_formService.submit()\"\n            [formGroup]=\"_formService.formGroup\">\n\n            <a2t-form-field\n                *ngFor=\"let field of this._formService.fields\"\n                [question]=\"field\"\n                [form]=\"_formService.formGroup\">\n            </a2t-form-field>\n\n            <button type=\"submit\" [disabled]=\"!_formService.formGroup.valid || _formService.formGroup.pristine || _formService.submitLock\">\n                <ng-content *ngIf=\"!_formService.submitLock\"></ng-content>\n                <span *ngIf=\"_formService.submitLock\">Submitting ...</span>\n            </button>\n        </form>\n    ",
                styles: ["\n        .a2t-form {\n            background-color: white;\n            border-radius: 3px;\n            box-shadow: 0px 1px 5px 0 rgba(0,0,0,0.3);\n            padding-top: 20px;\n            font-family: \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif;\n        }\n\n        .a2t-form button {\n            width: 100%;\n\n            transition: .3s;\n            background-color: #72c380;\n\n            border-bottom-right-radius: 3px;\n            border-bottom-left-radius: 3px;\n\n            outline: none;\n            text-align: center;\n            font-weight: 400;\n            border: none;\n            font-size: 16px;\n            line-height: 30px;\n\n            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n            color: white;\n            border-bottom: 3px solid transparent;\n        }\n\n        .a2t-form button:disabled {\n            background-color: #eee !important;\n            cursor: not-allowed;\n            color: #999;\n            text-shadow: none;\n        }\n\n        .a2t-form button:hover {\n            background-color: #a6d9ae;\n        }\n    "]
            },] },
];
A2tFormComponent.ctorParameters = function () { return [
    { type: A2tFormService }
]; };
var A2tLinksComponent = /** @class */ (function () {
    function A2tLinksComponent() {
    }
    return A2tLinksComponent;
}());
A2tLinksComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-links',
                template: "\n        <div class=\"a2t-wrapper\">\n            <p><a routerLink=\"/session/reset-password\" *ngIf=\"case != 'reset-password'\">Forgot Password?</a></p>\n            <p><a routerLink=\"/session/sign-up\" *ngIf=\"case != 'sign-up'\">Sign Up</a></p>\n            <p><a routerLink=\"/session/sign-in\" *ngIf=\"case != 'sign-in'\">Sign In</a></p>\n        </div>\n    ",
                styles: ["\n        .a2t-wrapper {\n            margin-top: 20px;\n        }\n\n        p {\n            margin-bottom: 0;\n        }\n\n        a {\n            color: #eee !important;\n            transition: .3s;\n            text-decoration: none;\n            font-size: 15px;\n            font-weight: 300;\n            font-family: \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif;\n        }\n\n        a:hover {\n            color: white;\n        }\n    "]
            },] },
];
A2tLinksComponent.ctorParameters = function () { return []; };
A2tLinksComponent.propDecorators = {
    case: [{ type: core.Input }]
};
var A2tErrorComponent = /** @class */ (function () {
    function A2tErrorComponent() {
    }
    return A2tErrorComponent;
}());
A2tErrorComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-error',
                template: '<div *ngFor="let error of errors"><p>{{error}}</p></div>',
                styles: ["\n        div {\n            width: 100%;\n            background-color: #df6564;\n            color: white;\n            font-weight: 300;\n            font-size: 15px;\n            padding: 10px 20px;\n            border-radius: 3px;\n            margin-bottom: 15px;\n        }\n\n        div > p {\n            margin-bottom: 0;\n        }\n    "]
            },] },
];
A2tErrorComponent.ctorParameters = function () { return []; };
A2tErrorComponent.propDecorators = {
    errors: [{ type: core.Input }]
};
var A2tHeadlineComponent = /** @class */ (function () {
    function A2tHeadlineComponent() {
    }
    return A2tHeadlineComponent;
}());
A2tHeadlineComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-headline',
                template: '<p><ng-content></ng-content></p>',
                styles: ["\n        p {\n            text-align: center;\n            color: white;\n            font-size: 30px;\n        }\n    "]
            },] },
];
A2tHeadlineComponent.ctorParameters = function () { return []; };
var A2tSharedModule = /** @class */ (function () {
    function A2tSharedModule() {
    }
    return A2tSharedModule;
}());
A2tSharedModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.ReactiveFormsModule,
                    router.RouterModule
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
var A2tUiComponent = /** @class */ (function () {
    function A2tUiComponent() {
    }
    return A2tUiComponent;
}());
A2tUiComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-ui',
                template: "\n        <div class=\"a2t-wrapper\">\n            <div class=\"a2t-container\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    ",
                styles: ["\n        .a2t-wrapper {\n            width: 100%;\n            height: 100vh;\n            min-height: 500px;\n\n            padding-top: 100px;\n\n            display: flex;\n            justify-content: center;\n\n            background-color: #3270a0;\n        }\n\n        .a2t-logo {\n            text-align: center;\n            color: white;\n            font-size: 30px;\n        }\n\n        .a2t-container {\n            width: 400px;\n        }\n    "]
            },] },
];
A2tUiComponent.ctorParameters = function () { return []; };
var Angular2TokenService = /** @class */ (function () {
    function Angular2TokenService(http$$1, activatedRoute, router$$1) {
        this.http = http$$1;
        this.activatedRoute = activatedRoute;
        this.router = router$$1;
    }
    Object.defineProperty(Angular2TokenService.prototype, "currentUserType", {
        get: function () {
            if (this.atCurrentUserType != null)
                return this.atCurrentUserType.name;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angular2TokenService.prototype, "currentUserData", {
        get: function () {
            return this.atCurrentUserData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angular2TokenService.prototype, "currentAuthData", {
        get: function () {
            return this.atCurrentAuthData;
        },
        set: function (authData) {
            this.setAuthData(authData);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angular2TokenService.prototype, "currentAuthHeaders", {
        get: function () {
            if (this.atCurrentAuthData != null) {
                return new http.HttpHeaders({
                    'access-token': this.atCurrentAuthData.accessToken,
                    'client': this.atCurrentAuthData.client,
                    'expiry': this.atCurrentAuthData.expiry,
                    'token-type': this.atCurrentAuthData.tokenType,
                    'uid': this.atCurrentAuthData.uid
                });
            }
            return new http.HttpHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Angular2TokenService.prototype, "apiPath", {
        get: function () {
            return this.getApiPath();
        },
        enumerable: true,
        configurable: true
    });
    Angular2TokenService.prototype.userSignedIn = function () {
        return !!this.atCurrentAuthData;
    };
    Angular2TokenService.prototype.canActivate = function () {
        if (this.userSignedIn())
            return true;
        else {
            if (this.atOptions.signInStoredUrlStorageKey) {
                localStorage.setItem(this.atOptions.signInStoredUrlStorageKey, window.location.pathname + window.location.search);
            }
            if (this.router && this.atOptions.signInRedirect)
                this.router.navigate([this.atOptions.signInRedirect]);
            return false;
        }
    };
    Angular2TokenService.prototype.init = function (options) {
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
        this.atOptions = (((Object))).assign(defaultOptions, options);
        this.tryLoadAuthData();
    };
    Angular2TokenService.prototype.registerAccount = function (registerData) {
        if (registerData.userType == null)
            this.atCurrentUserType = null;
        else {
            this.atCurrentUserType = this.getUserTypeByName(registerData.userType);
            delete registerData.userType;
        }
        registerData.password_confirmation = registerData.passwordConfirmation;
        delete registerData.passwordConfirmation;
        registerData.confirm_success_url = this.atOptions.registerAccountCallback;
        return this.request('POST', this.getUserPath() + this.atOptions.registerAccountPath, JSON.stringify(registerData));
    };
    Angular2TokenService.prototype.deleteAccount = function () {
        return this.request('DELETE', this.getUserPath() + this.atOptions.deleteAccountPath);
    };
    Angular2TokenService.prototype.signIn = function (signInData) {
        var _this = this;
        console.log('In singIn tap!');
        if (signInData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(signInData.userType);
        var body = JSON.stringify({
            email: signInData.email,
            password: signInData.password
        });
        var observ = this.request('POST', this.getUserPath() + this.atOptions.signInPath, body);
        console.log('In singIn tap, returned observ : ', observ);
        return observ.pipe(operators.tap((function (res) {
            console.log('In singIn tap, res  : ', res);
            _this.atCurrentUserData = res.data;
            console.log('In singIn tap, this.atCurrentUserData  : ', _this.atCurrentUserData);
        }), (function (err) {
            console.log('In singIn tap, error : ', err);
        })));
    };
    Angular2TokenService.prototype.signInOAuth = function (oAuthType) {
        var oAuthPath = this.getOAuthPath(oAuthType);
        var callbackUrl = window.location.origin + "/" + this.atOptions.oAuthCallbackPath;
        var oAuthWindowType = this.atOptions.oAuthWindowType;
        var authUrl = this.getOAuthUrl(oAuthPath, callbackUrl, oAuthWindowType);
        if (oAuthWindowType == 'newWindow') {
            var oAuthWindowOptions = this.atOptions.oAuthWindowOptions;
            var windowOptions = '';
            if (oAuthWindowOptions) {
                for (var key in oAuthWindowOptions) {
                    windowOptions += "," + key + "=" + oAuthWindowOptions[key];
                }
            }
            var popup = window.open(authUrl, '_blank', "closebuttoncaption=Cancel" + windowOptions);
            return this.requestCredentialsViaPostMessage(popup);
        }
        else if (oAuthWindowType == 'sameWindow') {
            window.location.href = authUrl;
        }
        else {
            throw "Unsupported oAuthWindowType \"" + oAuthWindowType + "\"";
        }
    };
    Angular2TokenService.prototype.processOAuthCallback = function () {
        this.getAuthDataFromParams();
    };
    Angular2TokenService.prototype.signOut = function () {
        var _this = this;
        var observ = this.request('DELETE', this.getUserPath() + this.atOptions.signOutPath);
        observ.pipe(operators.finalize((function () {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('client');
            localStorage.removeItem('expiry');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('uid');
            _this.atCurrentAuthData = null;
            _this.atCurrentUserType = null;
            _this.atCurrentUserData = null;
        })));
        return observ;
    };
    Angular2TokenService.prototype.validateToken = function () {
        var _this = this;
        var observ = this.request('GET', this.getUserPath() + this.atOptions.validateTokenPath);
        return observ.pipe(operators.tap((function (res) {
            if (res.data) {
                console.log('in validateResponse, res : ', res);
                _this.atCurrentUserData = res.data;
            }
        }), (function (error) {
            if (error.status === 401 && _this.atOptions.signOutFailedValidate) {
                _this.signOut();
            }
        })));
    };
    Angular2TokenService.prototype.updatePassword = function (updatePasswordData) {
        if (updatePasswordData.userType != null)
            this.atCurrentUserType = this.getUserTypeByName(updatePasswordData.userType);
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
        this.tryLoadAuthData();
        var body = JSON.stringify(args);
        return this.request('PUT', this.getUserPath() + this.atOptions.updatePasswordPath, body);
    };
    Angular2TokenService.prototype.resetPassword = function (resetPasswordData) {
        if (resetPasswordData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(resetPasswordData.userType);
        var body = JSON.stringify({
            email: resetPasswordData.email,
            redirect_url: this.atOptions.resetPasswordCallback
        });
        return this.request('POST', this.getUserPath() + this.atOptions.resetPasswordPath, body);
    };
    Angular2TokenService.prototype.request = function (method, url, body) {
        var options = {};
        var baseHeaders = this.atOptions.globalOptions.headers;
        options.headers = new http.HttpHeaders(baseHeaders);
        options.body = body;
        var response = this.http.request(method, this.getApiPath() + url, options);
        return response;
    };
    Angular2TokenService.prototype.tryLoadAuthData = function () {
        var userType = this.getUserTypeByName(localStorage.getItem('userType'));
        if (userType)
            this.atCurrentUserType = userType;
        this.getAuthDataFromStorage();
        this.getAuthDataFromParams();
        if (this.atCurrentAuthData)
            this.validateToken();
    };
    Angular2TokenService.prototype.getAuthDataFromPostMessage = function (data) {
        var authData = {
            accessToken: data['auth_token'],
            client: data['client_id'],
            expiry: data['expiry'],
            tokenType: 'Bearer',
            uid: data['uid']
        };
        this.setAuthData(authData);
    };
    Angular2TokenService.prototype.getAuthDataFromStorage = function () {
        var authData = {
            accessToken: localStorage.getItem('accessToken'),
            client: localStorage.getItem('client'),
            expiry: localStorage.getItem('expiry'),
            tokenType: localStorage.getItem('tokenType'),
            uid: localStorage.getItem('uid')
        };
        if (this.checkAuthData(authData))
            this.atCurrentAuthData = authData;
    };
    Angular2TokenService.prototype.getAuthDataFromParams = function () {
        var url = new urlParse(window.location.href, true);
        if (url && url.query) {
            var authData = {
                accessToken: url.query['token'] || url.query['auth_token'],
                client: url.query['client_id'],
                expiry: url.query['expiry'],
                tokenType: 'Bearer',
                uid: url.query['uid']
            };
            if (this.checkAuthData(authData)) {
                this.atCurrentAuthData = authData;
            }
        }
    };
    Angular2TokenService.prototype.setAuthData = function (authData) {
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
    };
    Angular2TokenService.prototype.checkAuthData = function (authData) {
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
    };
    Angular2TokenService.prototype.getUserPath = function () {
        if (this.atCurrentUserType == null)
            return '';
        else
            return this.atCurrentUserType.path + '/';
    };
    Angular2TokenService.prototype.getApiPath = function () {
        var constructedPath = '';
        if (this.atOptions.apiBase != null)
            constructedPath += this.atOptions.apiBase + '/';
        if (this.atOptions.apiPath != null)
            constructedPath += this.atOptions.apiPath + '/';
        return constructedPath;
    };
    Angular2TokenService.prototype.getOAuthPath = function (oAuthType) {
        var oAuthPath;
        oAuthPath = this.atOptions.oAuthPaths[oAuthType];
        if (oAuthPath == null)
            oAuthPath = "/auth/" + oAuthType;
        return oAuthPath;
    };
    Angular2TokenService.prototype.getOAuthUrl = function (oAuthPath, callbackUrl, windowType) {
        var url;
        url = this.atOptions.oAuthBase + "/" + oAuthPath;
        url += "?omniauth_window_type=" + windowType;
        url += "&auth_origin_url=" + encodeURIComponent(callbackUrl);
        if (this.atCurrentUserType != null)
            url += "&resource_class=" + this.atCurrentUserType.name;
        return url;
    };
    Angular2TokenService.prototype.requestCredentialsViaPostMessage = function (authWindow) {
        var pollerObserv = rxjs.interval(500);
        var responseObserv = rxjs.fromEvent(window, 'message').pipe(operators.pluck('data'), operators.filter(this.oAuthWindowResponseFilter));
        var responseSubscription = responseObserv.subscribe(this.getAuthDataFromPostMessage.bind(this));
        var pollerSubscription = pollerObserv.subscribe((function () {
            if (authWindow.closed)
                pollerSubscription.unsubscribe();
            else
                authWindow.postMessage('requestCredentials', '*');
        }));
        return responseObserv;
    };
    Angular2TokenService.prototype.oAuthWindowResponseFilter = function (data) {
        if (data.message == 'deliverCredentials' || data.message == 'authFailure')
            return data;
    };
    Angular2TokenService.prototype.getUserTypeByName = function (name) {
        if (name == null || this.atOptions.userTypes == null)
            return null;
        return this.atOptions.userTypes.find((function (userType) { return userType.name === name; }));
    };
    return Angular2TokenService;
}());
Angular2TokenService.decorators = [
    { type: core.Injectable },
];
Angular2TokenService.ctorParameters = function () { return [
    { type: http.HttpClient },
    { type: router.ActivatedRoute, decorators: [{ type: core.Optional }] },
    { type: router.Router, decorators: [{ type: core.Optional }] }
]; };
var A2tSignInComponent = /** @class */ (function () {
    function A2tSignInComponent(_formService, _sessionService, _router) {
        var _this = this;
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(SIGN_IN_FORM);
        this._formService.submit$.subscribe((function (data) { return _this._sessionService.signIn(data).subscribe((function (res) { return _this._handleSuccess(res); }), (function (error) { return _this._handleError(error); })); }));
    }
    A2tSignInComponent.prototype._handleSuccess = function (data) {
        this._errors = null;
        this._formService.unlockSubmit();
        this._router.navigate(['restricted']);
    };
    A2tSignInComponent.prototype._handleError = function (error) {
        this._errors = error.json().errors;
        this._formService.unlockSubmit();
    };
    return A2tSignInComponent;
}());
A2tSignInComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-sign-in',
                providers: [A2tFormService],
                template: "\n        <a2t-headline>Sign In</a2t-headline>\n        <a2t-error [errors]=\"_errors\"></a2t-error>\n        <a2t-form>Sign In</a2t-form>\n        <a2t-links case=\"sign-in\"></a2t-links>\n    "
            },] },
];
A2tSignInComponent.ctorParameters = function () { return [
    { type: A2tFormService },
    { type: Angular2TokenService },
    { type: router.Router }
]; };
var A2tSignUpComponent = /** @class */ (function () {
    function A2tSignUpComponent(_formService, _sessionService, _router) {
        var _this = this;
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(SIGN_UP_FORM);
        this._formService.submit$.subscribe((function (data) { return _this._sessionService.registerAccount(data).subscribe((function (res) { return _this._handleSuccess(res); }), (function (error) { return _this._handleError(error); })); }));
    }
    A2tSignUpComponent.prototype._handleSuccess = function (data) {
        this._errors = null;
        this._formService.unlockSubmit();
        this._router.navigate(['restricted']);
    };
    A2tSignUpComponent.prototype._handleError = function (error) {
        this._errors = error.json().errors.full_messages;
        this._formService.unlockSubmit();
    };
    return A2tSignUpComponent;
}());
A2tSignUpComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-sign-up',
                providers: [A2tFormService],
                template: "\n        <a2t-headline>Sign Up</a2t-headline>\n        <a2t-error [errors]=\"_errors\"></a2t-error>\n        <a2t-form>Sign Up</a2t-form>\n        <a2t-links case=\"sign-up\"></a2t-links>\n    "
            },] },
];
A2tSignUpComponent.ctorParameters = function () { return [
    { type: A2tFormService },
    { type: Angular2TokenService },
    { type: router.Router }
]; };
var A2tResetPasswordComponent = /** @class */ (function () {
    function A2tResetPasswordComponent(_formService, _sessionService) {
        var _this = this;
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._emailSend = false;
        this._formService.initForm(RESET_PASSWORD_FORM);
        this._formService.submit$.subscribe((function (data) { return _this._sessionService.resetPassword(data).subscribe((function (res) { return _this._handleSuccess(); }), (function (error) { return _this._handleError(); })); }));
    }
    A2tResetPasswordComponent.prototype._handleSuccess = function () {
        this._emailSend = true;
    };
    A2tResetPasswordComponent.prototype._handleError = function () {
        this._emailSend = true;
    };
    return A2tResetPasswordComponent;
}());
A2tResetPasswordComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-reset-password',
                providers: [A2tFormService],
                template: "\n        <a2t-headline *ngIf=\"!_emailSend\">Reset your Password</a2t-headline>\n        <a2t-form *ngIf=\"!_emailSend\">Reset Password</a2t-form>\n        <p class=\"email-send-text\" *ngIf=\"_emailSend\">\n            If the entered email is registered we will send instruction on how to reset your password.\n        </p>\n        <a2t-links *ngIf=\"!_emailSend\" case=\"reset-password\"></a2t-links>\n    ",
                styles: ["\n        .email-send-text {\n            background-color: #72c380;\n            color: white;\n            font-size: 16pt;\n            text-align: center;\n            padding: 20px;\n            border-radius: 3px;\n        }\n    "]
            },] },
];
A2tResetPasswordComponent.ctorParameters = function () { return [
    { type: A2tFormService },
    { type: Angular2TokenService }
]; };
var A2tUpdatePasswordComponent = /** @class */ (function () {
    function A2tUpdatePasswordComponent(_formService, _sessionService, _router) {
        var _this = this;
        this._formService = _formService;
        this._sessionService = _sessionService;
        this._router = _router;
        this._formService.initForm(UPDATE_PASSWORD_FORM);
        this._formService.submit$.subscribe((function (data) { return _this._sessionService.updatePassword(data).subscribe((function (res) { return _this._handleSuccess(res); }), (function (error) { return _this._handleError(error); })); }));
    }
    A2tUpdatePasswordComponent.prototype._handleSuccess = function (data) {
        this._router.navigate(['session/sign-in']);
    };
    A2tUpdatePasswordComponent.prototype._handleError = function (error) {
        this._errors = error.json().errors;
        this._formService.unlockSubmit();
    };
    return A2tUpdatePasswordComponent;
}());
A2tUpdatePasswordComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'a2t-update-password',
                providers: [A2tFormService],
                template: "\n        <a2t-headline>Update your Password</a2t-headline>\n        <a2t-error [errors]=\"_errors\"></a2t-error>\n        <a2t-form>Update Password</a2t-form>\n    "
            },] },
];
A2tUpdatePasswordComponent.ctorParameters = function () { return [
    { type: A2tFormService },
    { type: Angular2TokenService },
    { type: router.Router }
]; };
var routes = [{
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
var a2tRoutes = router.RouterModule.forChild(routes);
var A2tUiModule = /** @class */ (function () {
    function A2tUiModule() {
    }
    return A2tUiModule;
}());
A2tUiModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule,
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
var Angular2TokenInteceptor = /** @class */ (function () {
    function Angular2TokenInteceptor(_tokenService) {
        this._tokenService = _tokenService;
        this.apiPath = this._tokenService.apiPath;
    }
    Angular2TokenInteceptor.prototype.intercept = function (req, next) {
        var _this = this;
        console.log('In token interceptor, request : ', req, this._tokenService.currentAuthHeaders);
        var headersWithAuth = this._tokenService.currentAuthHeaders;
        var apiPath = req.headers.keys().forEach((function (key) {
            headersWithAuth = headersWithAuth.append(key, req.headers.get(key));
        }));
        console.log('In intercept request, new headers : ', headersWithAuth);
        if (req.url.match(this.apiPath)) {
            req = req.clone({ headers: headersWithAuth });
            var authHeaders_1 = this._tokenService.currentAuthHeaders;
            authHeaders_1.keys().forEach((function (key) {
                req.headers.append(key, authHeaders_1.get(key));
            }));
        }
        return next.handle(req)
            .pipe(operators.tap((function (res) {
            console.log('In token interceptor, evt : ', res);
            if (res instanceof http.HttpResponse && res.url.match(_this.apiPath)) {
                console.log('---> status:', res.status);
                console.log('---> filter:', req.params.get('filter'));
                _this.getAuthHeadersFromResponse(((res)));
            }
        }), (function (err) {
            console.log('In token interceptor, err : ', err);
            if (err instanceof http.HttpErrorResponse && err.url && err.url.match(_this.apiPath)) {
                console.log('In token interceptor, HTTP err : ', err);
                _this.getAuthHeadersFromResponse(((err)));
            }
            else {
                console.log("Auth Interceptor, non HTTP or no headers error - ", err);
            }
        })));
    };
    Angular2TokenInteceptor.prototype.getAuthHeadersFromResponse = function (data) {
        var headers = data.headers;
        var authData = {
            accessToken: headers.get('access-token'),
            client: headers.get('client'),
            expiry: headers.get('expiry'),
            tokenType: headers.get('token-type'),
            uid: headers.get('uid')
        };
        this._tokenService.currentAuthData = authData;
    };
    return Angular2TokenInteceptor;
}());
Angular2TokenInteceptor.decorators = [
    { type: core.Injectable },
];
Angular2TokenInteceptor.ctorParameters = function () { return [
    { type: Angular2TokenService }
]; };

exports.A2tUiModule = A2tUiModule;
exports.Angular2TokenService = Angular2TokenService;
exports.Angular2TokenInteceptor = Angular2TokenInteceptor;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-token.umd.js.map
