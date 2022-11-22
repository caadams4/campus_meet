"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthComponent = void 0;
const angularx_social_login_1 = require("@abacritt/angularx-social-login");
const core_1 = require("@angular/core");
let AuthComponent = class AuthComponent {
    // Client ID 37067624154-p8nctlpvjafdudjost7418i6l3981opq.apps.googleusercontent.com
    // Client Secret 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
    constructor(_authService) {
        this._authService = _authService;
        this.GoogleLoginProvider = angularx_social_login_1.GoogleLoginProvider;
    }
    ngOnInit() {
        this._authService.authState.subscribe((user) => {
            var _a;

        });
    }
    signOut() {
        this._authService.signOut();
    }
    refreshGoogleToken() {
        this._authService.refreshAuthToken(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    }

};
AuthComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css']
    })
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map