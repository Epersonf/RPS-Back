import { Player } from '../Player.js';
import { getRandomInt } from '../../../Utility/util.js';

export class Bot extends Player {
    constructor(room, id) {
        let name = "Bot " + Math.round(Math.random() * 1000);
        super(name, room, id);
    }
    
    update() {
        if (!this.canPlay) return;
        let id = getRandomInt(0, this.cards.length - 1);
        this.playCard(id, this.token);
    }
}