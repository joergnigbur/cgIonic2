import {Component} from "@angular/core";
import {NavController, ModalController, NavParams} from "ionic-angular";
import {WorktimeDetailPage} from "../../pages/worktime-detail/worktime-detail";
import * as moment from "moment";
import "moment/locale/de";

@Component({
  templateUrl: 'build/pages/worktimes-day/worktimes-day.html'
})
export class WorktimesDayPage {
  tableData = [];
  title = "";

  constructor(private nav: NavController,
              private navParams: NavParams,
              private modalCtrl: ModalController) {

  }


  onPageDidEnter() {
    this.title = this.navParams.data.date.format("dddd DD.MM.YYYY");
    console.log(this.navParams);
  }

  showDetail(worktime: any) {
    var self = this;

    let modal = this.modalCtrl.create(WorktimeDetailPage, {WorktimesLogId: worktime.WorktimesLogId});
    modal.present();
    modal.onDidDismiss(wEntry=> {
      var exEntry = self.navParams.data.entries.filter(entry => {
        return entry.WorktimesLogId == wEntry.item.WorktimesLogId;
      })[0];

      if(wEntry.action == "save") {
        exEntry.startzeit = moment(wEntry.item.startzeit).utc();
        exEntry.endezeit = moment(wEntry.item.endezeit).utc();
      }else{

        delete exEntry;

      }
      self.nav.setRoot(WorktimesDayPage, self.navParams.data);
    })
  }


  ngAfterViewInit() {

  }

}
