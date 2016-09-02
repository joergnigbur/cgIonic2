import {Component, ViewChild} from '@angular/core';
import {App, Page, Modal, Alert, NavController, ItemSliding, List} from 'ionic-angular';
import {PlayerData, Car} from '../../providers/player-data';
import {AddPlayerPage} from '../addplayer/addplayer';
import * as sock from 'socket.io-client';
import {GamePage} from "../game/game";
import {Gameplay, GamePlayer} from '../../services/gameplay';

//declare var io;

@Component({
    templateUrl: 'build/pages/players/players.html'
})
export class PlayersPage {
    // the list is a child of the schedule page
    // @ViewChild('scheduleList') gets a reference to the list
    // with the variable #scheduleList, `read: List` tells it to return
    // the List and not a reference to the element
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks = [];
    shownPlayers = [];
    groups = [];
    title = "Players";
    //PlayersPage = [];

    constructor(
        private app: App,
        private nav: NavController,
        private playerData: PlayerData,
        private gameplay: Gameplay

    ) {
    }

    onPageDidEnter() {
        this.app.setTitle('Players');
    }

    ngAfterViewInit() {
       // alert('joo');
        this.updatePlayerlist();
    }

    updatePlayerlist() {
        // Close any open sliding items when the schedule updates
        //this.playersList && this.playersList.closeSlidingItems();

        this.playerData.getPlayers().then(palyers => {
            this.shownPlayers = palyers;
        });
    }

    startGame() {
        let gameplayers : Array<GamePlayer> = [];
        this.shownPlayers.forEach(p => gameplayers.push(new GamePlayer(p)));
        this.gameplay.setPlayers(gameplayers);
        this.nav.push(GamePage);
    }

    addPlayer() {
        let modal = Modal.create(AddPlayerPage);
        this.nav.present(modal);

        modal.onDismiss((data: any[]) => {
                this.updatePlayerlist();
        });
    }

    removePlayer(slidingItem: ItemSliding, player) {
        let self = this;
        let alert = Alert.create({
            title: "drop player!",
            message: 'Would you like to remove player '+ player.name + '?',
            buttons: [
            {
                text: 'Cancel',
                handler: () => {
                // they clicked the cancel button, do not remove the session
                // close the sliding item and hide the option buttons
                slidingItem.close();
              }
            },
            {
              text: 'Remove',
              handler: () => {
                // they want to remove this session from their favorites

                this.playerData.removePlayer(player).then(result =>{
                    this.updatePlayerlist();
                });

                // close the sliding item and hide the option buttons
                slidingItem.close();
              }
            }
          ]
        });
        // now present the alert on top of all other content
        this.nav.present(alert);
      }
    }
