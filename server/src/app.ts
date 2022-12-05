import express from "express";
import {ApiRouter} from "./router";

const PORT = process.env.PORT || 3000;

class Application {
    public app: express.Application;


    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.initCors();
    }

    // Starts the server on the port specified in the environment or on port 3000 if none specified.
    public start(): void {
        this.buildRoutes();
        this.app.listen(PORT, () => console.log("Server listening on port " + PORT + "!"));
    }

    // sets up to allow cross-origin support from any host.  You can change the options to limit who can access the api.
    // This is not a good security measure as it can easily be bypassed,
    // but should be setup correctly anyway.  Without this, angular would not be able to access the api it it is on
    // another server.
    public initCors(): void {
        this.app.use(function(req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }

    // setup routes for the express server
    public buildRoutes(): void {
        this.app.use("/api", new ApiRouter().getRouter());
    }
}

new Application().start();


/*


client id : 779337780363-lc749jm8b2hrs3pelp5kr2dnn86k0abi.apps.googleusercontent.com

Client secret : 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






*/