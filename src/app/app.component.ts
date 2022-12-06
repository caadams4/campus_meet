import { Component, OnInit, ɵisListLikeIterable} from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";
import { waitForAsync } from '@angular/core/testing';
import { EventListService } from './event-list.service';
import { Event } from './interfaces/Event';
import { CreateEventComponent } from './create-event/create-event.component';
import {MatDialog} from '@angular/material/dialog';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ViewEventComponent } from './view-event/view-event.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  animal!: string;
  name!: string;
  title = 'campus_meet';
  public user: SocialUser | undefined;
  public new_event: any = {
    dateTimeStart: "",
    dateTimeEnd: "",
    title: "Event test push",
    creator: "Charles",
    descritption:"Test event to push",
    attendees: '["Charles","Rosh","Kendal","Doui"]',
    coordinates: '["123W","456N"]',
    tags: '["test tag"]',
    groups: '["all"]',
    id:""
  }
  center: any;

  constructor(public dialog: MatDialog) {}

  // --------- Demo event list purposes only ---------
  public event_list:any; 
  // --------- Demo event list purposes only --------- 

  async recieveAuth($event:SocialUser | undefined){
    this.user = $event;
    console.log(this.user) // THIS IS THE AUTH OBJECT WITH ALL USER DATA
    this.event_list = await this.pullEvents(this.event_list)
    
  }

  async recieveEventList($event:any){
    this.event_list = await this.pullEvents(this.event_list)
  }


  async ngOnInit() {
    // pull events from db on page load
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
          this.center = {lat: lati, lng: long};
          event_list['documents'][i].coordinates = this.center;

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
    



  /*async createEvent() {

    // this.new_event is the form body. 

    // sends new event, the PULLs updated event list!!!!

    var formBody: any = [];
    for (var property in this.new_event) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(this.new_event[property]);
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

    fetch('http://127.0.0.1:3000/api/event',request) 

    console.log("Need to wait for db to write new event")
    setTimeout(()=>{},250);
    console.log("Done waiting, now pull!")

    this.event_list = await this.pullEvents(this.event_list) // pull updated list from db
    console.log(this.event_list)
  }*/
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      width: '40%',
      height: '70%',
      data: {new_event:this.new_event,user:this.user},
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      this.event_list = await this.pullEvents(this.event_list)
      this.new_event = result;
    });
  }

  checkSignin(){
    if (this.user){
      this.pullEvents(this.event_list);
    }
  }
    

}
