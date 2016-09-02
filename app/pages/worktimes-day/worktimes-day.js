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
require('moment/locale/de');
//declare var io;
var WorktimesDayPage = (function () {
    //PlayersPage = [];
    function WorktimesDayPage(app, nav, socketIOService, navParams) {
        this.app = app;
        this.nav = nav;
        this.socketIOService = socketIOService;
        this.navParams = navParams;
        this.tableData = [];
        this.title = "";
    }
    WorktimesDayPage.prototype.onPageDidEnter = function () {
        this.title = this.navParams.data.date.format("dddd DD.MM.YYYY") + "B";
        console.log(this.navParams + "_ää_");
        //this.loadWorktimeLogEntries();
    };
    WorktimesDayPage.prototype.ngAfterViewInit = function () {
        //this.tableData = this.socketIOService.articles;
        // alert('joo');
        //this.updatePlayerlist();
    };
    WorktimesDayPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/worktimes-day/worktimes-day.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.App, ionic_angular_1.NavController, socket_io_service_1.SocketIOService, ionic_angular_1.NavParams])
    ], WorktimesDayPage);
    return WorktimesDayPage;
}());
exports.WorktimesDayPage = WorktimesDayPage;
//# sourceMappingURL=worktimes-day.js.map