import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewEventComponent } from '../view-event/view-event.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent {
  new_event: any;

  constructor(public dialog: MatDialog){}

  @Input()
  user: SocialUser = new SocialUser;

  @Input() event_list: any[] = [];

  @Output() event_list_joined: EventEmitter<any> = new EventEmitter();

  joinedEvent: any;

  sendList() {  
    // This shares data from the child component, emits to the PARENT component.

    // Note: data emitted here, through child html, into parent html, explicitly recieved by parent  

    // Resource for sharing data between components: https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
  this.event_list_joined.emit(this.event_list_joined);

}

  async leaveEvent(event: any){
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


    let resp = await fetch('http://127.0.0.1:3000/api/event/removeUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    console.log("Need to wait for db to write new event")
    setTimeout(()=>{},250);
    console.log("Done waiting, now pull!")
    this.sendList();
  }

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

    console.log("Need to wait for db to write new event")
    setTimeout(()=>{},250);
    console.log("Done waiting, now pull!")
    this.sendList();
  }
  openEvent(event:any): void {
    console.log(event)
    const dialogRef = this.dialog.open(ViewEventComponent, {
      width: '40%',
      height: '44vh',
      data: {event:event,user:this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sendList();
      this.new_event = result;
    });
  }

  async pullEvents(event_list:any) {
    // Fetch the events when funciton is called.

    console.log("Pulling events! ",event_list)

    let request: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }

    event_list = await fetch('http://127.0.0.1:3000/api/event',request) 
    .then((response) => response.json())
    .then((user) => {
      return user;
    }).catch();
    if (event_list) {
      let event_list_len = event_list['documents'].length; 
      for (let i = 0; i < event_list_len; i++) {
        let lati = <number> event_list['documents'][i].coordinates[0];
        let long = <number> event_list['documents'][i].coordinates[1];
        
        event_list['documents'][i].dateTimeEnd = new Date(event_list['documents'][i].dateTimeEnd);
        event_list['documents'][i].dateTimeStart = new Date(event_list['documents'][i].dateTimeStart);
        console.log('--------------------')
        let attendees: string[] = event_list['documents'][i].attendees;
        if (this.user) console.log("USER IN EVENT", this.user.firstName+this.user.lastName[0], attendees)
        
        if (this.user && attendees.includes(this.user?.firstName+this.user?.lastName[0])) { // check if a member of, if true, render a leave button
          console.log("Found a user")
          event_list['documents'][i].id = true;
        } else {
          event_list['documents'][i].id = false;
        }

      }
        
      console.log(event_list)

      return event_list['documents'];
    }

  }

}
