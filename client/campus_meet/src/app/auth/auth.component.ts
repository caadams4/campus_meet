import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";
import { UserService } from "../user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  @Output() auth: EventEmitter<SocialUser> = new EventEmitter();

  user: SocialUser | undefined; 
  loggedIn: Boolean | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  image_path: string = './sample.png';

  // Client ID 37067624154-p8nctlpvjafdudjost7418i6l3981opq.apps.googleusercontent.com
  // Client Secret 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

  constructor(private readonly _authService: SocialAuthService) {}
  
  sendAuth() {  
      // This shares data from the child component, emits to the PARENT component.

      // Note: data emitted here, through child html, into parent html, explicitly recieved by parent  

      // Resource for sharing data between components: https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
    this.auth.emit(this.user);
  }
  
  ngOnInit() {
    this.signIn();
  }

  signOut(): void {
    this._authService.signOut();
    console.log(this.user);
    this.sendAuth();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then((user)=>{console.log(user)});
  }

  signIn(): void {
    this._authService.authState.subscribe(async (user) => {
      
      let user_proifile:any;
      this.user = user;
      

      if (this.user.email.length > 8 && this.user.email.endsWith("@udel.edu")) { // user is signed in and added to the database. Render app
        this.sendAuth();
      } else {
        alert("Sorry, this is for University of Delaware students only. If you are, sign in with your school email.")
      }
      
      this.loggedIn = (user != null);


      // check for user in database
      user_proifile = await this.find_user(this.user.id,user_proifile);

      // if not in database, create user and sent to database
      if (!user_proifile) {
        user_proifile = await this.create_user(this.user,user_proifile);
      }
      


    });
  }

  async find_user(id: string, user_profile:any) {
    // Fetch the user profile on sign in.

    var body_parameters = {'id': id};

    var formBody = "";
    formBody += encodeURIComponent('id') + "=" + encodeURIComponent(body_parameters['id'])

    let request: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }

    user_profile = await fetch('http://127.0.0.1:3000/api/user/find',request) 
    .then((response) => response.json())
    .then((user) => {
      return user;
    }).catch();
    if (user_profile) {
      return user_profile['document'];
    }
  }


  async create_user(user:SocialUser,user_profile:any) {
    var body_parameters: any = {
      'id': user.id, // NOTE THIS WILL BE THE GOOGLE USER ID
      'username': user.firstName + user.lastName[0],
      'interests':'[]',
      'groups':'[]',
    };

    var formBody: any = [];
    for (var property in body_parameters) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body_parameters[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let request: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }

    user_profile = await fetch('http://127.0.0.1:3000/api/user/',request) 
    .then((response) => response.json())
    .then((user) => {
      return user; 
    });
    if (user_profile) {
      return user_profile['document'];
    }
  }


}