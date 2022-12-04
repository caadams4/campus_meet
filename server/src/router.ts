import express from "express";
import { User } from "./helpers/user";
import { Event } from "./helpers/event";
import {Controller} from "./controller";
import {Group} from "./helpers/group"

export class ApiRouter {
    private router: express.Router = express.Router();
    private user: User = new User();
    private event: Event = new Event();
    private controller: Controller = new Controller();
    private group: Group = new Group();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.router.get("/user", this.user.getUser);
        this.router.post("/user/find", this.user.getOneUser); 
        this.router.post("/user", this.user.postUser);
        this.router.put("/user", this.user.updateUser);
        this.router.post("/user/remove", this.user.deleteUser);
        this.router.post("/user/verify", this.user.verifyUser);

        this.router.get("/event", this.event.getEvent);
        this.router.post("/event", this.event.postEvent);
        this.router.put("/event", this.event.updateEvent);
        this.router.post("/event/groups", this.event.getGroupEvent);
        this.router.post("/event/filter", this.event.getFilteredEvent);
        this.router.put("/event/addUser", this.event.pushEventAttendee);
        this.router.put("/event/removeUser", this.event.pullEventAttendee);
        this.router.post("/event/remove", this.event.deleteEvent);

        this.router.get("/group", this.group.getGroups);
        this.router.post("/group", this.group.postGroup);
        this.router.put("/group", this.group.updateGroup);
        this.router.put("/group/find", this.group.getOneGroup);
        this.router.put("/group/remove", this.group.deleteGroup); // dont delete any
        // TODO this.router.put("/group/search", this.group.getFilteredGroups);


        

        return this.router;
    }
} 
