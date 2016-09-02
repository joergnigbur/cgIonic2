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
var http_1 = require('@angular/http');
/*interface class Player {

    id: number;
    name: string;
    skill: string;
}*/
var Player = (function () {
    function Player() {
    }
    return Player;
}());
exports.Player = Player;
var Car = (function () {
    function Car() {
    }
    return Car;
}());
exports.Car = Car;
var PlayerData = (function () {
    function PlayerData(http) {
        this.http = http;
        if (window.parent && window.parent["ripple"])
            this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        else
            this.storage = new ionic_angular_1.Storage(ionic_angular_1.SqlStorage);
        this.players = null;
        this.storage.query("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY, name TEXT, skill TEXT )");
    }
    PlayerData.prototype.getPlayers = function () {
        var _this = this;
        if (this.players !== null) {
            // already loaded data
            return Promise.resolve(this.players);
        }
        var self = this;
        return new Promise(function (resolve) {
            _this.storage.query("SELECT * FROM players").then(function (data) {
                self.players = [];
                for (var i = 0; i < data.res.rows.length; i++) {
                    self.players.push(self.createObj(Player, data.res.rows[i]));
                }
                resolve(self.players);
            });
        });
    };
    PlayerData.prototype.removePlayer = function (player) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve) {
            _this.storage.query("DELETE FROM players WHERE ID = ?", [player.id]).then(function (data) {
                var index = self.players.indexOf(player);
                if (index != -1)
                    self.players.splice(index, 1);
                resolve(data);
            });
        });
    };
    PlayerData.prototype.createObj = function (t, sourceObj) {
        var obj = new t();
        for (var propertyName in sourceObj)
            if (sourceObj.hasOwnProperty(propertyName))
                obj[propertyName] = sourceObj[propertyName];
        return obj;
    };
    PlayerData.prototype.addPlayer = function (player) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve) {
            _this.storage.query("INSERT INTO players (name, skill) VALUES (?, ?)", [player.name, player.skill]).then(function (data) {
                self.players.push(player);
                resolve(player);
            });
        });
    };
    PlayerData = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerData);
    return PlayerData;
}());
exports.PlayerData = PlayerData;
//# sourceMappingURL=player-data.js.map