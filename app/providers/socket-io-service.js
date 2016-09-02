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
var io = require('socket.io-client');
//declare var io;
var TimeEntry = (function () {
    function TimeEntry() {
    }
    return TimeEntry;
}());
exports.TimeEntry = TimeEntry;
var SocketIOService = (function () {
    function SocketIOService() {
        this.articles = new Array();
        this.destinations = new Array();
        this.connected = false;
        this.initSocket();
    }
    SocketIOService.prototype.initSocket = function () {
        var self = this;
        this.socket = io.connect('http://mobile.couplink.net:81');
        this.socket.on("connect", function () {
            self.connected = true;
        });
        this.socket.on("disconnect", function () {
            //RECONNECT after 3000 ms
            setTimeout(function () { self.initSocket(); }, 3000);
        });
        this.socket.on('article-to-client', function (articles) {
            console.log("article-to-client - " + articles.length);
            self.articles = articles;
        });
        this.socket.on('destinations-to-client', function (dests) {
            self.destinations = dests;
        });
    };
    SocketIOService.prototype.getWorktimesLogEntries = function (filter, callback) {
        var query = "SELECT Startzeit as startzeit, Endezeit AS endezeit, DATEDIFF(ss, Startzeit, Endezeit) * 1000 AS duration, LOWER(Action) as action";
        query += " FROM cg_WorkTimesLog ";
        query += " WHERE Startzeit > GETDATE() - " + filter.days;
        query += " AND MANummer = '" + filter.manummer + "' ";
        query += " AND ISNULL(Action, '') <> '' ";
        query += " ORDER BY Startzeit ASC;";
        this.socket.emit("getData", query, function (items) {
            var result = [];
            items.map(function (item) {
                item.startzeit = item.startzeit.substring(0, 19);
                if (item.endezeit != null)
                    item.endezeit = item.endezeit.substring(0, 19);
                result.push(item);
            });
            callback(result);
        });
        /*this.socket.emit("getWorktimesLog", filter, function (items) {
            let result = [];
            items.map(function(item) {
                item.startzeit = item.startzeit.substring(0, 19);
                if(item.endezeit != null)
                item.endezeit = item.endezeit.substring(0, 19);
                result.push(item);
            });
            callback(result);
        });*/
    };
    SocketIOService.prototype.getDestinations = function () {
        return this.destinations;
    };
    SocketIOService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketIOService);
    return SocketIOService;
}());
exports.SocketIOService = SocketIOService;
//# sourceMappingURL=socket-io-service.js.map