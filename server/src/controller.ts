import express from "express";
import axios, { AxiosRequestConfig } from "axios";

export class Controller {
    static baseURL:string="https://data.mongodb-api.com/app/data-rfpjg/endpoint/data/v1";
    static apiKey:string="M02kGEd6koeZfpaYhGgFNpK4sBPRRO2He3m2esFmyqoPedmP942gmnL0CE1drVuZ";
    static data:any =({
        "collection": "0xdea110c8",
        "database": "adv_web",
        "dataSource": "Cluster0"
    })
    static config:AxiosRequestConfig = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': Controller.apiKey,
        },
        data:null
    };

    //returns all records in the collection.
    public getHello(req: express.Request, res: express.Response): void {
        Controller.config.url=Controller.baseURL+'/action/find'
        Controller.config.data=Controller.data
        axios(Controller.config)
            .then(response=>res.send(JSON.stringify(response.data)))
            .catch(error=>res.send(error));  
    }

    //inserts the body of the request into the database
    public postHello(req: express.Request, res: express.Response): void {
        Controller.config.url=Controller.baseURL+'/action/insertOne';
        Controller.config.data={...Controller.data,document:req.body};
        axios(Controller.config).then(result=>res.send(result))
        .catch(err=>res.send(err))
    }

}