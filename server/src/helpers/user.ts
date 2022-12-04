import express from "express";
import axios, { AxiosRequestConfig } from "axios";

export class User_Obj {

    constructor( // Creates a user object prior to sending to database
        public username: string,
        public id: string,
        public interests: string[],
        public groups: string[]
    ) { }

    public build_edit_object(user_data: User_Obj) {

        // converts user data into object ready to send to database

        let update_data: any = {}

        for (let [key, val] of Object.entries(user_data)) {
            if (val != undefined) update_data[key] = val
        }
        return update_data;
    }
}

export class User {

    // -------- start axios http request config -------- 
    static baseURL: string = "https://data.mongodb-api.com/app/data-rfpjg/endpoint/data/v1";
    static apiKey: string = "M02kGEd6koeZfpaYhGgFNpK4sBPRRO2He3m2esFmyqoPedmP942gmnL0CE1drVuZ";
    static data: any = ({
        "collection": "users", // specify which part of our database we wish to interact with
        "database": "adv_web",
        "dataSource": "Cluster0"
    })
    static config: AxiosRequestConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': User.apiKey,
        },
        data: null
    };
    // -------- end axios http request config -------- 


    public getUser(req: express.Request, res: express.Response): void { //returns all records in the collection.

        User.config.url = User.baseURL + '/action/find'
        User.config.data = User.data

        axios(User.config).then(response => { res.send(response.data) }) // return response to client
            .catch(error => res.send(error));
    }


    public postUser(req: express.Request, res: express.Response): void { // creates a user and returns the object id to client

        User.config.url = User.baseURL + '/action/insertOne'; // insert one doc to db

        if (req.body.interests) { req.body.interests = JSON.parse(req.body.interests) };
        if (req.body.groups) { req.body.groups = JSON.parse(req.body.groups) };

        let user = new User_Obj(
            req.body.username,
            req.body.id,
            req.body.interests,
            req.body.groups,
        );

        const new_user_post = user.build_edit_object(user); // build an object to send to db

        console.log(new_user_post)

        User.config.data = { ...User.data, document: new_user_post }; // adds POST info to prep send package

        axios(User.config).then(result => res.send(result)) // return response to client
            .catch(err => res.send(err));

    }

    public updateUser(req: express.Request, res: express.Response): void { // updates user info in database

        User.config.url = User.baseURL + '/action/updateOne'; // insert one doc to db

        if (req.body.interests) { req.body.interests = JSON.parse(req.body.interests) };
        if (req.body.groups) { req.body.groups = JSON.parse(req.body.groups) };

        let user = new User_Obj(
            req.body.username,
            req.body.id,
            req.body.interests,
            req.body.groups,
        );

        let data_update = user.build_edit_object(user); // build an object to send to db

        let filter = { "_id": { "$oid": req.body.id } }; // query data based on object ID

        let update = { "$set": data_update }; // update fields that are sent in the put request

        User.config.data = { ...User.data, filter, update }; // adds data to prep send package

        axios(User.config).then(result => res.send(result)) // return response
            .catch(err => res.send(err));
    }

    public deleteUser(req: express.Request, res: express.Response): void {

        // deletes user. ONLY USED FOR TEST PURPOSES

        User.config.url = User.baseURL + '/action/deleteOne';

        let filter = { "_id": { "$oid": req.body.id } }

        User.config.data = { ...User.data, filter };

        axios(User.config).then(result => res.send(result))
            .catch(err => res.send(err))
    }

    public getOneUser(req: express.Request, res: express.Response): void { // find one user and return  object docuemnt to client

        User.config.url = User.baseURL + '/action/findOne';

         // query data based on object ID
        let filter = { 'id': req.body.id };

        

        User.config.data = { ...User.data, filter }; // adds POST info to prep send package
        
        console.log(User.config.data)
        
        axios(User.config).then(response => res.send(JSON.stringify(response.data))) // return response to client
            .catch(error => res.send(error));

    }

    public verifyUser(req: express.Request, res: express.Response): void { // creates a user and returns the object id to client
/*
        User.config.url = User.baseURL + '/action/insertOne'; // insert one doc to db

        if (req.body.interests) { req.body.interests = JSON.parse(req.body.interests) };
        if (req.body.groups) { req.body.groups = JSON.parse(req.body.groups) };

        let user = new User_Obj(
            req.body.username,
            req.body.id,
            req.body.interests,
            req.body.groups,
        );

        const new_user_post = user.build_edit_object(user); // build an object to send to db

        console.log(new_user_post)

        User.config.data = { ...User.data, document: new_user_post }; // adds POST info to prep send package

        axios(User.config).then(result => res.send(result)) // return response to client
            .catch(err => res.send(err));
*/
            console.log(req.body)
    }
}
