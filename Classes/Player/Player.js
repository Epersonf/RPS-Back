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
        this.canPlay = false;
        this.score = 0;
        this.playedCard = -1;
        this.id = id;
    }

    addCard(id) {
        this.cards.push(id);
    }

    removeCard(id) {
        this.cards.splice(id, 1);
    }

    playCard(id, token) {
        if (!this.canPlay || token != this.token) return;
        this.playedCard = this.cards[id];
        this.removeCard(id);
        this.canPlay = false;
    }

    json(showCards) {
        if (!showCards) return {'name': this.name, 'cards': new Array(this.cards.length).fill(-1)};
        return {'name': this.name, 'cards': this.cards};
    }

    getPlayedCard(token) {
        if (this.playedCard === -1) return null;
        if (this.token != token && !this.room.canShowCards) return -1;
        return this.playedCard;
    }
}