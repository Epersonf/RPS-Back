import { Player } from '../Player.js';

export class Bot extends Player {
    constructor(name, room) {
        name = "Bot " + Math.round(Math.random() * 1000);
        super(name, room);
    }
}