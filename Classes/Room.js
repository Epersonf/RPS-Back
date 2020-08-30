import { User } from "./Player/Inherited/User.js";
import { Bot } from "./Player/Inherited/Bot.js";
import { clamp } from "../Utility/util.js";

export class Room {
    constructor(id, game, maxAmountOfPlayers=4, name="Room", password) {
        this.name = name;
        this.password = password;
        this.id = id;
        this.game = game;

        this.players = [];
        let user = new User();
        this.players.push(user);
        for (let i = 0; i < maxAmountOfPlayers - 1; i++)
            this.players.push(new Bot());

        this.amountOfPlayers = 0;
        this.maxAmountOfPlayers = clamp(maxAmountOfPlayers, 2, 4);
    }

    canJoin() {
        for (let i in this.players) {
            if (this.players[i] instanceof Bot)
                return i;
        }
        return false;
    }

    addPlayer() {
        let index = this.canJoin();
        if (!index) return false;
        this.players.splice(index, 1);
        this.players.push(new User());
    }

    removePlayer(id) {
        
    }

    update() {

    }

    json() {
        return {
            'id': this.id,
            'name': this.name,
            'amount_of_players': this.amountOfPlayers,
            'max_amount_of_players': this.maxAmountOfPlayers
        };
    }
}