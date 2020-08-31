//-1 = verse
//0 = rock
//1 = paper
//2 = scissors

import { generateToken } from "../../Utility/util.js";

export class Player {
    constructor(name, room, id) {
        this.room = room;
        this.token = generateToken();
        this.name = name;
        this.cards = [];
        this.afkCount = 10;
    }

    addCard(id) {
        this.cards.push(id);
    }

    removeCard(id) {
        this.cards.splice(id, 1);
    }

    playCard(id, token) {
        if (token != this.token) return;
        this.removeCard(id);
    }

    update() {

    }

    json(showCards) {
        if (!showCards) return {'name': this.name, 'cards': new Array(this.cards.length).fill(-1)};
        return {'name': this.name, 'cards': this.cards};
    }
}