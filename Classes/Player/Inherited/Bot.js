import { Player } from '../Player.js';

export class Bot extends Player {
    constructor(name) {
        name = "Bot " + Math.round(Math.random() * 1000);
        super(name);
    }
}