import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {
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

  center: google.maps.LatLngLiteral = {lat: 39.679884456322554, lng: -75.75457476111104};
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false,clickable:true};
  points: google.maps.LatLngLiteral[] = [{lat: 39.679884456322554, lng: -75.75457476111104}];

  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  async leaveEvent(event: any){
    event = this.data.event;
    console.log(this.data)
    var body_parameters: any = {
      'id': event._id, // NOTE THIS WILL BE THE DOCUMENT ID
      'attendees':this.data.user.firstName+this.data.user.lastName[0],
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

    this.data.event.id = false;

    console.log("Need to wait for db to write new event")
    setTimeout(()=>{},125);
    console.log("Done waiting, now pull!")
  }

  async selectEvent(event: any){
    event = this.data.event;
    console.log(this.data)
    var body_parameters: any = {
      'id': event._id, // NOTE THIS WILL BE THE DOCUMENT ID
      'attendees':this.data.user.firstName+this.data.user.lastName[0],
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

    this.data.event.id = true;

    console.log("Need to wait for db to write new event")
    setTimeout(()=>{},125);
    console.log("Done waiting, now pull!")
  }


  onSubmit(){
    console.log(this.dialogRef)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
