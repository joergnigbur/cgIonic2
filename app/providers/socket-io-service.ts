import {Injectable} from "@angular/core";
import {Article} from "../models/article";
import {Destination} from "../models/destination";
import * as io from "socket.io-client";
import * as moment from "moment";
//import * as Rx from 'rxjs/Rx';

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
  private syc = window["syc"];

  constructor() {

    var self = this;
    this.initSocket();

  }


  public watchSync(listName, callBack) {
    var list;
    var self = this;

    this.initSocket().then(() => {
      list = self.syc.list(listName);

      self.syc.watch_recursive(list, function (changes) {

        callBack(changes);

      });
    })
  }

  private initSocket(): Promise<any> {
    let self = this;
    //this.socket = io.connect('http://mobile.couplink.net:2445');
    return new Promise<any>(resolve => {

      if (!self.socket) {

        self.socket = io.connect('http://localhost:3000');

        self.socket.on("connect", () => {
          self.connected = true;
          self.syc.connect(self.socket);

        });

        self.socket.on("disconnect", () => {
          //RECONNECT after 3000 ms
          setTimeout(function () {
            self.initSocket()
          }, 3000);
        });

        self.socket.on('article-to-client', function (articles) {
          console.log("article-to-client - " + articles.length);
          self.articles = <Article[]>articles;
        });

        self.socket.on('destinations-to-client', function (dests) {
          self.destinations = <Destination[]>dests;
        });
      }

      self.syc.loaded(function () {

        resolve();

      })

    })

  }

  public getWorktimesLogEntries(filter, callback): void {

    let query: string = "SELECT Startzeit as startzeit, Endezeit AS endezeit, DATEDIFF(ss, Startzeit, Endezeit) * 1000 AS duration, LOWER(Action) as action, WorktimesLogId ";
    query += " FROM cg_WorkTimesLog ";
    query += " WHERE Startzeit > GETDATE() - " + filter.days;
    query += " AND MANummer = '" + filter.manummer + "' ";
    query += " AND ISNULL(Action, '') <> '' ";
    query += " ORDER BY Startzeit ASC;";

    this.socket.emit("getData", query, function (items) {
      let result = [];
      items.map(function (item) {
        item.startzeit = item.startzeit.substring(0, 19);
        if (item.endezeit != null)
          item.endezeit = item.endezeit.substring(0, 19);
        result.push(item);
      });
      callback(result);
    });
  }

  public deleteWorktimeLogItem(wlItem: any): Promise<void> {
    let query = "DELETE FROM cg_WorktimesLog WHERE WorktimesLogId =  '" + wlItem.WorktimesLogId + "'";


    return new Promise<void>(resolve => {

        this.socket.emit("getData", query, function () {
          resolve();
        })
      }
    )
  }


  public saveWorktimeLogItem(wlItem: any): Promise<void> {
    let query = "";
    if (wlItem.WorktimesLogId)
      query = "UPDATE cg_WorktimesLog SET Startzeit = '" + wlItem.startzeit + "', Endezeit='" + wlItem.endezeit + "', Action = '" + wlItem.action + "' WHERE WorktimesLogId = '" + wlItem.WorktimesLogId + "'";
    else
      query = "INSERT INTO cg_WorktimesLog (Startzeit, Endezeit, Manummer, SerNr, Action) VALUES ('" + moment(wlItem.startzeit).format("YYYY-MM-DDTHH:mm:ss") + "', '" + moment(wlItem.endezeit).format("YYYY-MM-DDTHH:mm:ss") + "', '" + wlItem.Manummer + "', '', '" + wlItem.action + "')";


    return new Promise<void>(resolve => {

        this.socket.emit("getData", query, function () {
          resolve();
        })
      }
    )

  }


  public getWorktimeLogItem(id: string): Promise<any> {

    let query: string = "SELECT Manummer, Startzeit as startzeit, Endezeit AS endezeit, DATEDIFF(ss, Startzeit, Endezeit) * 1000 AS duration, LOWER(Action) as action, WorktimesLogId ";
    query += " FROM cg_WorkTimesLog ";
    query += " WHERE WorktimesLogId = '" + id + "'";
    return new Promise<any>(resolve => {


      this.socket.emit("getData", query, function (items) {
        let result = items[0];
        resolve(result);


      });

    })

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
