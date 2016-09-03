import {NavParams, Page, ViewController} from "ionic-angular";
import {SocketIOService} from "../../providers/socket-io-service";
import * as moment from 'moment';

@Page({
  templateUrl: 'build/pages/worktime-detail/worktime-detail.html'
})
export class WorktimeDetailPage {
  private worktimeEntry: any;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private socketService: SocketIOService) {
    this.worktimeEntry = {startzeit: moment().format(), endezeit:moment().format(), action:"work"};
    if(this.navParams.data["WorktimesLogId"]) {
      this.socketService.getWorktimeLogItem(this.navParams.data["WorktimesLogId"]).then(result => {

        this.worktimeEntry = result;

      });
    }

  }

  close() {

    this.viewCtrl.dismiss();

  }

  save() {

    this.socketService.saveWorktimeLogItem(this.worktimeEntry);

    this.viewCtrl.dismiss({action:'save', item: this.worktimeEntry});
  }
  delete(){

    this.socketService.deleteWorktimeLogItem(this.worktimeEntry);
    this.viewCtrl.dismiss({action : 'delete',  item: this.worktimeEntry});
  }

}
