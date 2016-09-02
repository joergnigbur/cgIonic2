"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var conference_data_1 = require('./providers/conference-data');
var user_data_1 = require('./providers/user-data');
var gameplay_1 = require('./services/gameplay');
var player_data_1 = require('./providers/player-data');
var socket_io_service_1 = require('./providers/socket-io-service');
var account_1 = require('./pages/account/account');
var tabs_1 = require('./pages/tabs/tabs');
var login_1 = require('./pages/login/login');
var signup_1 = require('./pages/signup/signup');
var tutorial_1 = require('./pages/tutorial/tutorial');
var players_1 = require('./pages/players/players');
var cg_table_1 = require('./pages/cg-table/cg-table');
var worktimes_1 = require('./pages/worktimes/worktimes');
var ConferenceApp = (function () {
    function ConferenceApp(events, userData, menu, platform, confData) {
        var _this = this;
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.appPages = [
            { title: 'Worktimes', component: worktimes_1.WorktimesPage, icon: 'people' },
            { title: 'cgTable', component: cg_table_1.CgTablePage, icon: 'people' },
            { title: 'Players', component: players_1.PlayersPage, icon: 'people' },
            { title: 'Darts', component: tabs_1.TabsPage, index: 1, icon: 'darts' },
            { title: 'Tutorial', component: tutorial_1.TutorialPage, icon: 'tutorial' },
            { title: 'Schedule', component: tabs_1.TabsPage, icon: 'calendar' },
            { title: 'Speakers', component: tabs_1.TabsPage, index: 1, icon: 'contacts' },
            { title: 'Map', component: tabs_1.TabsPage, index: 2, icon: 'map' },
            { title: 'About', component: tabs_1.TabsPage, index: 3, icon: 'information-circle' },
        ];
        this.loggedInPages = [
            { title: 'Account', component: account_1.AccountPage, icon: 'person' },
            { title: 'Logout', component: tabs_1.TabsPage, icon: 'log-out' }
        ];
        this.loggedOutPages = [
            { title: 'Login', component: login_1.LoginPage, icon: 'log-in' },
            { title: 'Signup', component: signup_1.SignupPage, icon: 'person-add' }
        ];
        this.rootPage = worktimes_1.WorktimesPage;
        // Call any initial plugins when ready
        platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
        });
        //connectSocketIO();
        // load the conference data
        confData.load();
        // decide which menu items should be hidden by current login status stored in local storage
        this.userData.hasLoggedIn().then(function (hasLoggedIn) {
            _this.enableMenu(hasLoggedIn === 'true');
        });
        this.listenToLoginEvents();
    }
    ConferenceApp.prototype.openPage = function (page) {
        var _this = this;
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });
        }
        else {
            this.nav.setRoot(page.component);
        }
        if (page.title === 'Logout') {
            // Give the menu time to close before changing to logged out
            setTimeout(function () {
                _this.userData.logout();
            }, 1000);
        }
    };
    ConferenceApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:signup', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:logout', function () {
            _this.enableMenu(false);
        });
    };
    ConferenceApp.prototype.enableMenu = function (loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav), 
        __metadata('design:type', ionic_angular_1.Nav)
    ], ConferenceApp.prototype, "nav", void 0);
    ConferenceApp = __decorate([
        core_1.Component({
            templateUrl: 'build/app.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Events, user_data_1.UserData, ionic_angular_1.MenuController, ionic_angular_1.Platform, conference_data_1.ConferenceData])
    ], ConferenceApp);
    return ConferenceApp;
}());
ionic_angular_1.ionicBootstrap(ConferenceApp, [conference_data_1.ConferenceData, user_data_1.UserData, conference_data_1.ConferenceData, user_data_1.UserData, player_data_1.PlayerData, socket_io_service_1.SocketIOService, gameplay_1.Gameplay], {
    tabbarPlacement: 'bottom'
});
//# sourceMappingURL=app.js.map