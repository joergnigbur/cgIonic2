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
var socket_io_service_1 = require('../../providers/socket-io-service');
//import {Moment} from 'moment';
var moment = require("moment");
require('moment/locale/de');
var worktimes_day_1 = require('../worktimes-day/worktimes-day');
//declare var io;
var WorktimesPage = (function () {
    //PlayersPage = [];
    function WorktimesPage(app, nav, socketIOService) {
        this.app = app;
        this.nav = nav;
        this.socketIOService = socketIOService;
        // the list is a child of the schedule page
        // @ViewChild('scheduleList') gets a reference to the list
        // with the variable #scheduleList, `read: List` tells it to return
        // the List and not a reference to the element
        this.tableData = [];
        this.title = "Zeitbuchungen";
        this.event = {
            month: '1990-02-19',
            timeStarts: '07:43',
            timeEnds: '1990-02-20'
        };
    }
    WorktimesPage.prototype.showObject = function (obj) {
        var text = "";
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && typeof obj[prop] === "string")
                text += " - " + prop + ": " + obj[prop];
        }
        return text;
    };
    WorktimesPage.prototype.onPageDidEnter = function () {
        this.app.setTitle('Zeitbuchungen');
        this.loadWorktimeLogEntries();
    };
    WorktimesPage.prototype.showWorktimesDay = function (data) {
        this.nav.push(worktimes_day_1.WorktimesDayPage, data);
    };
    WorktimesPage.prototype.loadWorktimeLogEntries = function () {
        moment.locale("de");
        console.log("jappa");
        var self = this;
        var loading = ionic_angular_1.Loading.create({ content: "lade Zeitbuchungen..." });
        //this.nav.present(loading);
        self.title = 'lade...';
        this.socketIOService.getWorktimesLogEntries({ manummer: 'JKR', days: 30 }, function (entries) {
            var worktimeDays = [];
            entries.map(function (entry) {
                entry.startzeit = moment(entry.startzeit);
                entry.endezeit = moment(entry.endezeit);
                entry["durationInt"] = entry.duration;
                entry.duration = moment(entry.duration).utc();
                entry["date"] = moment(moment(entry.startzeit).format("YYYY-MM-DD"));
                if (!worktimeDays[entry["date"]])
                    worktimeDays[entry["date"]] = { date: entry["date"], totals: [], entries: [] };
                worktimeDays[entry["date"]].entries.push(entry);
            });
            var tempArray = [];
            for (var key in worktimeDays) {
                tempArray.push(worktimeDays[key]);
            }
            worktimeDays = tempArray;
            worktimeDays.map(function (worktimeDay) {
                worktimeDay.entries.map(function (entry) {
                    if (!worktimeDay.totals[entry.action])
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
    };
    WorktimesPage.prototype.ngAfterViewInit = function () {
        //this.tableData = this.socketIOService.articles;
        // alert('joo');
        //this.updatePlayerlist();
    };
    WorktimesPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/worktimes/worktimes.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.App, ionic_angular_1.NavController, socket_io_service_1.SocketIOService])
    ], WorktimesPage);
    return WorktimesPage;
}());
exports.WorktimesPage = WorktimesPage;
//# sourceMappingURL=worktimes.js.map