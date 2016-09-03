import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Events, Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {Gameplay} from './services/gameplay';
import {PlayerData} from './providers/player-data';
import {SocketIOService} from './providers/socket-io-service';

import {AccountPage} from './pages/account/account';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {TutorialPage} from './pages/tutorial/tutorial';
import {PlayersPage} from './pages/players/players';
import {CgTablePage} from './pages/cg-table/cg-table';
import {WorktimesPage} from './pages/worktimes/worktimes';
import {WorktimesDayPage} from './pages/worktimes-day/worktimes-day';


interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
    templateUrl: 'build/app.html'
})

class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  serverState: any = {};

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Worktimes', component: WorktimesPage, icon: 'people' },
    { title: 'cgTable', component: CgTablePage, icon: 'people' },
    { title: 'Players', component: PlayersPage, icon: 'people' },
    { title: 'Darts', component: TabsPage, index: 1, icon: 'darts' },
    { title: 'Tutorial', component: TutorialPage, icon: 'tutorial' },
    { title: 'Schedule', component: TabsPage, icon: 'calendar' },
    { title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'Map', component: TabsPage, index: 2, icon: 'map' },
    { title: 'About', component: TabsPage, index: 3, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: TabsPage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any = WorktimesPage;

  constructor(
    private events: Events,
    private userData: UserData,
    private menu: MenuController,
    private socketService: SocketIOService,
    platform: Platform,
    confData: ConferenceData
  ) {
    var self = this;
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

    });

    //connectSocketIO();

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }



  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}

ionicBootstrap(ConferenceApp, [ConferenceData, UserData, ConferenceData, UserData, PlayerData, SocketIOService, Gameplay], {
   tabbarPlacement: 'bottom'
 });
