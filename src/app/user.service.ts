import { Injectable } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: SocialUser | undefined
  constructor() { }
}
