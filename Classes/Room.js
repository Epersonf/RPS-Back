import { User } from "./Player/Inherited/User.js";
import { clamp } from "../Utility/util.js";

export class Room {
    constructor(id, game, maxAmountOfPlayers=4, name="Room", password) {
        this.name = name;
        this.password = password;
        this.id = id;
        this.game = game;
        this.players = [];
        this.amountOfPlayers = 0;
        this.maxAmountOfPlayers = clamp(maxAmountOfPlayers, 2, 4);
    }

    addPlayer() {
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