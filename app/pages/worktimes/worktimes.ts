import {Component, ViewChild} from '@angular/core';
import {App, Page, Modal, Alert, NavController, ItemSliding, List, Loading} from 'ionic-angular';
import {SocketIOService} from '../../providers/socket-io-service';
//import {Moment} from 'moment';
import * as moment from "moment";
import 'moment/locale/de';
import {WorktimesDayPage} from '../worktimes-day/worktimes-day';


//declare var io;

@Component({
    templateUrl: 'build/pages/worktimes/worktimes.html'
})
export class WorktimesPage {
    // the list is a child of the schedule page
    // @ViewChild('scheduleList') gets a reference to the list
    // with the variable #scheduleList, `read: List` tells it to return
    // the List and not a reference to the element

    tableData = [];
    title = "Zeitbuchungen";

     public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

    //PlayersPage = [];

    constructor(
        private app: App,
        private nav: NavController,
        private socketIOService: SocketIOService

    ) {

    }

    showObject(obj: any): string {
        let text: string = "";
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && typeof obj[prop] === "string")
                text += " - " + prop + ": " + obj[prop];
        }
        return text;
    }

    onPageDidEnter() {
        this.app.setTitle('Zeitbuchungen');
        this.loadWorktimeLogEntries();
    }

    showWorktimesDay(data){

        this.nav.push(WorktimesDayPage, data);
    }

    loadWorktimeLogEntries() {
        moment.locale("de");
        console.log("jappa");
        let self = this;
        let loading = Loading.create({ content: "lade Zeitbuchungen..." });
        //this.nav.present(loading);
        self.title = 'lade...';

        this.socketIOService.getWorktimesLogEntries({manummer: 'JKR', days: 30}, function (entries) {

            var worktimeDays = [];

            entries.map(function(entry){
                entry.startzeit = moment(entry.startzeit);
                entry.endezeit = moment(entry.endezeit);
                entry["durationInt"] = entry.duration;
                entry.duration = moment(entry.duration).utc();
                entry["date"] = moment(moment(entry.startzeit).format("YYYY-MM-DD"));
                if(!worktimeDays[entry["date"]])
                    worktimeDays[entry["date"]] = {date: entry["date"], totals:[], entries: []};
                worktimeDays[entry["date"]].entries.push(entry);
            });

            var tempArray = [];
            for(var key in worktimeDays)
            {
                tempArray.push(worktimeDays[key]);
            }
            worktimeDays = tempArray;

            worktimeDays.map(function (worktimeDay){
                worktimeDay.entries.map(function(entry){
                    if(!worktimeDay.totals[entry.action])
                        worktimeDay.totals[entry.action] = moment(0).utc();
                    worktimeDay.totals[entry.action].add(entry.durationInt / 1000, "s");
                });
            });

            /*worktimeDays = worktimeDays.sort(function(itemA, itemB){
                return itemA.date > itemB.date;
            });*/

            self.tableData = worktimeDays;
            console.log(worktimeDays[0].totals.work);
            console.log(worktimeDays[0].totals.work);
            //self.title = self.tableData.length + " Zeitbuchungen";
        });
        //this.title = "Zeitbuchungen";
    }

            ngAfterViewInit() {
        //this.tableData = this.socketIOService.articles;

        // alert('joo');
        //this.updatePlayerlist();
    }

}
