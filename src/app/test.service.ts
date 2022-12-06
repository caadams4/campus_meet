import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public sharedValue:number = 5;
  constructor() { }
}
