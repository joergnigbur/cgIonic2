import { Events, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
//import * as Rx from 'rxjs/Rx';
import { Article } from '../models/article';
import { Destination } from '../models/destination';
import * as io from 'socket.io-client';

//declare var io;

export class TimeEntry {
    public startzeit: Date;
    public endezeit: Date;
    public duration: Number;
    public action: String;
}

@Injectable()
export class SocketIOService {
    private socket: SocketIOClient.Socket;
    public articles: Article[] = new Array<Article>();
    private destinations: Destination[] = new Array<Destination>();
    private connected: boolean = false;

    constructor() {
        this.initSocket();
    }

    public initSocket() {
        let self = this;
        this.socket = io.connect('http:/xxx:81');

        this.socket.on("connect", () => {
            self.connected = true;
        });

        this.socket.on("disconnect", () => {
            //RECONNECT after 3000 ms
            setTimeout(function () { self.initSocket() }, 3000);
        });

        this.socket.on('article-to-client', function (articles) {
            console.log("article-to-client - " + articles.length);
            self.articles = <Article[]>articles;
        });

        this.socket.on('destinations-to-client', function (dests) {
            self.destinations = <Destination[]>dests;
        });
    }

    public getWorktimesLogEntries(filter, callback): void {

        let query: string = "SELECT Startzeit as startzeit, Endezeit AS endezeit, DATEDIFF(ss, Startzeit, Endezeit) * 1000 AS duration, LOWER(Action) as action";
        query += " FROM cg_WorkTimesLog ";
        query += " WHERE Startzeit > GETDATE() - " + filter.days ;
        query += " AND MANummer = '" + filter.manummer + "' ";
        query += " AND ISNULL(Action, '') <> '' ";
        query += " ORDER BY Startzeit ASC;";

        this.socket.emit("getData", query, function (items) {
            let result = [];
            items.map(function(item) {
                item.startzeit = item.startzeit.substring(0, 19);
                if(item.endezeit != null)
                item.endezeit = item.endezeit.substring(0, 19);
                result.push(item);
            });
            callback(result);
        });

        /*this.socket.emit("getWorktimesLog", filter, function (items) {
            let result = [];
            items.map(function(item) {
                item.startzeit = item.startzeit.substring(0, 19);
                if(item.endezeit != null)
                item.endezeit = item.endezeit.substring(0, 19);
                result.push(item);
            });
            callback(result);
        });*/
    }

    public getDestinations(): Destination[] {
        return this.destinations;
    }


    /*public loadArticle(): boolean {
        let self = this;
        if (this.connected) {
            this.socket.emit("article-to-client", "", );
            return true;
        }
        setTimeout(function () {
            self.loadArticle();

        }, 1000);
        alert("nicht verbunden !");
        return false;
    }*/
}
