import express from "express";
import axios, { AxiosRequestConfig } from "axios";

export class Group_Obj {
    constructor( // Creates a group object prior to sending to database
        public name: string,
        public id: string,
        public users: string[]
    ) { }

    public build_edit_object(event_data: Group_Obj) {

        // converts group data into object ready to send to database

        let update_data: any = {};

        for (let [key, val] of Object.entries(event_data)) {
            if (val != undefined) update_data[key] = val
        };
        return update_data;
    }
}

export class Group {

    // -------- start axios http request config -------- 
    static baseURL: string = "https://data.mongodb-api.com/app/data-rfpjg/endpoint/data/v1";
    static apiKey: string = "M02kGEd6koeZfpaYhGgFNpK4sBPRRO2He3m2esFmyqoPedmP942gmnL0CE1drVuZ";
    static data: any = ({
        "collection": "groups",
        "database": "adv_web",
        "dataSource": "Cluster0"
    })
    static config: AxiosRequestConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': Group.apiKey,
        },
        data: null
    };
    // -------- end axios http request config -------- 

    public getGroups(req: express.Request, res: express.Response): void {//returns all records in the collection.
        Group.config.url = Group.baseURL + '/action/find';
        Group.config.data = Group.data;
        axios(Group.config).then(response => { res.send(response.data) })
            .catch(error => res.send(error));
    }

    public updateGroup(req: express.Request, res: express.Response): void { // updates group info in database

        Group.config.url = Group.baseURL + '/action/updateOne'; // insert one doc

        if (req.body.users) req.body.users = JSON.parse(req.body.users);

        let group = new Group_Obj(
            req.body.name,
            req.body.id,
            req.body.users,
        );

        let data_update = group.build_edit_object(group); // build an object to send to db

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        let update = { "$set": data_update }; // update fields that are sent in the put request

        Group.config.data = { ...Group.data, filter, update }; // adds data to prep send package

        axios(Group.config).then(response => { res.send(response.data) })// return response
            .catch(error => res.send(error));
    }


    public postGroup(req: express.Request, res: express.Response): void { // creates a group and returns the object id to client

        Group.config.url = Group.baseURL + '/action/insertOne'; // insert one doc

        if (req.body.users) { req.body.users = JSON.parse(req.body.users) };

        let group = new Group_Obj( // create new group object based on put request body parameters
            req.body.name,
            req.body.id,
            req.body.users,
        );

        let data_update = group.build_edit_object(group); // build an object to send to db

        Group.config.data = { ...Group.data, document: data_update }; // adds info to prep send package


        axios(Group.config).then(response => { res.send(response.data) }) // return response to client
            .catch(error => res.send(error));
    }

    public getOneGroup(req: express.Request, res: express.Response): void { // search for group based on id

        Group.config.url = Group.baseURL + '/action/findOne';

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        Group.config.data = { ...Group.data, filter }; // addsinfo to prep send package

        axios(Group.config).then(response => { res.send(response.data) }) // return response to client
            .catch(error => res.send(error));
    }

    public deleteGroup(req: express.Request, res: express.Response): void { // deletes group. ONLY USED FOR TESTING

        Group.config.url = Group.baseURL + '/action/deleteOne';

        let filter = { "_id": { "$oid": req.body.id } };

        Group.config.data = { ...Group.data, filter };

        axios(Group.config).then(response => { res.send(response.data) })
            .catch(error => res.send(error));
    }

}