import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GoogleMapsModule} from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthComponent } from './auth/auth.component';
import { MapComponent } from './map/map.component';
import { CardsComponent } from './cards/cards.component';
import { MaterialModule } from './material/material.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatNativeDateModule} from '@angular/material/core';
import { ViewEventComponent } from './view-event/view-event.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MapComponent,
    CardsComponent,
    CreateEventComponent,
    ViewEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleMapsModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '534423947406-v3lk2sc0p98tl6lfdjpec838t8uctcba.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
