import { Player } from '../Player.js';

export class Bot extends Player {
    constructor() {
        super();
        this.name = "Bot " + Math.round(Math.random() * 1000);
    }
}