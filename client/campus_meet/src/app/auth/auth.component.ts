import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  // Client ID 37067624154-p8nctlpvjafdudjost7418i6l3981opq.apps.googleusercontent.com
  // Client Secret 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

  constructor(private readonly _authService: SocialAuthService) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      console.log(this.user)
      this.user = user;
    });
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}