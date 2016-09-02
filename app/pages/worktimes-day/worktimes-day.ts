import {Component, ViewChild} from '@angular/core';
import {App, Page, Modal, Alert, NavController, ItemSliding, List, Loading, NavParams} from 'ionic-angular';
import {SocketIOService} from '../../providers/socket-io-service';
//import {Moment} from 'moment';
import * as moment from "moment";
import 'moment/locale/de';


//declare var io;

@Component({
  templateUrl: 'build/pages/worktimes-day/worktimes-day.html'
})
export class WorktimesDayPage {
  tableData = [];
  title = "";


  //PlayersPage = [];

  constructor(private app: App,
              private nav: NavController,
              private socketIOService: SocketIOService,
              private navParams: NavParams) {

  }

  onPageDidEnter() {
    this.title = this.navParams.data.date.format("dddd DD.MM.YYYY");

    console.log(this.navParams);
    //this.loadWorktimeLogEntries();


  }



  ngAfterViewInit() {
    //this.tableData = this.socketIOService.articles;

    // alert('joo');
    //this.updatePlayerlist();
  }

}
