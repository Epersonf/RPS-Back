import { User } from "./Player/Inherited/User.js";
import { Bot } from "./Player/Inherited/Bot.js";
import { clamp } from "../Utility/util.js";

export class Room {
    constructor(id, game, maxAmountOfPlayers=4, name="Room", password, playerName="Player") {
        this.name = name;
        this.password = password;
        this.id = id;
        this.game = game;

        this.players = [];

        let user = new User(playerName);
        this.owner = user;
        this.players.push(user);

        for (let i = 0; i < maxAmountOfPlayers - 1; i++)
            this.players.push(new Bot());

        this.amountOfPlayers = 1;
        this.maxAmountOfPlayers = clamp(maxAmountOfPlayers, 2, 4);
    }

    canJoin() {
        for (let i in this.players) {
            if (this.players[i] instanceof Bot)
                return i;
        }
        return false;
    }

    addPlayer(name) {
        let index = this.canJoin();
        if (!index) return false;
        this.players.splice(index, 1);
        let user = new User(name);
        this.players.push(user);
        this.amountOfPlayers++;
        return user;
    }

    removePlayer(id) {
        
    }
    
    update() {
        this.players.forEach(e => e.update());
    }

    json() {
        return {
            'id': this.id,
            'name': this.name,
            'amount_of_players': this.amountOfPlayers,
            'max_amount_of_players': this.maxAmountOfPlayers,
            'has_password': (this.password != '')
        };
    }

    gameJson(token) {
        return this.players.map((e) => this.players[i].json(token == this.players[i].token));
    }
}