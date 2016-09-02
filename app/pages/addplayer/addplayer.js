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
var AddPlayerPage = (function () {
    function AddPlayerPage(playerData, navParams, viewCtrl) {
        this.playerData = playerData;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.newPlayer = new player_data_1.Player();
        /*this.toastOpts.message = "TEST";
        this.toastOpts.duration = 2000;
        this.playerData.getPlayers().then(players=>{
  
            Toast.create(this.toastOpts).emit();
                
        })
  */
    }
    AddPlayerPage.prototype.addPlayer = function () {
        var self = this;
        this.playerData.addPlayer(this.newPlayer).then(function (result) {
            self.viewCtrl.dismiss(result);
        });
    };
    AddPlayerPage.prototype.cancel = function () {
        this.viewCtrl.dismiss("canceled");
    };
    AddPlayerPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/addplayer/addplayer.html'
        }), 
        __metadata('design:paramtypes', [player_data_1.PlayerData, ionic_angular_1.NavParams, ionic_angular_1.ViewController])
    ], AddPlayerPage);
    return AddPlayerPage;
}());
exports.AddPlayerPage = AddPlayerPage;
//# sourceMappingURL=addplayer.js.map