import { Player } from "../Player.js";

export class User extends Player {
    constructor(name="Player", room) {
        super(name, room);
    }
}