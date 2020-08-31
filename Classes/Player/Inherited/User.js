import { Player } from "../Player.js";

export class User extends Player {
    constructor(name="Player", room, id) {
        super(name, room, id);
        this.afkCount = 10;
    }

    update() {
        this.afkCount--;
        if (this.afkCount < 0) {
            this.room.removePlayer(this.id);
        }
    }

    afkCheckout() {
        this.afkCount = 10;
    }
}