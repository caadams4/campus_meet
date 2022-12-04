import { GoogleInitOptions } from '@abacritt/angularx-social-login';
import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() event_list: any[] = [];

  center: google.maps.LatLngLiteral = {lat: 39.679884456322554, lng: -75.75457476111104};
  zoom = 16;
  markerOptions: google.maps.MarkerOptions = { draggable: false,clickable:true};
  points: google.maps.LatLngLiteral[] = [{lat: 39.679884456322554, lng: -75.75457476111104}];
  
  svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  ngOnInit() {

  }


  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.center = (event.latLng.toJSON());
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.points.push(event.latLng.toJSON());
  }

  onRightClick($event:any) {
    console.log("right click")
  }











}