import {Component, ViewChild} from '@angular/core';
import {App, Page, Modal, Alert, NavController, ItemSliding, List, Loading} from 'ionic-angular';
import {SocketIOService} from '../../providers/socket-io-service';
//import {Moment} from 'moment';
import * as moment from "moment";


//declare var io;

@Component({
    templateUrl: 'build/pages/cg-table/cg-table.html'
})
export class CgTablePage {
    // the list is a child of the schedule page
    // @ViewChild('scheduleList') gets a reference to the list
    // with the variable #scheduleList, `read: List` tells it to return
    // the List and not a reference to the element

    tableData = [];
    title = "Zeitbuchungen";
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

    loadWorktimeLogEntries() {
        let self = this;
        let loading = Loading.create({ content: "lade Zeitbuchungen..." });
        //this.nav.present(loading);
        self.title = 'lade...';

        this.socketIOService.getWorktimesLogEntries({manummer: 'JKR', days: 30}, function (entries) {
            
entries.map(function(entry){
   entry["startzeitString"] = moment(entry.startzeit).format();
});
            self.tableData = entries;

            //loading.dismiss();
            //this.app.setTitle('Players');
            self.title = self.tableData.length + " Zeitbuchungen";
        });
        //this.title = "Zeitbuchungen";
    }

    ngAfterViewInit() {
        //this.tableData = this.socketIOService.articles;

        // alert('joo');
        //this.updatePlayerlist();
    }

}
