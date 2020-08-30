//-1 = verse
//0 = rock
//1 = paper
//2 = scissors

export class Player {
    constructor(name) {
        this.token = generateToken();
        this.name = name;
        this.cards = [];
    }

    addCard(id) {

    }

    json(showCards) {
        if (!showCards) return new Array(this.cards.length).fill(-1);
        return {...this.cards};
    }
}