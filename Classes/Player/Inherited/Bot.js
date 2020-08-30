const { Player } = require("../Player.js");

export class Bot extends Player {
    constructor() {
        this.name = "Bot " + Math.round(Math.random() * 1000);
    }
}