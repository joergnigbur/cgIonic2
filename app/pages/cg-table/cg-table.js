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
//declare var io;
var CgTablePage = (function () {
    //PlayersPage = [];
    function CgTablePage(app, nav, socketIOService) {
        this.app = app;
        this.nav = nav;
        this.socketIOService = socketIOService;
        // the list is a child of the schedule page
        // @ViewChild('scheduleList') gets a reference to the list
        // with the variable #scheduleList, `read: List` tells it to return
        // the List and not a reference to the element
        this.tableData = [];
        this.title = "Zeitbuchungen";
    }
    CgTablePage.prototype.showObject = function (obj) {
        var text = "";
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && typeof obj[prop] === "string")
                text += " - " + prop + ": " + obj[prop];
        }
        return text;
    };
    CgTablePage.prototype.onPageDidEnter = function () {
        this.app.setTitle('Zeitbuchungen');
        this.loadWorktimeLogEntries();
    };
    CgTablePage.prototype.loadWorktimeLogEntries = function () {
        var self = this;
        var loading = ionic_angular_1.Loading.create({ content: "lade Zeitbuchungen..." });
        //this.nav.present(loading);
        self.title = 'lade...';
        this.socketIOService.getWorktimesLogEntries({ manummer: 'JKR', days: 30 }, function (entries) {
            entries.map(function (entry) {
                entry["startzeitString"] = moment(entry.startzeit).format();
            });
            self.tableData = entries;
            //loading.dismiss();
            //this.app.setTitle('Players');
            self.title = self.tableData.length + " Zeitbuchungen";
        });
        //this.title = "Zeitbuchungen";
    };
    CgTablePage.prototype.ngAfterViewInit = function () {
        //this.tableData = this.socketIOService.articles;
        // alert('joo');
        //this.updatePlayerlist();
    };
    CgTablePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/cg-table/cg-table.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.App, ionic_angular_1.NavController, socket_io_service_1.SocketIOService])
    ], CgTablePage);
    return CgTablePage;
}());
exports.CgTablePage = CgTablePage;
//# sourceMappingURL=cg-table.js.map