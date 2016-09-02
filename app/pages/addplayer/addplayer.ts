import {Component} from '@angular/core';
import {NavParams, ViewController, Toast, ToastOptions} from 'ionic-angular';
import {PlayerData, Player} from '../../providers/player-data';


@Component({
  templateUrl: 'build/pages/addplayer/addplayer.html'
})
export class AddPlayerPage {
    newPlayer: Player;
    
  
  constructor(
    
      private playerData: PlayerData,
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.newPlayer = new Player();
      /*this.toastOpts.message = "TEST";
      this.toastOpts.duration = 2000;
      this.playerData.getPlayers().then(players=>{

          Toast.create(this.toastOpts).emit();
              
      })
*/
           
    }

  addPlayer() {
    let self = this;
      this.playerData.addPlayer(this.newPlayer).then(result => {
          self.viewCtrl.dismiss(result);
      })

  }

  cancel() {
          this.viewCtrl.dismiss("canceled");
  }
  
}
