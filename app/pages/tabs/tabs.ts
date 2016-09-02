import {Page, NavParams} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';
import {AddPlayerPage} from '../addplayer/addplayer';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  tab5Root: any = AddPlayerPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
