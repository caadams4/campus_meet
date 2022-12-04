import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";
import { waitForAsync } from '@angular/core/testing';
import { EventListService } from './event-list.service';
import { Event } from './interfaces/Event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campus_meet';
  public user: SocialUser | undefined;
  public new_event: any = {
    dateTimeStart: new Date().getTime()+100000,
    dateTimeEnd: new Date().getTime()+500000,
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

  constructor(public eventList:EventListService){}

  // --------- Demo event list purposes only ---------
  public event_list:any; 
  // --------- Demo event list purposes only --------- 

  recieveAuth($event:SocialUser | undefined){
    this.user = $event;
    console.log(this.user) // THIS IS THE AUTH OBJECT WITH ALL USER DATA
  }


  async ngOnInit() {
    // pull events from db on page load
    this.event_list = await this.pullEvents(this.event_list)
  }

  async pullEvents(event_list:any) {
      // Fetch the events when funciton is called.

  
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
          this.center = {lat: lati, lng: long}
          event_list['documents'][i].coordinates = this.center
          console.log(this.center)
        }
          
        console.log(event_list)

        return event_list['documents'];
      }

    }
    



  async createEvent() {

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
  }
  

}
