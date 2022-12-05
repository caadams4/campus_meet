import express, { json, query } from "express";
import axios, { AxiosRequestConfig } from "axios";

export class Event_Obj {
    constructor( // Creates a event object prior to sending to database
        public dateTimeStart: string, //(IN MILISECONDS) 
        public dateTimeEnd: number, //(IN MILISECONDS) 
        public title: string,
        public creator: string,//(this is the document id from mongo... NOT EMAIL or NOT USERNAME)
        public descritption: string,
        public attendees: string[], //(usernames)
        public coordinates: string[], //([lat,long])
        public tags: string[],
        public groups: string[],
        public id: string, //(empty string on creation, document id from mongo)
    ) {
    };

    public build_edit_object(event_data: Event_Obj) {

        // converts event data into object ready to send to database

        let update_data: any = {}

        for (let [key, val] of Object.entries(event_data)) {
            if (val != undefined) update_data[key] = val
        }
        return update_data;
    }
}

export class Event {

    // -------- start axios http request config -------- 
    static baseURL: string = "https://data.mongodb-api.com/app/data-rfpjg/endpoint/data/v1";
    static apiKey: string = "M02kGEd6koeZfpaYhGgFNpK4sBPRRO2He3m2esFmyqoPedmP942gmnL0CE1drVuZ";
    static data: any = ({
        "collection": "events",
        "database": "adv_web",
        "dataSource": "Cluster0"
    })
    static config: AxiosRequestConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': Event.apiKey,
        },
        data: null
    };
    // -------- end axios http request config -------- 

    public getEvent(req: express.Request, res: express.Response): void { // returns all records in the collection.

        Event.config.url = Event.baseURL + '/action/find'; // insert one doc to db

        let filter = { "dateTimeStart": { "$ne": "k" } } // query data based on tags from post
        Event.config.data = { ...Event.data, filter }

        axios(Event.config).then(response => { res.send(response.data) })// return response to client
            .catch(error => res.send(error));
    }

    public postEvent(req: express.Request, res: express.Response): void { // creates an event and returns the object id to client

        Event.config.url = Event.baseURL + '/action/insertOne'; // insert one doc to db

        let parsed_date = new Date(req.body.dateTimeStart); // date_to_mils(req.body.date)

        let data_2_update = new Event_Obj( // create new event object based on put request body parameters
            req.body.dateTimeStart,
            req.body.dateTimeEnd,
            req.body.title,
            req.body.creator,
            req.body.descritption,
            JSON.parse(req.body.attendees),
            JSON.parse(req.body.coordinates),
            JSON.parse(req.body.tags),
            JSON.parse(req.body.groups),
            req.body.id,
        );

        const new_event_post = data_2_update.build_edit_object(data_2_update); // build an object to send to db

        Event.config.data = { ...Event.data, document: new_event_post }; // adds info to prep send package

        console.log(req.body)

        axios(Event.config).then(response => { res.send(response.data) }) // return response to client
            .catch(error => res.send(error));
    }

    public updateEvent(req: express.Request, res: express.Response): void { // updates event info in database

        Event.config.url = Event.baseURL + '/action/updateOne'; // insert one doc

        if (req.body.attendees) req.body.attendees = JSON.parse(req.body.attendees);
        if (req.body.coordinates) req.body.coordinates = JSON.parse(req.body.coordinates);
        if (req.body.tags) req.body.tags = JSON.parse(req.body.tags);
        if (req.body.groups) (req.body.groups) = JSON.parse(req.body.groups)

        let data_2_update = new Event_Obj( // create new event object based on put request body parameters
            req.body.dateTimeStart,
            req.body.dateTimeEnd,
            req.body.title,
            req.body.creator,
            req.body.descritption,
            req.body.attendees,
            req.body.coordinates,
            req.body.tags,
            req.body.groups,
            req.body.id,

        );

        let data_update = data_2_update.build_edit_object(data_2_update); // build an object to send to db

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        let update = { "$set": data_update }; // update fields that are sent in the put request

        Event.config.data = { ...Event.data, filter, update }; // adds data to prep send package

        axios(Event.config).then(result => res.send(result)) // return response
            .catch(err => res.send(err));
    }

    public getFilteredEvent(req: express.Request, res: express.Response): void { // finds events based on filtered search

        Event.config.url = Event.baseURL + '/action/find';

        let filter = { "tags": { "$all": JSON.parse(req.body.filter) }, "dateTimeStart": { "$ne": "k" } };// query data based on tags from post
        // query events based on filtered list items and date/time of event

        Event.config.data = { ...Event.data, filter };

        axios(Event.config).then(response => { res.send(response.data) }) // return matched events to client
            .catch(error => res.send(error));
    }

    public getGroupEvent(req: express.Request, res: express.Response): void { // finds events based on group search

        Event.config.url = Event.baseURL + '/action/find';

        let filter = { "groups": { "$all": JSON.parse(req.body.groups) }, "dateTimeStart": { "$ne":"k" } };// query data based on tags from post
        // query events based on group list items and date/time of event

        Event.config.data = { ...Event.data, filter };

        axios(Event.config).then(response => { res.send(response.data) }) // return matched events to client
            .catch(error => res.send(error));
    }

    public pushEventAttendee(req: express.Request, res: express.Response): void { // add user to list of people attending

        Event.config.url = Event.baseURL + '/action/updateOne';

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        let update = { "$push": { "attendees":  req.body.attendees  }}; // update fields that are sent in the put request

        console.log(filter,update)

        Event.config.data = { ...Event.data, filter, update };

        axios(Event.config).then(result => res.send(result)) // return response
            .catch(err => res.send(err))
    }

    public pullEventAttendee(req: express.Request, res: express.Response): void { // remove user to list of people attending

        Event.config.url = Event.baseURL + '/action/updateOne';

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        let update = { "$pull": { "attendees":  req.body.attendees  }}; // update fields that are sent in the put request

        Event.config.data = { ...Event.data, filter, update };

        axios(Event.config).then(result => res.send(result)) // return response
            .catch(err => res.send(err));
    }

    public deleteEvent(req: express.Request, res: express.Response): void { // Deletes event, ONLY USE FOR TESTING

        Event.config.url = Event.baseURL + '/action/deleteOne';

        let filter = { "_id": { "$oid": req.body.id } }

        Event.config.data = { ...Event.data, filter };

        axios(Event.config).then(result => res.send(result))
            .catch(err => res.send(err))
    }

}
