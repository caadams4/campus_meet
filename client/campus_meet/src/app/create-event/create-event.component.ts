import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CreateEventComponent {

  center: google.maps.LatLngLiteral = {lat: 39.679884456322554, lng: -75.75457476111104};
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false,clickable:true};
  points: google.maps.LatLngLiteral[] = [{lat: 39.679884456322554, lng: -75.75457476111104}];
  hour: number = 0;
  minute: number = 0;
  ampm: string = '';
  y = google.maps.InfoWindow
  event_coordinates: google.maps.LatLngLiteral[]= []

  svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };


  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onSubmit(){
    console.log(this.dialogRef)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  displayInfo(markerPosition:any) {
    console.log(markerPosition)
  }


  sendEvent(event:any) {
    console.log(event)
    console.log(this.hour,this.minute,this.ampm)

    let event_date = new Date(event.date);
    let test = event_date.toString().slice(0,16)  

    let minute = this.minute.toString();

    if (this.minute == 0) {
      minute = "00"
    }

    test += "@ " + this.hour + ":" + minute + " " + this.ampm;

    console.log(test)

    let coords = [this.event_coordinates[0]['lat'],this.event_coordinates[0]['lng']]

    
    console.log(event.descritption)
    let new_event:any = {
      dateTimeStart: test,
      dateTimeEnd: test,
      title: event.title,
      creator: this.data.user.firstName+this.data.user.lastName[0],
      descritption: event.descritption,
      attendees: JSON.stringify([this.data.user.firstName+this.data.user.lastName[0]]),
      coordinates: JSON.stringify(coords),
      tags: '[]',
      groups: '[]',
      id:""
    }
    console.log(new_event)


      var formBody: any = [];
      for (var property in new_event) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(new_event[property]);
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
      this.dialogRef.close();
    }

  addMarker(event:google.maps.MapMouseEvent) {
    if (event.latLng) this.event_coordinates[0] = event.latLng.toJSON()
    console.log(this.event_coordinates[0])
  }


}
