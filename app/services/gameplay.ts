import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {PlayerData, Player} from '../providers/player-data';


export class GamePlayer {

public player : Player;

    public currentPoints = 301;

    constructor(player: Player) {
        this.player = player;
    }
}

@Injectable()
export class Gameplay
{
    private players: Array<GamePlayer>;
    private startPoints: number;
    private currentPlayer: Player;



    constructor() {
        
    }

    public setPlayers(players: Array<GamePlayer>) {
        this.players = players;
    }
}