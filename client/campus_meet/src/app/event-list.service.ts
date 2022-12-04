import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import {Event} from './interfaces/Event'

@Injectable({
  providedIn: 'root'
})
export class EventListService {


  private eventList = new AsyncSubject()
  eventList_observable = this.eventList.asObservable();
  documents: Event[] = [];

  constructor() { }

  updateList(event_string:string) {
    this.eventList.next(event_string);
    console.log(this.eventList)
  }
  

}
