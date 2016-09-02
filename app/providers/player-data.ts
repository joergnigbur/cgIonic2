import {Injectable} from '@angular/core';
import {Storage, SqlStorage, LocalStorage, Events } from 'ionic-angular';
import {Http} from '@angular/http';


/*interface class Player {

    id: number;
    name: string;
    skill: string;
}*/
export class Player {

    id: number;
    name: string;
    skill: string;

    constructor() {

    }
}




export class Car {
    F_NR: String;
    KENZ: String;
    MAGruppeID: String;
}


@Injectable()
export class PlayerData {
    players: Player[];

    storage: Storage;

    constructor(private http: Http) {
        if (window.parent && window.parent["ripple"])
            this.storage = new Storage(LocalStorage);
        else
            this.storage = new Storage(SqlStorage);
        this.players = null;
        this.storage.query("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY, name TEXT, skill TEXT )");

    }

    getPlayers() {
        if (this.players !== null) {
            // already loaded data
            return Promise.resolve(this.players);
        }
        var self = this;
        return new Promise(resolve => {
            this.storage.query("SELECT * FROM players").then((data) => {
                self.players = [];
                for (var i = 0; i < data.res.rows.length; i++) {
                    self.players.push(self.createObj(Player, data.res.rows[i]));
                }
                resolve(self.players);
            });
        });
    }

    removePlayer(player: Player) {
        let self = this;
        return new Promise(resolve => {
            this.storage.query("DELETE FROM players WHERE ID = ?", [player.id]).then((data) => {
                var index = self.players.indexOf(player);
                if (index != -1)
                    self.players.splice(index, 1);
                resolve(data);
            });
        });
    }

    createObj(t: typeof Player, sourceObj: any) {
        var obj = new t();
        for (var propertyName in sourceObj)
            if (sourceObj.hasOwnProperty(propertyName))
                obj[propertyName] = sourceObj[propertyName];
        return obj;
    }






    addPlayer(player) {
        let self = this;
        return new Promise(resolve => {
            this.storage.query("INSERT INTO players (name, skill) VALUES (?, ?)", [player.name, player.skill]).then((data) => {
                self.players.push(player);
                resolve(player);
            });
        });
    }


}
