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
var player_data_1 = require('../../providers/player-data');
var addplayer_1 = require('../addplayer/addplayer');
var game_1 = require("../game/game");
var gameplay_1 = require('../../services/gameplay');
//declare var io;
var PlayersPage = (function () {
    //PlayersPage = [];
    function PlayersPage(app, nav, playerData, gameplay) {
        this.app = app;
        this.nav = nav;
        this.playerData = playerData;
        this.gameplay = gameplay;
        // the list is a child of the schedule page
        // @ViewChild('scheduleList') gets a reference to the list
        // with the variable #scheduleList, `read: List` tells it to return
        // the List and not a reference to the element
        this.dayIndex = 0;
        this.queryText = '';
        this.segment = 'all';
        this.excludeTracks = [];
        this.shownPlayers = [];
        this.groups = [];
        this.title = "Players";
    }
    PlayersPage.prototype.onPageDidEnter = function () {
        this.app.setTitle('Players');
    };
    PlayersPage.prototype.ngAfterViewInit = function () {
        // alert('joo');
        this.updatePlayerlist();
    };
    PlayersPage.prototype.updatePlayerlist = function () {
        // Close any open sliding items when the schedule updates
        //this.playersList && this.playersList.closeSlidingItems();
        var _this = this;
        this.playerData.getPlayers().then(function (palyers) {
            _this.shownPlayers = palyers;
        });
    };
    PlayersPage.prototype.startGame = function () {
        var gameplayers = [];
        this.shownPlayers.forEach(function (p) { return gameplayers.push(new gameplay_1.GamePlayer(p)); });
        this.gameplay.setPlayers(gameplayers);
        this.nav.push(game_1.GamePage);
    };
    PlayersPage.prototype.addPlayer = function () {
        var _this = this;
        var modal = ionic_angular_1.Modal.create(addplayer_1.AddPlayerPage);
        this.nav.present(modal);
        modal.onDismiss(function (data) {
            _this.updatePlayerlist();
        });
    };
    PlayersPage.prototype.removePlayer = function (slidingItem, player) {
        var _this = this;
        var self = this;
        var alert = ionic_angular_1.Alert.create({
            title: "drop player!",
            message: 'Would you like to remove player ' + player.name + '?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        // they clicked the cancel button, do not remove the session
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                },
                {
                    text: 'Remove',
                    handler: function () {
                        // they want to remove this session from their favorites
                        _this.playerData.removePlayer(player).then(function (result) {
                            _this.updatePlayerlist();
                        });
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        this.nav.present(alert);
    };
    PlayersPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/players/players.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.App, ionic_angular_1.NavController, player_data_1.PlayerData, gameplay_1.Gameplay])
    ], PlayersPage);
    return PlayersPage;
}());
exports.PlayersPage = PlayersPage;
//# sourceMappingURL=players.js.map