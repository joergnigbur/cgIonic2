import {Component, ViewChild} from '@angular/core';
import {App, Page, Modal, Alert, NavController, ItemSliding, List} from 'ionic-angular';
import {Gameplay} from '../../services/gameplay';


//declare var io;

@Component({
    templateUrl: 'build/pages/game/game.html'
})
export class GamePage {

    private pageTitle: string;

    constructor(
        private app: App,
        private nav: NavController,
        private gameplay: Gameplay

    ) {
    }

    onPageDidEnter() {
        this.app.setTitle('The GAME');
    }

    ngAfterViewInit() {
    }

}
