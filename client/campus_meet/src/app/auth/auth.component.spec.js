"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angularx_social_login_1 = require("@abacritt/angularx-social-login");
var createSpyObj = jasmine.createSpyObj;
const rxjs_1 = require("rxjs");
const auth_component_1 = require("./auth.component");
describe('AuthComponent', () => {
    let component;
    let fixture;
    let socialAuthServiceMock;
    socialAuthServiceMock = createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [auth_component_1.AuthComponent],
            providers: [{ provide: angularx_social_login_1.SocialAuthService, useValue: Object.assign(Object.assign({}, socialAuthServiceMock), { authState: new rxjs_1.Observable() }) }]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(auth_component_1.AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=auth.component.spec.js.map