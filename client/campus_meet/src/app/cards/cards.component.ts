import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input()
  user: SocialUser = new SocialUser;

  @Input() event_list: any[] = [];

  joinedEvent: any;

  async selectEvent(event: any){
    this.joinedEvent = event;
    console.log(this.joinedEvent)
    var body_parameters: any = {
      'id': event._id, // NOTE THIS WILL BE THE DOCUMENT ID
      'attendees':this.user.firstName+this.user.lastName[0],
    };

    console.log(body_parameters)
  
    var formBody: any = [];
    for (var property in body_parameters) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body_parameters[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");


    let resp = await fetch('http://127.0.0.1:3000/api/event/addUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
  }


}
